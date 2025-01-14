// project 0: Nav bar (ERIN KERR in left side, PROJECTS< ABOUT & CONTACT ON LEFT)

// project 1:

// project 2:

// project 3: List of projects
// carpoolio: link to page that goes through

// project 4:

// project 5: Contact Me

// project 6: Currently Listening.. (pull spotify API & connect to my account)

// project 7: Local Time (SAN FRANCISCO HH:MM )

// project 8: Github?

// project 9: Disco Mode

// project 10: Light / Dark Toggle

const BentoSphere = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="grid h-full w-full grid-cols-12 grid-rows-9 gap-3 p-20 xl:m-32 lg:m-16 md:m-8">
        <div className="col-span-12 row-span-1 bg-blue-600 flex items-center rounded-lg shadow-md">
          <nav className="flex justify-between w-full items-center m-10">
            <a
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              ERIN KERR
            </a>
            <div className="flex align-end">
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                PROJECTS
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                ABOUT
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white"
              >
                CONTACT
              </a>
            </div>
          </nav>
        </div>

        <div className="col-span-5 row-span-4 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
          Project 1
        </div>
        <div className="col-span-3 row-span-4 bg-green-500 flex items-center justify-center rounded-lg shadow-md">
          Project 2
        </div>
        <div className="col-span-4 row-span-6 bg-red-500 flex items-center justify-center rounded-lg shadow-md">
          Project 3
        </div>
        <div className="col-span-4 row-span-3 bg-yellow-500 flex items-center justify-center rounded-lg shadow-md">
          Project 4
        </div>
        <div className="col-span-4 row-span-4 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
          Project 5
        </div>
        <div className="col-span-4 row-span-1 bg-green-500 flex items-center justify-center rounded-lg shadow-md">
          Project 6
        </div>
        <div className="col-span-4 row-span-1 bg-red-500 flex items-center justify-center rounded-lg shadow-md">
          Project 7
        </div>
        <div className="col-span-1 row-span-1 bg-yellow-500 flex items-center justify-center rounded-lg shadow-md">
          Project 8
        </div>
        <div className="col-span-1 row-span-1 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
          Project 9
        </div>
        <div className="col-span-2 row-span-1 bg-green-500 flex items-center justify-center rounded-lg shadow-md">
          Project 10
        </div>
      </div>
    </div>
  );
};

export default BentoSphere;
