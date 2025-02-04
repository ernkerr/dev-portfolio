"use client";

import Link from "next/link";
import Image from "next/image";
export default function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between p-10">
      <Link
        href="/"
        className="text-md transform-gpu rounded-lg p-2 font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-600/20 hover:text-white sm:text-sm lg:text-lg"
      >
        <Image src="/ek.png" alt="Erin Kerr" width={30} height={30} />
      </Link>
      <div className="align-end flex gap-4 sm:gap-8">
        <Link
          href="/projects"
          className="med:text-med transform-gpu rounded-md px-1 py-2 text-xs font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-600/20 hover:text-white sm:px-3 sm:text-sm lg:text-lg"
        >
          Projects
        </Link>
        <Link
          href="/about/"
          className="med:text-med transform-gpu rounded-md px-3 py-2 text-xs font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-600/20 hover:text-white sm:text-sm lg:text-lg"
        >
          About
        </Link>

        <Link
          href="/contact"
          className="med:text-med transform-gpu rounded-md px-1 py-2 text-xs font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-600/20 hover:text-white sm:px-3 sm:text-sm lg:text-lg"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
