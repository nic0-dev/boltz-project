import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative bg-[#111111] text-white min-h-screen">
      <Navbar />
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-contain bg-top opacity-40"
        style={{
          backgroundImage: "url('/map.svg')", // Access the SVG from the public folder
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(17, 17, 17, 0), #111111)",
        }}
      ></div>

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3B46F1] to-[#7B8EEA] bg-clip-text text-transparent">
          Small Change, Big 
        </h1>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3B46F1] to-[#7B8EEA] bg-clip-text text-transparent">
          Impact
        </h1>
        <p className="py-8 text-xl max-w-2xl">
        Dedicated to creating a positive and lasting environmental impact while promoting transparency and security
        </p>
        <Link href="/dashboard" className="flex items-center font-medium px-6 py-3 rounded-lg bg-gradient-to-b from-[#7B8EEA] to-[#3B46F1] text-white shadow-glow transition-transform hover:scale-105">
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </Link>
      </div>
      {/* Sections */}
      <section id="how-it-works" className="min-h-screen p-8">
        <h1 className="text-4xl font-bold">How it Works</h1>
        <p className="mt-4">Detailed explanation...</p>
      </section>
      <section id="boltz-conversion" className="min-h-screen p-8">
        <h1 className="text-4xl font-bold">$BOLTZ Conversion</h1>
        <p className="mt-4">Conversion details...</p>
      </section>
    </div>
  );
}
