"use client";

import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {

const print = () => {
    window.print();
    };

return (
    <button
        aria-label="Download Resume"
        title="Download Resume"
        className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-zinc-800 shadow-lg border-2 border-white p-3 hover:bg-gray-50 transition-colors duration-200"
        onClick={print}
      >
       <MdPictureAsPdf className="w-6 h-6" />
      </button>
    );
};

export default WinPrint;
