"use client";

import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

const FormButton = ({ size, remove, add }) => {

    return (
      <div className="flex gap-3 mt-6 pt-2">
        <button type="button" onClick={add}
          aria-label="Add Item"
          title="Add Item"
          className="clean-button group">
          <MdAddCircle className="text-base group-hover:scale-110 transition-transform duration-200" />
          <span className="text-xs font-medium hidden sm:inline">Add</span>
        </button>
        {
          size > 0 &&
          <button type="button" onClick={remove}
            aria-label="Remove Item"
            title="Remove Item"
            className="danger-button group">
            <MdRemoveCircle className="text-base group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xs font-medium hidden sm:inline">Remove</span>
          </button>
        }
      </div>
    )
  }

export default FormButton;