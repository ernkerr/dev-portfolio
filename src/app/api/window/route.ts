// What it's like outside wherever whoever's looking at the About page is,
// for the window in its room (src/app/about/CityWindow.tsx): their city,
// its sunrise and sunset today, and the weather there now.
//
// Where they are comes from the city Vercel works out from their IP and
// adds to the request (x-vercel-ip-city and its latitude and longitude),
// so nobody's asked for their location. Locally, without those, it's the
// city in their computer's time zone (?tz=America/New_York), looked up
// with Open-Meteo's geocoding; failing that, New York. The weather,
// sunrise and sunset come from Open-Meteo too: free, no key, nothing
// stored. Each place's answer is cached for 15 minutes.

export const dynamic = "force-dynamic";

const FRESH = 900; // seconds to keep a place's weather
const NEW_YORK = { city: "New York", latitude: 40.71, longitude: -74.01 };
const ZONE = /^[A-Za-z]+(?:\/[A-Za-z0-9_+-]+){1,2}$/;

type Place = { city: string; latitude: number; longitude: number };

// From the city in a time zone's name, e.g. America/New_York
async function placeFromZone(zone: string | null): Promise<Place | null> {
  if (!zone || zone.length > 64 || !ZONE.test(zone)) return null;
  const name = zone.split("/").pop()!.replace(/_/g, " ");
  const url = `https://geocoding-api.open-meteo.com/v1/search?count=1&name=${encodeURIComponent(name)}`;
  const res = await fetch(url, { next: { revalidate: 86400 } }).catch(
    () => null,
  );
  const data = await res?.json().catch(() => null);
  const hit = data?.results?.[0];
  return hit
    ? { city: hit.name, latitude: hit.latitude, longitude: hit.longitude }
    : null;
}

export async function GET(request: Request) {
  const h = request.headers;
  const lat = Number(h.get("x-vercel-ip-latitude"));
  const lon = Number(h.get("x-vercel-ip-longitude"));
  const city = h.get("x-vercel-ip-city");
  const place: Place =
    city && Number.isFinite(lat) && Number.isFinite(lon) && (lat || lon)
      ? { city: decodeURIComponent(city), latitude: lat, longitude: lon }
      : ((await placeFromZone(new URL(request.url).searchParams.get("tz"))) ??
        NEW_YORK);

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${place.latitude.toFixed(2)}&longitude=${place.longitude.toFixed(2)}` +
    "&current=temperature_2m,weather_code,cloud_cover,is_day" +
    "&daily=sunrise,sunset&timezone=auto&forecast_days=1";
  const res = await fetch(url, { next: { revalidate: FRESH } }).catch(
    () => null,
  );
  const data = await res?.json().catch(() => null);
  if (!res?.ok || !data?.current)
    return Response.json(
      { city: place.city, error: "The weather didn't load." },
      { status: 502 },
    );

  // Open-Meteo gives sunrise and sunset in the place's own time; this
  // makes them moments anyone's clock can compare with
  const offset = data.utc_offset_seconds * 1000;
  const moment = (local: string) => Date.parse(`${local}:00Z`) - offset;
  return Response.json(
    {
      city: place.city,
      sunrise: moment(data.daily.sunrise[0]),
      sunset: moment(data.daily.sunset[0]),
      weather: data.current.weather_code,
      clouds: data.current.cloud_cover,
      celsius: data.current.temperature_2m,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
