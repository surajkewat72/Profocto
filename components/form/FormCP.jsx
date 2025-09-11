"use client";

import React, { } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"

const FormCP = ({ formClose, setFormClose }) => {
  return (
    <button
      aria-label="Form Open/Close"
      title={formClose ? "Open Form" : "Close Form"}
      className={`exclude-print fixed bottom-5 ${formClose ? 'left-5' : 'left-1/3 -translate-x-1/2'} font-bold rounded-full bg-white text-zinc-800 shadow-lg border-2 border-white z-50 hidden md:block p-3 hover:bg-gray-50 transition-colors duration-200`}
      onClick={() => setFormClose(!formClose)}
    >
      {formClose ? <BsFillArrowRightCircleFill className="w-6 h-6" /> : <BsFillArrowLeftCircleFill className="w-6 h-6" />}
    </button>
  )
}

export default FormCP;
