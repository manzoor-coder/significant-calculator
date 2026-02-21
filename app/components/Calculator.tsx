"use client";

import { useState } from "react";
import { Equal, Link2, Save } from "lucide-react";
import Link from "next/link";

export default function Calculator() {
  const [input, setInput] = useState("");

  const buttons = [
    ["÷", "1", "2", "3", "^"],
    ["×", "4", "5", "6", "log"],
    ["+", "7", "8", "9", "ln"],
    ["-", "(", "0", ")", "e"],
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-semibold text-gray-700 mb-6">
        Significant Figures Calculator
      </h1>

      <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm">
        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="EX: 1.5/log(5+1)"
          className="w-full p-4 rounded-lg border border-gray-300 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {buttons.flat().map((btn, index) => {
            const isOperator = ["÷", "×", "+", "-"].includes(btn);
            return (
              <button
                key={index}
                onClick={() => setInput(input + btn)}
                className={`py-3 rounded-lg border text-lg font-medium transition 
                ${
                  isOperator
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button className="bg-gray-200 rounded-lg py-3 hover:bg-gray-300">
            Clear
          </button>

          <button className="bg-gray-200 rounded-lg py-3 hover:bg-gray-300">
            ⌫
          </button>

          <button
            onClick={() => setInput(input + ".")}
            className="bg-gray-200 rounded-lg py-3 hover:bg-gray-300"
          >
            .
          </button>

          <button className="bg-green-500 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-green-600">
            <Equal size={18} />
            Solve
          </button>
        </div>

        {/* Rounding Section */}
        <div className="bg-gray-200 p-4 rounded-lg w-fit">
          <p className="text-gray-700 mb-2">
            Round to significant figures:{" "}
            <span className="text-gray-500">(optional)</span>
          </p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-100"
              >
                {num}
              </button>
            ))}

            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              0
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-gray-100 border border-gray-300 rounded-xl p-6 text-gray-700">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Solves expressions and counts the number of significant figures.
          </li>
          <li>Does not apply the even rule.</li>
          <li>Addition and subtraction round by least number of decimals.</li>
        </ul>

        <button className="text-green-600 mt-4 hover:underline">
          Show more
        </button>
      </div>

      {/* Like and share section */}
      <div className="mt-8 bg-gray-100 border border-gray-300 rounded-xl p-6 text-gray-700">
        <h2 className="text-4xl text-gray-500 font-bold mb-2">
          Like this calculator? Please share
        </h2>

        <p className="text-gray-600">
          Please help us spread the word by sharing this with friends or on your
          website or blog. Thank you.
        </p>
        <div className="flex gap-2 mt-4">
          <button className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600">
            <Save className="inline mr-1" size={18} /> Save
          </button>
          <button className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600">
            <Link2 className="inline mr-1" size={18} /> Link
          </button>
        </div>
      </div>

      {/* on this page */}
      <div className="mt-8 border-t border-b border-gray-300 p-6 text-gray-700">
        <h4 className="text-2xl text-gray-500 font-bold mb-4">On this page:</h4>
        <ul className="list-disc pl-6 space-y-2 marker:text-red-500">
          <li>
            <Link
              href="/what-are-significant-figures"
              className="text-lg underline decoration-lime-500 decoration-2 hover:text-lime-600"
            >
              What are significant figures?
            </Link>
          </li>

          <li>
            <Link
              href="/how-to-calculate-significant-figures"
              className="text-lg underline decoration-lime-500 decoration-2 hover:text-lime-600"
            >
              How to calculate significant figures
            </Link>
          </li>

          <li>
            <Link
              href="/sig-figs-calculator-operators"
              className="text-lg underline decoration-lime-500 decoration-2 hover:text-lime-600"
            >
              Sig figs calculator operators
            </Link>
          </li>

          <li>
            <Link
              href="/how-many-significant-digits"
              className="text-lg underline decoration-lime-500 decoration-2 hover:text-lime-600"
            >
              How many significant digits are there in...?
            </Link>
          </li>
        </ul>
      </div>

      {/* What are significant figures? */}
      <div className="mt-8 p-6 text-gray-700">
        <h2 className="text-4xl mb-4 text-lime-500 font-bold">
          What are significant figures?
        </h2>
        <p className="text-lg mb-4">Significant figures (sig figs for short) are the meaningful digits in a number. Often, leading zeroes or trailing zeroes can be removed and the number remains just as accurate (004 means the same as 4, for example).</p>
        <p className="text-lg ">When removing digits, you must be able to identify the significant figures in order to retain the number's accuracy. When you round a number up or down, one or some of the significant figures are altered.</p>
      </div>

      {/* How to calculate significant figures */}
        <div className="mt-8 p-6 ">
        <h2 className="text-4xl mb-4 text-lime-500 font-bold">
            How to calculate significant figures
        </h2>
        <div className="bg-gray-100 border-2 border-gray-300 py-6 px-4">
            <p className="text-lg text-gray-600"><strong>Follow these 3 rules to identify the number of significant figures in a number: </strong>Any digit that is not zero is always significant. Zeroes located between other digits are significant. If there's a decimal point, then any trailing zeroes are significant.</p>
        </div>
        </div>
    </div>
  );
}
