export default function Blogs() {
  return (
    <>
      <div className="flex justify-center items-center align-center sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          {/* Pencil Body */}
          <path
            d="M16.862 3.487a2.109 2.109 0 1 1 2.979 2.979L8.25 18.058l-4.243 1.06 1.06-4.242L16.862 3.487z"
            fill="currentColor"
          />

          {/* Pencil Tip */}
          <path
            d="M3.75 19.25l1.06-4.242 3.182 3.182-4.242 1.06z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="hidden sm:flex text-white">BLOGS</div>
    </>
  );
}
