import Image from "next/image";

export default function Disco() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Image
        src="/disco.gif"
        alt="Disco animation"
        height={100}
        width={100}
        className="h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12"
        unoptimized
      />
    </div>
  );
}
