"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne, pressStart } from "../../../public/fonts/fonts";
import Image from "next/image";

export default function Carpoolio() {
  return (
    <div className="bg-slate-100 text-white dark:bg-slate-900">
      <h1
        className={`${poiretOne.className} text-md flex items-center justify-center p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
      >
        Carpoolio
      </h1>

      <div>
        <h2 className={`${pressStart.className} text-md mb-4`}>Carpoolio</h2>
        <div className="mb-8 flex justify-around gap-4">
          {" "}
          {/* Added margin-bottom for spacing */}
          <Image
            src="/carpoolio1.png"
            alt="Image 1"
            width={300}
            height={200}
            className="w-1/2"
          />
          <Image
            src="/carpoolio3.png"
            alt="Image 3"
            width={300}
            height={200}
            className="w-1/2"
          />
        </div>
      </div>

      <DarkModeToggle />
    </div>
  );
}
