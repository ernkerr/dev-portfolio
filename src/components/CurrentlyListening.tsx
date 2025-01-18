import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Song {
  title: string;
  artists: string[];
  image_url: string;
  device_type: string;
  device_name: string;
  volume_percent: string;
}

export default function CurrentlyListening() {
  const [isListening, setIsListening] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [lastSong, setLastSong] = useState<Song | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

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
        volume_percent: data.volumePercent,
      });
      console.log("volume_percent ", data.volumePercent);
    }

    // check if spotify is playing
    if (data.isPlaying) {
      setIsListening(true);
      setLastSong(currentSong);
      console.log(`Last Song: ${lastSong?.title}`);
    } else {
      setIsListening(false);
      console.log("Nothing is playing right now.");
    }
  };

  // check if I'm listening
  useEffect(() => {
    getCurrentlyListening(); // get current song once when the component mounts
    // const interval = setInterval(getCurrentlyListening, 10000); // Poll every 10 seconds
    const interval = setInterval(getCurrentlyListening, 1000000000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // check if the artist name is too long
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isTextOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsOverflowing(isTextOverflowing);
        console.log("Overflow detected:", isTextOverflowing); // Debugging
      }
    };

    // Delay to ensure DOM is fully rendered
    const timeout = setTimeout(checkOverflow, 100);

    // Listen for window resizing
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [currentSong]);

  //   flex items-center justify-center

  return (
    <div className="flex flex-row items-center w-full h-full">
      {currentSong?.image_url && (
        <Image
          src={currentSong.image_url}
          alt={currentSong.title || "No song playing"}
          height={75}
          width={75}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
          className="flex justify-start rounded-lg m-2"
        />
      )}

      <div className="flex flex-col">
        <h1 className="text-sm mb-2">
          {isListening
            ? "Currently Listening To..."
            : "Nothing is playing right now"}
        </h1>

        <div
          ref={textRef}
          className="overflow-hidden text-md"
          style={{
            whiteSpace: "nowrap",
            position: "relative",
            maxWidth: "250px",
          }}
        >
          {isOverflowing ? (
            <div
              style={{
                display: "inline-block",
                animation: "scroll-text 20s linear infinite",
              }}
            >
              <span style={{ paddingRight: "1rem" }}>{currentSong?.title}</span>
              <span style={{ paddingRight: "1rem" }}>{currentSong?.title}</span>
            </div>
          ) : (
            <span>{currentSong?.title}</span>
          )}
        </div>

        {/* <h2 className="text-md">
          {isListening ? currentSong?.title : currentSong?.title}{" "}
        </h2> */}

        <div
          ref={textRef}
          className="overflow-hidden text-sm mb-1"
          style={{
            whiteSpace: "nowrap",
            position: "relative",
            minWidth: "250px",
            maxWidth: "250px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              animation: isOverflowing
                ? "scroll-text 20s linear infinite"
                : "none",
              transform: isOverflowing ? "translateX(0%)" : "none", // ⛔ No movement if not overflowing
            }}
          >
            <span style={{ paddingRight: "1rem" }}>
              {currentSong?.artists?.join(", ")}
            </span>
            {isOverflowing && (
              <span style={{ paddingRight: "1rem" }}>
                {currentSong?.artists?.join(", ")}
              </span>
            )}
          </div>

          {/* {isListening && (
            <p className="text-xs">
              Listening on:{" "}
              {currentSong?.device_name || currentSong?.device_type}
            </p>
          )} */}
        </div>
      </div>
      <div className="m-3">
        <Image src={`/spotify.png`} alt="SpotifyLogo" height={50} width={50} />
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

// font-medium

// TODO:
// Check overflow for title and artist (not for both!)
//   useEffect(() => {
//     const checkOverflow = (ref: React.RefObject<HTMLDivElement>, setter: (value: boolean) => void) => {
//       if (ref.current) {
//         const isOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
//         setter(isOverflowing);
//         console.log("Overflow detected:", isOverflowing);
//       }
//     };

//     const timeout = setTimeout(() => {
//       checkOverflow(titleRef, setIsTitleOverflowing);
//       checkOverflow(artistRef, setIsArtistOverflowing);
//     }, 100);

//     window.addEventListener("resize", () => {
//       checkOverflow(titleRef, setIsTitleOverflowing);
//       checkOverflow(artistRef, setIsArtistOverflowing);
//     });

//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("resize", () => {
//         checkOverflow(titleRef, setIsTitleOverflowing);
//         checkOverflow(artistRef, setIsArtistOverflowing);
//       });
//     };
//   }, [currentSong]);

//Two Refs: titleRef for the song title, artistRef for the artist names.
// Two States: isTitleOverflowing and isArtistOverflowing to check each independently.
// Independent Overflow Checks: Each section scrolls only if it overflows.
