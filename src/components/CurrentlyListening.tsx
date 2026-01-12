import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { geistMono } from "../../public/fonts/fonts";
import VolumeBar from "./VolumeBar";

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
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const [isArtistOverflowing, setIsArtistOverflowing] = useState(false);

  // create two refs to directly access these DOM elements
  const titleRef = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);

  const defaultSong = useMemo(
    () => ({
      title: "Cream on Chrome",
      artists: ["Ratatat"],
      image_url: "/cream_on_chrome.jpg",
      device_type: "",
      device_name: "",
      volume_percent: "50",
    }),
    [],
  ); // empty dependency array since values are constant

  const getCurrentlyListening = useCallback(async () => {
    const res = await fetch("/api/getCurrentlyPlaying");
    const data = await res.json();

    if (data.isPlaying) {
      setIsListening(true);
      if (!currentSong || currentSong.title !== data.title) {
        setCurrentSong({
          title: data.title,
          artists: data.artists,
          image_url: data.albumImageUrl,
          device_type: data.deviceType,
          device_name: data.deviceName,
          volume_percent: data.volumePercent,
        });
      }
    } else {
      setIsListening(false);
      setCurrentSong(defaultSong);
    }
  }, [currentSong, defaultSong]);

  // check if I'm listening
  useEffect(() => {
    getCurrentlyListening(); // get current song once when the component mounts
    const interval = setInterval(getCurrentlyListening, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [getCurrentlyListening]);

  // check to see if the text overflows
  useEffect(() => {
    const checkOverflow = (
      ref: React.RefObject<HTMLDivElement | null>,
      setter: (value: boolean) => void,
    ) => {
      if (ref.current) {
        // scrollWidth is the width of the content (including overflow)
        // clientWidth is the visible width of the element
        // if scroll width is greater than clientWidth then the text is overflowing
        const isOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
        // setter updates the corresponding state (setIsTitleOverflowing or setIsArtistOverflowing)
        setter(isOverflowing);
      }
    };

    // wait 100ms before checking for overflow to ensure the DOM has fully rendered
    const timeout = setTimeout(() => {
      checkOverflow(titleRef, setIsTitleOverflowing);
      checkOverflow(artistRef, setIsArtistOverflowing);
    }, 100);

    // recheck overflow when the window is resized
    const handleResize = () => {
      checkOverflow(titleRef, setIsTitleOverflowing);
      checkOverflow(artistRef, setIsArtistOverflowing);
    };

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSong]);

  return (
    <div
      className={`${geistMono.className} flex h-full w-full flex-col items-start justify-between p-2`}
    >
      {/* SPOTIFY INFO */}
      <div className="flex w-full flex-1 flex-col justify-center">
        <div className="mb-1 flex flex-row items-center gap-2 text-sm sm:text-base md:text-sm lg:text-base">
          {/* SPOTIFY LOGO */}
          <Image
            src={`/spotify.png`}
            alt="SpotifyLogo"
            height={50}
            width={50}
            className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
          />
          {isListening ? "Now Playing" : "Last Played"}
        </div>

        <div className="flex w-full flex-row items-center">
          {/* Song info container */}
          <div className="mb-1 flex w-[90%] flex-row items-center rounded-lg border-[1.5px] border-blue-300/50 p-1.5">
            {currentSong?.image_url && (
              <Image
                src={currentSong.image_url}
                alt={currentSong.title || "No song playing"}
                height={75}
                width={75}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="h-[40px] w-[40px] rounded-lg sm:h-[50px] sm:w-[50px] md:h-[45px] md:w-[45px] lg:h-[60px] lg:w-[60px]"
              />
            )}

            {/* song title */}
            <div className="ml-2 sm:ml-3">
              <div
                ref={titleRef}
                className="max-w-[150px] overflow-hidden text-xs sm:max-w-[200px] sm:text-sm md:max-w-[180px] lg:max-w-[200px] lg:text-base"
                style={{
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                {isTitleOverflowing ? (
                  <div
                    style={{
                      display: "inline-block",
                      animation: "scroll-text 25s linear infinite",
                    }}
                  >
                    <span style={{ paddingRight: "2rem" }}>
                      {currentSong?.title}
                    </span>
                    <span style={{ paddingRight: "2rem" }}>
                      {currentSong?.title}
                    </span>
                  </div>
                ) : (
                  // title
                  <span>{currentSong?.title}</span>
                )}
              </div>
              {/* song artist */}
              <div
                ref={artistRef}
                className="max-w-[150px] overflow-hidden text-[10px] sm:max-w-[200px] sm:text-xs md:max-w-[180px] lg:max-w-[200px]"
                style={{
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                {isArtistOverflowing ? (
                  <div
                    style={{
                      display: "inline-block",
                      animation: "scroll-text 50s linear infinite",
                    }}
                  >
                    <span style={{ paddingRight: "2rem" }}>
                      {currentSong?.artists?.join(", ")}
                    </span>
                    <span style={{ paddingRight: "1rem" }}>
                      {currentSong?.artists?.join(", ")}
                    </span>
                  </div>
                ) : (
                  <span>{currentSong?.artists?.join(", ")}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex h-full w-[10%] items-end justify-center pb-1">
            <VolumeBar
              isListening={isListening}
              volume={currentSong?.volume_percent || "50"}
            />
          </div>
        </div>
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
// this snimation moves text horizontally using translateX
// it ends at -50% (moved left by half the width)
// but bc we duplicated the text, when it moves -50% left, it appears seamless
