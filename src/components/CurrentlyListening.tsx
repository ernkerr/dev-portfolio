import { useState, useEffect } from "react";
import Image from "next/image";

interface Song {
  title: string;
  artists: string[];
  image_url: string;
  device_type: string;
  device_name: string;
}

export default function CurrentlyListening() {
  const [isListening, setIsListening] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [lastSong, setLastSong] = useState<Song | null>(null);
  // Track the last song

  const getCurrentlyListening = async () => {
    const res = await fetch("/api/getCurrentlyPlaying");
    const data = await res.json();
    console.log("data: ", data);

    // Only update if the song has changed
    if (!currentSong || currentSong.title !== data.item.name) {
      setCurrentSong({
        title: data.title,
        artists: data.artists, // array
        image_url: data.albumImageUrl, //str
        device_type: data.deviceType, //
        device_name: data.deviceName, //
      });
    }

    // check if spotify is playing
    if (data.isPlaying) {
      setIsListening(true);
      console.log(`Currently playing: ${data.title} by ${data.artist}`);
    } else {
      setIsListening(false);
      setLastSong(currentSong);
      console.log("Nothing is playing right now.");
    }
  };

  // check if I'm listening
  useEffect(() => {
    getCurrentlyListening(); // get current song once when the component mounts
    const interval = setInterval(getCurrentlyListening, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      {isListening ? (
        <div>
          <h1>Currently Listening...</h1>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <p>{currentSong?.title}</p>
              <div
                className="overflow-hidden ..."
                style={{
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    animation: "scroll-text 10s linear infinite",
                  }}
                >
                  {currentSong?.artists.join(", ")}
                </div>
              </div>
            </div>
            {currentSong?.image_url && (
              <Image
                src={currentSong.image_url}
                alt={currentSong.title || "No song playing"}
                width={50}
                height={50}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>Not Currently Playing...</h1>
          <h2>Last listened to:</h2>
        </div>
      )}

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
