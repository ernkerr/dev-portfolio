// create a typescript interface for props

interface VolumeBarProps {
  isListening: boolean;
  volume: string; // coming from your song interface as volume_percent
}

export default function VolumeBar({ isListening, volume }: VolumeBarProps) {
  // convert volume_percent str into a num
  const volumeLevel = parseInt(volume) || 0;

  console.log("VolumeBar props:", { isListening, volume, volumeLevel });

  // if not listening, hide the volume bar
  if (!isListening) return null;

  return (
    <div className="flex h-[20px] items-end gap-[2px]">
      <div
        className="min-h-[20px] w-[2px] rounded-sm bg-blue-400"
        style={{
          height: `${30 * (volumeLevel / 100)}px`,
          animationName: "barAnimation",
          animationDuration: "1s",
          // smooth both ways (start and end)
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "0.2s",
          transformOrigin: "bottom",
        }}
      />
      <div
        className="min-h-[20px] w-[2px] rounded-sm bg-blue-400"
        style={{
          height: `${30 * (volumeLevel / 100)}px`,
          animationName: "barAnimation",
          animationDuration: "1s",
          animationTimingFunction: "cubic-bezier(0.3, 0, 0.7, 1)",
          animationIterationCount: "infinite",
          animationDelay: "0.4s",
          transformOrigin: "bottom",
        }}
      />
      <div
        className="min-h-[20px] w-[2px] rounded-sm bg-blue-400"
        style={{
          height: `${30 * (volumeLevel / 100)}px`,
          animationName: "barAnimation",
          animationDuration: "1s",
          // fast start, slow end
          animationTimingFunction: "ease-out",
          animationIterationCount: "infinite",
          animationDelay: "0.0s",
          transformOrigin: "bottom",
        }}
      />
      <div
        className="min-h-[20px] w-[2px] rounded-sm bg-blue-400"
        style={{
          height: `${30 * (volumeLevel / 100)}px`,
          animationName: "barAnimation",
          animationDuration: "1s",
          // smooth both ways (start and end)
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "0.6s",
          transformOrigin: "bottom",
        }}
      />{" "}
      <style jsx>{`
        @keyframes barAnimation {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.3);
          }
        }
      `}</style>
    </div>
  );
}
