"use client";

import { useState } from "react";
import { evaluate } from "mathjs";
import { Equal, Link2, Save } from "lucide-react";
import Link from "next/link";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [roundTo, setRoundTo] = useState<number | null>(null);

  const buttons = [
    ["÷", "1", "2", "3", "^"],
    ["×", "4", "5", "6", "log"],
    ["+", "7", "8", "9", "ln"],
    ["-", "(", "0", ")", "e"],
  ];

  // Convert UI symbols to mathjs format
  const formatExpression = (expr: string) => {
    return expr
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/log/g, "log10")
      .replace(/ln/g, "log")
      .replace(/e/g, "e");
  };

  // Round to significant figures
  const roundToSigFigs = (num: number, sig: number) => {
    if (num === 0) return 0;
    return Number(num.toPrecision(sig));
  };

  const handleSolve = () => {
    try {
      const formatted = formatExpression(input);
      let evalResult = evaluate(formatted);

      if (typeof evalResult === "number") {
        if (roundTo) {
          evalResult = roundToSigFigs(evalResult, roundTo);
        }
        setResult(evalResult.toString());
        setInput(""); // Clear input after solving
      }
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <>
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-semibold text-gray-700 mb-6">
        Significant Figures Calculator
      </h1>

      <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm">

      {/* <div className="h-12 w-full">
        {result && (
          <div className="mb-4 text-xl font-semibold text-green-600">
            = {result}
          </div>
        )}
      </div> */}

      <div className="relative mb-4">

  {/* RESULT DISPLAY */}
  {result && (
    <div className="mb-3 p-4 absolute top-0 right-0 rounded-lg bg-green-50 border border-green-300 text-right text-xl font-semibold text-green-700">
      = {result}
    </div>
  )}

  {/* INPUT */}
  <input
    type="text"
    value={input}
    onChange={(e) => {
      setInput(e.target.value);
      if (result) setResult(null); // reset result if typing again
    }}
    placeholder={result ? "" : "EX: 1.5/log(5+1)"} // ✅ hide placeholder
    className="w-full p-4 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
  />
</div>

        

        

        {/* Buttons */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {buttons.flat().map((btn, index) => {
            const isOperator = ["÷", "×", "+", "-"].includes(btn);

            return (
              <button
                key={index}
                onClick={() => setInput((prev) => prev + btn)}
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
          <button
            onClick={handleClear}
            className="bg-gray-200 rounded-lg py-3 hover:bg-gray-300"
          >
            Clear
          </button>

          <button
            onClick={handleBackspace}
            className="bg-gray-200 rounded-lg py-3 hover:bg-gray-300"
          >
            ⌫
          </button>

          <button
            onClick={() => setInput((prev) => prev + ".")}
            className="bg-gray-200 rounded-lg py-3 hover:bg-gray-300"
          >
            .
          </button>

          <button
            onClick={handleSolve}
            className="bg-green-500 text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-green-600"
          >
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
                onClick={() => setRoundTo(num)}
                className={`px-4 py-2 border rounded-lg 
                ${
                  roundTo === num
                    ? "bg-green-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setRoundTo(null)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Off
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
        <p className="text-lg mb-4">
          Significant figures (sig figs for short) are the meaningful digits in
          a number. Often, leading zeroes or trailing zeroes can be removed and
          the number remains just as accurate (004 means the same as 4, for
          example).
        </p>
        <p className="text-lg ">
          When removing digits, you must be able to identify the significant
          figures in order to retain the number's accuracy. When you round a
          number up or down, one or some of the significant figures are altered.
        </p>
      </div>

      {/* How to calculate significant figures */}
      <div className="mt-8 p-6 ">
        <h2 className="text-4xl mb-4 text-lime-500 font-bold">
          How to calculate significant figures
        </h2>
        <div className="bg-gray-100 border-2 border-gray-300 py-6 px-4">
          <p className="text-lg text-gray-600">
            <strong>
              Follow these 3 rules to identify the number of significant figures
              in a number:{" "}
            </strong>
            Any digit that is not zero is always significant. Zeroes located
            between other digits are significant. If there's a decimal point,
            then any trailing zeroes are significant.
          </p>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Let's go through the{" "}
          <Link
            href="/what-are-significant-figures"
            className="underline text-lime-500 hover:text-lime-600"
          >
            rules for significant figures{" "}
          </Link>
          in more detail...
        </p>
      </div>

      {/* All of the following are significant figures */}
      <div className="p-6 text-gray-700">
        <h4 className="text-2xl mb-6 font-bold">
          All of the following are significant figures:
        </h4>

        <div className="space-y-4">
          {/* Item 1 */}
          <div className="border-t border-gray-400 bg-gray-100 p-4 flex gap-6 items-start">
            <div className="text-5xl font-bold text-gray-500 w-12">1</div>
            <p className="text-lg">
              Any digit that is not 0 is always significant.
            </p>
          </div>

          {/* Item 2 */}
          <div className="border-t border-gray-400 bg-gray-100 p-4 flex gap-6 items-start">
            <div className="text-5xl font-bold text-gray-500 w-12">2</div>
            <p className="text-lg">
              0 is significant when it's between other digits, such as 205 or
              3.604 (because clearly, 205 is not the same as 25).
            </p>
          </div>

          {/* Item 3 */}
          <div className="border-t border-gray-400 bg-gray-100 p-4 flex gap-6 items-start">
            <div className="text-5xl font-bold text-gray-500 w-12">3</div>
            <p className="text-lg leading-relaxed">
              If there's a decimal point, then any trailing zeroes are
              significant figures (e.g. 90.7500). These trailing zeroes might
              seem unnecessary at first glance, but they confirm the precision
              of the number. 90.75 could well be 90.7511 rounded down to two
              decimal places. So 90.7500 confirms that it is completely exact to
              four decimal places.
            </p>
          </div>
        </div>
      </div>

      {/* All of the following are significant figures */}
      <div className="p-6 text-gray-700">
        <h4 className="text-2xl mb-6 font-bold">
          All of the following are not significant figures:
        </h4>

        <div className="space-y-4">
          {/* Item 1 */}
          <div className="border-t border-gray-400 bg-gray-100 p-4 flex gap-6 items-start">
            <div className="text-5xl font-bold text-gray-500 w-12">1</div>
            <div className="">
              <p className="text-lg">
                Leading zeroes before a non-zero digit are not significant
                figures (00200 is the same as 200, and 007 is the same as 7, so
                the leading 0s are not significant. They don't make the number
                any more precise).
              </p>
              <p className="text-lg my-4">
                This principle can be confusing, but leading zeros are still not
                significant figures, even if they come after a decimal point.
                0.01kg of grapes are not the same as 1kg of grapes, so the
                leading zeroes might seem to be significant. However, 0.01kg can
                also be expressed as 10g. It's the same value.
              </p>
              <p className="text-lg">
                So leading zeroes are not considered to be significant figures;
                it's the 1 part that's significant. Of course, if the zero sits
                between two significant figures (e.g. 2.303) then the zero is
                significant, in line with rule (2) explained above.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="border-t border-gray-400 bg-gray-100 p-4 flex gap-6 items-start">
            <div className="text-5xl font-bold text-gray-500 w-12">2</div>
            <p className="text-lg">
              Trailing zeroes are not significant when there's no decimal point
              involved. If there is a decimal point, then, according to rule (3)
              explained above, any trailing zeroes are considered to be
              significant figures.
            </p>
          </div>
        </div>
      </div>

      {/* How many significant digits are there in...? */}
      <div className="p-6">
        {/* Heading */}
      <h2 className="text-4xl font-bold text-lime-600 mb-6">
        How many significant digits are there in...?
      </h2>

      {/* Subtext */}
      <p className="text-lg text-gray-700 mb-6">
        Here are some examples of significant figure calculations:
      </p>

      {/* List */}
      <ul className="list-disc pl-6 space-y-3 text-gray-800 text-lg marker:text-gray-500">

        <li>7 has 1 significant figure (7).</li>

        <li>73 has 2 significant figures (7 and 3).</li>

        <li>
          <Link
            href="/significant-figures/100"
            className="text-lime-600 underline decoration-lime-500 hover:text-lime-700"
          >
            100 has 1 significant figure (1).
          </Link>
        </li>

        <li>673 has 3 significant figures (6, 7 and 3).</li>

        <li>
          673.52 has 5 significant figures (6, 7, 3, 5 and 2).
        </li>

        <li>
          0.0637 has 3 significant figures (6, 3 and 7).
        </li>

        <li>
          30.00 has 4 significant figures (3, 0, 0 and 0) and 2 decimals.
        </li>

        <li>
          0.0025 has 2 significant figures (2 and 5) and 4 decimals.
        </li>

      </ul>
      </div>

        {/* Sig fig calculator operators */}
      <div className="p-6">
        {/* Heading */}
      <h2 className="text-4xl font-bold text-lime-600 mb-6">
        Sig fig calculator operators
      </h2>

      {/* Subtext */}
      <p className="text-lg text-gray-700 mb-6">
        You can use the following operators and functions with our calculator:
      </p>

      {/* List */}
      <ul className="list-disc pl-6 space-y-3 text-gray-800 text-lg marker:text-gray-500">

        <li>Addition ( + ), subtraction ( - ), division ( / or ÷ ) and multiplication ( * or × ). Plus exponent ( ^ )</li>

        <li>Grouping symbols: parentheses ( )</li>

        <li>Functions: log, ln</li>
      </ul>
      <p className="text-lg text-gray-700 mt-6">
        Our calculator also provides a counter, showing you the number of significant figures for any calculation.  
      </p>
      </div>

      <div className="p-6">
        {/* Heading */}
      <h2 className="text-4xl font-bold text-lime-600 mb-6">
        Other useful calculators
      </h2>

      {/* Subtext */}
      <p className="text-lg text-gray-700 mb-6">
        Check out the math calculators at The Calculator Site for assistance with <Link href="/math-calculators" className="text-lime-600 underline decoration-lime-500 hover:text-lime-700">converting decimals to fractions </Link>. For those of you at university wanting help with calculating your module, assignment or course grades, give the <Link href="/math-calculators" className="text-lime-600 underline decoration-lime-500 hover:text-lime-700">university grade calculator </Link>a try.
      </p>
    </div>
    </div>

    <footer className="border-t border-gray-300 bg-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-600">

        {/* Top Links */}
        <div className="mb-6 text-sm">
          <span className="mx-2">|</span>
          <Link
            href="/disclaimer"
            className="text-lime-600 hover:underline"
          >
            disclaimer
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/privacy-policy"
            className="text-lime-600 hover:underline"
          >
            privacy policy
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/contact"
            className="text-lime-600 hover:underline"
          >
            contact
          </Link>
          <span className="mx-2">|</span>
        </div>

        {/* Credit Line */}
        <p className="text-sm mb-4">
          This calculator was originally developed by{" "}
          <span className="text-lime-600">Quentin Truong</span>, and expanded by the team at{" "}
          <Link
            href="https://www.thecalculatorsite.com"
            target="_blank"
            className="text-lime-600 hover:underline"
          >
            The Calculator Site
          </Link>.
        </p>

        {/* Address */}
        <p className="text-xs text-gray-500 mb-2">
          Hazell Industries Ltd, 124 City Road, London, EC1V 2NX
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © Hazell Industries Ltd - {new Date().getFullYear()}
        </p>

      </div>
    </footer>
    </>
  );
}
