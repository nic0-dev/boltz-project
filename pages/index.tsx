import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import Link from "next/link";
import Image from "next/image";

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
        <h1 className="text-6xl font-bold bg-gradient-to-r from-[#3B46F1] to-[#7B8EEA] bg-clip-text text-transparent">
          Small Change,
        </h1>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-[#3B46F1] to-[#7B8EEA] bg-clip-text text-transparent">
          Big Impact
        </h1>
        <p className="py-12 text-[#BFBFBF] font-medium md:text-lg max-w-2xl">
        Dedicated to creating a positive and lasting environmental impact while promoting transparency and security
        </p>
        <Link href="/dashboard" className="flex items-center font-medium px-6 py-3 rounded-lg bg-gradient-to-b from-[#7B8EEA] to-[#3B46F1] text-white shadow-glow transition-transform hover:scale-105">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M5 12l14 0" /> <path d="M13 18l6 -6" /> <path d="M13 6l6 6" />
          </svg>
        </Link>
      </div>
      
      <section id="how-it-works" className="min-h-screen p-8 flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFFFFF] to-[#7B8EEA] bg-clip-text text-transparent">How it Works</h1>
        <p className="text-[#878787] md:text-lg max-w-2xl text-center items-center">Start maximizing your earnings here. Transform your energy efforts<br></br>into real-world benefits</p>
        <div className="flex justify-center items-center gap-8 py-8">
          {/* Card 1 */}
          <div className="bg-[#1C1C1C] w-64 h-80 rounded-lg shadow-lg flex flex-col items-center justify-between p-4">
            <div className="text-gray-300 font-medium text-center text-lg">
              Apply for Net Metering
            </div>

            {/* Image Section */}
            <div className="flex-grow flex items-center justify-center">
              <Image
                src="/card1-image.svg"
                alt="Card Image 1"
                width={500} // Adjust width as needed
                height={120} // Adjust height as needed
                className="object-contain"
              />
            </div>
            <div className="text-[#878787] text-center text-sm">
              Switch to a renewable energy source
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1C1C1C] w-64 h-80 rounded-lg shadow-lg flex flex-col items-center justify-between p-4">
            <div className="text-gray-300 font-medium text-center text-lg">
            Decrease Electricity Consumption  
            </div>

            {/* Image Section */}
            <div className="flex-grow flex items-center justify-center">
              <Image
                src="/card2-image.svg"
                alt="Card Image 1"
                width={120} // Adjust width as needed
                height={120} // Adjust height as needed
                className="object-contain"
              />
            </div>
            <div className="text-[#878787] text-center text-sm">
              And/or sell the excess generated electricity back to the grid
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-[#1C1C1C] w-64 h-80 rounded-lg shadow-lg flex flex-col items-center justify-between p-4">
            <div className="text-gray-300 font-medium text-center text-lg">
            Receive and Redeem BOLTZ
            </div>

            {/* Image Section */}
            <div className="flex-grow flex items-center justify-center">
              <Image
                src="/card3-image.svg"
                alt="Card Image 3"
                width={200} // Adjust width as needed
                height={120} // Adjust height as needed
                className="object-contain"
              />
            </div>
            <div className="text-[#878787] text-center text-sm">
              Exchange BOLTZ(BLTZ) for special offers with our company partners
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
