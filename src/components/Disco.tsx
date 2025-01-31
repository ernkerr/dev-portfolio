import Image from "next/image";

export default function Disco() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        src="/disco.gif"
        alt="Disco animation"
        height={100}
        width={100}
        className="h-20 w-20 object-contain"
      />
    </div>
  );
}
