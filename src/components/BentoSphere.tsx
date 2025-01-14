// const BentoShere = () => {
//   return (
//     // Outer Container (Centers the Grid)
//     // flex layout
//     // horizontally center content
//     // & vertically
//     // makes container as tall as the entire screen height
//     <div className="flex justify-center items-center h-screen">
//       {/* // grid-cols-2 creates a grid w/ 2 columns */}
//       <div className="grid grid-cols-2 gap-4">
//         {/* // bento box styling */}
//         <div className=" bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
//           Erin Kerr
//         </div>
//       </div>
//     </div>
//     // grid layout for bento boxes
//   );
// };

// project 1:

// project 2:

// project 3:

// project 4:

// project 5:

const BentoSphere = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="grid h-full w-full grid-cols-12 grid-rows-10 gap-3 p-20 xl:m-64 lg:m-32 md:m-16">
        <div className="col-span-12 row-span-1 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
          ERIN KERR
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
