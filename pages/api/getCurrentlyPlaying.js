// server side BUT serverless function

// spotify api endpoint to refresh the access token
const token_endpoint = "https://accounts.spotify.com/api/token";

//spotify api endpoint to check the currently playing song
const now_playing_endpoint =
  "https://api.spotify.com/v1/me/player/currently-playing";

const device_endpoint = "https://api.spotify.com/v1/me/player/devices";

// credentials from environment variables
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let tokenCreatedAt;

// get new access token from refresh token
const refreshAccessToken = async () => {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  // send a post request to spotify's token endpoint to refresh the access token
  try {
    const response = await fetch(token_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    // send the request and wait for spotify to respond
    const data = await response.json(); // parse that response as JSON

    if (response.ok) {
      accessToken = data.access_token; // Save new token
      tokenCreatedAt = Math.floor(Date.now() / 1000); // Save current time
      return accessToken;
    } else {
      console.error("Failed to refresh token:", data);
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

// use previously created access token or check if it needs to be refreshed
const getAccessToken = async () => {
  const oneHour = 3600;
  const currentTime = Math.floor(Date.now() / 1000);

  // if there is a token that was created in the last hour
  // use that token
  if (accessToken && tokenCreatedAt && currentTime - tokenCreatedAt < oneHour) {
    console.log("🔒 Using existing access token.");
    return accessToken;
  }
  // else
  console.log("refreshing token..");
  return await refreshAccessToken();
};

//
// get currently playing song
const getCurrentlyPlaying = async (access_token) => {
  // console.log("🎵 Fetching currently playing song...");

  try {
    const response = await fetch(now_playing_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log("Spotify Response:", response.json());

    if (response.status === 204 || response.status > 400) {
      console.warn("⚠️ No song is currently playing or error occurred.");
      return null;
    }
    console.log("Spotify Response Status:", response.status);
    const song = await response.json();

    return song;
  } catch {
    console.warn("⚠️ No song is currently playing or error occurred.");
    return null;
  }
};

// get the active device
const getCurrentDevice = async (access_token) => {
  console.log("fetching active device");

  try {
    const response = await fetch(device_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();

    // console.log("📦 Device API Response Data:", JSON.stringify(data, null, 2));

    if (response.status === 204 || response.status > 400) {
      console.warn(
        "⚠️ No device is currently being used or an error occurred.",
      );
      return null;
    }

    // find the active device:
    const activeDevice = data.devices.find((device) => device.is_active);

    if (!activeDevice || data.devices.length === 0) {
      console.warn("⚠️ No active device found.");
      // console.log("Devices:", data.devices);
      console.log("Active Device:", activeDevice);
      return null;
    }

    // name changes
    const deviceName = activeDevice.name.toLowerCase().includes("iphone")
      ? "ern's phone"
      : activeDevice.name.toLowerCase();

    return {
      name: deviceName,
      is_active: activeDevice.is_active,
      volume_percent: activeDevice.volume_percent,
    };
  } catch {
    console.warn(
      "⚠️ an error occurred while trying to retrieve the active device",
    );
    return null;
  }
};

// API route for the front end to call
// create endpoint for frontend to get currently playing song
export default async function handler(req, res) {
  try {
    const access_token = await getAccessToken();
    const song = await getCurrentlyPlaying(access_token);
    const device = await getCurrentDevice(access_token);

    // If no song data at all (not even paused)
    if (!song || !song.item) {
      return res.status(200).json({ isPlaying: false });
    }

    // Return song data regardless of playing state (could be paused)
    res.status(200).json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artists: song.item.artists.map((artist) => artist.name),
      albumImageUrl: song.item.album.images[0]?.url || "",
      deviceName: device?.name || "No active device",
      isActive: device?.is_active || false,
      volumePercent: device?.volume_percent || 60,
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch now playing", details: error.message });
  }
}

// In essence, serverless functions are bundles of code that are automatically executed and managed by a third-party service, such as AWS Lambda or Google Cloud Functions. These functions can be triggered by various events, such as HTTP requests, scheduled timers, or other cloud services, and are billed on a per-execution or per-resource basis, making them cost-effective, especially for low-frequency or sporadic workloads.
