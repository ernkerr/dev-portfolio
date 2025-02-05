import Image from "next/image";
import Link from "next/link";
interface AboutMeProps {
  title: string;
  image: string;
  link: string;
}

export default function AboutMe({ title, image, link }: AboutMeProps) {
  return (
    <div className="">
      <h3 className="text-md sm:text-lg md:text-xl">{title}</h3>
      <div className="relative h-[100px] w-[100px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px]">
        <Link href={link}>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100px"
              priority
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
