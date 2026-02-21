"use client";

import { Mail } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT SIDE */}
          <div className="flex items-center space-x-2">
            
            {/* Green rotated numbers */}
            <div className="relative w-32 h-12 hidden sm:block">
              {/* <span className="absolute text-green-600 text-xs -rotate-45 top-0 left-1">
                1 2 3 4 5 6 7 8 9 0
              </span> */}
              <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
            </div>

            {/* <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
              SigFigs
            </h1> */}
            
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-3">

            <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition">
              Rules
            </button>

            <button className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition">
              <Mail className="w-5 h-5 text-gray-600" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}