"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";


export default function MobileSidebarButton() {
  const [open, setOpen] = useState(false);


  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          left-4
          top-4
          z-50
          rounded-lg
          bg-[#2563EB]
          px-4
          py-2
          text-white
          lg:hidden
        "
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>


      {open && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          onClick={() => setOpen(false)}
        />
      )}


      <div
        className={`
          fixed
          left-0
          top-0
          z-50
          transition-transform
          duration-300
          lg:hidden

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </div>
    </>
  );
}