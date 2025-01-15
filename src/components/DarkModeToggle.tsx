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
        <div className="group peer ring-0 bg-gradient-to-tr from-blue-800 via-gray-800 to-slate-900 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-focus:outline-none after:content-['☽'] after:text-indigo-900 after:text-2xl  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['☼'] peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-gradient-to-tr peer-checked:from-yellow-100 peer-checked:via-yellow-400 peer-checked:to-yellow-500 peer-checked:after:text-amber-500 peer-checked:after:text-xl"></div>
      </label>
    </>
  );
}

export default DarkModeToggle;

//  from-blue-800 via-blue-500 to-blue-400
