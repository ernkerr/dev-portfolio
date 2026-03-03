import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          checked={!isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          className="sr-only peer"
        ></input>
        <div className="group peer ring-0 bg-gradient-to-tr from-blue-800 via-gray-800 to-slate-900 rounded-full outline-none duration-300 after:duration-300 w-14 h-7 sm:w-16 sm:h-8 lg:w-24 lg:h-12 shadow-md peer-focus:outline-none after:content-['☽'] after:text-indigo-900 after:text-sm sm:after:text-base lg:after:text-xl after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 lg:after:h-10 lg:after:w-10 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-7 sm:peer-checked:after:translate-x-8 lg:peer-checked:after:translate-x-12 peer-checked:after:content-['☼'] peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-gradient-to-tr peer-checked:from-yellow-100 peer-checked:via-yellow-400 peer-checked:to-yellow-500 peer-checked:after:text-amber-500 peer-checked:after:text-sm sm:peer-checked:after:text-base lg:peer-checked:after:text-xl"></div>
      </label>
    </>
  );
}

export default DarkModeToggle;

//  from-blue-800 via-blue-500 to-blue-400
