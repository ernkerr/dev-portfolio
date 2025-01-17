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

export default function CurrentlyReading() {
  // hardcoded ISBN for now
  const isbn = "9780201616224";

  // library covers api url
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  return (
    <div className="w-full flex flex-row justify-start gap-5 m-1">
      <Image
        src={url}
        alt="Cover of the book I'm currently reading"
        width={60}
        height={60}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          //   objectFit: "contain",
          objectPosition: "center",
        }}
        className="rounded-md shadow-xl"
      />

      <div className="flex justify-start text-white gap-5">
        <div className="flex flex-col">
          <h1>Currently reading...</h1>
          <h2>Book Title</h2>
          <h3>Author</h3>
        </div>
      </div>
    </div>
  );
}

{
  /* <img src="https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg" />; */
}
// Medium
