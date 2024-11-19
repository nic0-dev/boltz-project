import Link from "next/link";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#111111]/50 backdrop-blur-md border-b border-[#333333]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Left Section - Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/" className="flex items-center space-x-3 text-xl font-bold">
            <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18.0874" y="4.68237" width="6.89002" height="14.816" rx="1.18046" fill="url(#paint0_linear_32_48)" />
                <path
                    d="M0 5.49143C2.69072 2.80071 7.05324 2.80071 9.74396 5.49143L24.0192 19.7667L20.8916 22.8943C20.281 23.5049 19.9757 23.8102 19.6237 23.9245C19.314 24.0252 18.9804 24.0252 18.6708 23.9245C18.3187 23.8102 18.0134 23.5049 17.4028 22.8943L0 5.49143Z"
                    fill="url(#paint1_linear_32_48)"
                />
                <path
                    d="M23.1338 18.8814C23.1338 18.8814 23.5703 19.3179 23.9897 19.3658C24.2908 19.4002 24.7245 19.0526 24.7245 19.0526L24.0191 19.7667L23.1338 18.8814Z"
                    fill="url(#paint2_linear_32_48)"
                />
                <path
                    d="M43.0572 18.6982C40.3665 21.3889 36.004 21.3889 33.3133 18.6982L19.038 4.42293L22.6835 0.777466C23.1128 0.348146 23.3275 0.133487 23.575 0.0530594C23.7927 -0.0176864 24.0273 -0.0176865 24.245 0.0530593C24.4925 0.133487 24.7072 0.348146 25.1365 0.777466L43.0572 18.6982Z"
                    fill="url(#paint3_linear_32_48)"
                />
                <path
                    d="M19.9234 5.30819C19.9234 5.30819 19.487 4.87171 19.0675 4.82382C18.7664 4.78943 18.3328 5.137 18.3328 5.137L19.0381 4.42286L19.9234 5.30819Z"
                    fill="url(#paint4_linear_32_48)"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_32_48"
                        x1="21.5324"
                        y1="4.68237"
                        x2="21.5324"
                        y2="19.4983"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#4967C7" />
                        <stop offset="0.506667" stopColor="#96BAF9" />
                        <stop offset="1" stopColor="#4967C7" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_32_48"
                        x1="12.3622"
                        y1="3.47339"
                        x2="12.3622"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#96BAF9" />
                        <stop offset="1" stopColor="#4967C7" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_32_48"
                        x1="12.3622"
                        y1="3.47339"
                        x2="12.3622"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#96BAF9" />
                        <stop offset="1" stopColor="#4967C7" />
                    </linearGradient>
                    <linearGradient
                        id="paint3_linear_32_48"
                        x1="30.695"
                        y1="0"
                        x2="30.695"
                        y2="20.7162"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#E4751F" />
                        <stop offset="1" stopColor="#FF3B30" />
                    </linearGradient>
                    <linearGradient
                        id="paint4_linear_32_48"
                        x1="30.695"
                        y1="0"
                        x2="30.695"
                        y2="20.7162"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#E4751F" />
                        <stop offset="1" stopColor="#FF3B30" />
                    </linearGradient>
                </defs>
            </svg>
              <span className="text-white">Boltz</span>
            </Link>
          </div>

          {/* Center Section - Links */}
          <div className="flex-1 justify-center md:flex md:items-center md:gap-12">
            <nav aria-label="Global">
              <ul className="font-semibold flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/about"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/convert"
                  >
                    Convert
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Section - Connect Wallet Button */}
          <div className="flex-1 flex justify-end">
            <ConnectWallet
                theme={darkTheme({
                    colors: {
                    primaryButtonText: "hsl(0, 100%, 99%)",
                    primaryButtonBg: "hsl(0, 0%, 11%)",
                    secondaryButtonHoverBg: "hsl(228, 2%, 28%)",
                    },
                })}
                />
          </div>

          {/* Mobile Menu Icon */}
          <div className="block md:hidden">
            <button className="rounded p-2 text-gray-400 transition hover:text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
