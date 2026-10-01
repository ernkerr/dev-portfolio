import SiteShell from "@/components/site/SiteShell";
import AffinityMap from "@/components/affinity-map/AffinityMap";

export default function Design() {
  return (
    <SiteShell>
      {/* Case study content above the map goes here. */}
      <AffinityMap className="py-16 md:py-24" />
      {/* Case study content below the map goes here. */}
    </SiteShell>
  );
}
