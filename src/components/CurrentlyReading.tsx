// TODO: text automate every week
// to ask if I'm still reading the same book
// if Y, do nothing
// if N, ask what book I'm currently reading

// TODO: get response & if different,
// TODO: get book cover via an API?

// UI:
// past book, current book, future book (queue)

// TODO:
// link to a page of favorites (!)

// favorite books, movies, restaurants, designers, websites, hikes, quotes,
// also things you can sell? tech gadgets,

import Image from "next/image";
import bookImg from "../../public/pragmaticProgrammer.jpg";

export default function CurrentlyReading() {
  // TODO: use isbn api to get book cover
  // hardcoded ISBN for now
  // const isbn = "9780201616224";
  // library covers api url
  // const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg">Currently reading...</h1>
      <div className="flex w-full flex-row justify-start gap-5">
        <Image
          src={bookImg}
          alt="Cover of the book I'm currently reading"
          width={75}
          height={75}
          className="transform-gpu rounded-md border-[1px] border-white transition-all duration-700 ease-in-out will-change-transform"
          priority
        />

        <div className="flex justify-start gap-5">
          <div className="flex flex-col">
            <h2 className="text-lg">The Pragmatic Programmer</h2>
            <h3 className="text-sm">Andy Hunt & Dave Thomas</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <img src="https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" />; */
}
// Medium
