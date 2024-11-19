import Navbar from "@/components/Navbar";
import Image from "next/image";
import {
  useContract,
  useTokenBalance,
  useBurnToken,
  ConnectWallet,
  darkTheme,
  useAddress,
} from "@thirdweb-dev/react";
import { useState } from "react";

export default function Dashboard() {
    const address = useAddress();
    const { contract: stakeTokenContract } = useContract(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);
    const { data: tokenBalance, isLoading } = useTokenBalance(stakeTokenContract, address);

    // Hook to burn tokens
    const { mutateAsync: burnToken, isLoading: isBurning } = useBurnToken(stakeTokenContract);
    const [customBurnAmount, setCustomBurnAmount] = useState("");

    const handleBurn = async (amount: string) => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Please enter a valid amount to burn.");
            return;
        }
        try {
            await burnToken({ amount }); // Thirdweb's `useBurnToken` handles the burn action
            alert(`Successfully burned ${amount} BLTZ`);
        } catch (error: unknown) {
            if (typeof error === "object" && error !== null && "message" in error) {
                const errorMessage = (error as { message: string }).message;
                if (errorMessage.includes("user rejected transaction")) {
                    alert("Transaction rejected by the user.");
                } else {
                    console.error("Burn failed:", error);
                    alert("Processing failed. Please try again.");
                }
            } else {
                console.error("An unknown error occurred:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };    


  if (!address) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="h2 text-white my-4">Please Connect a Wallet</div>
        <ConnectWallet
          theme={darkTheme({
            colors: {
              primaryButtonText: "hsl(0, 100%, 99%)",
              primaryButtonBg: "hsl(0, 0%, 11%)",
              secondaryButtonHoverBg: "hsl(228, 2%, 28%)",
            },
          })}
          modalTitle=" "
          modalTitleIconUrl=""
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <Navbar />

      {/* Background Gradient */}
      <div className="absolute inset-0 h-[80vh] bg-gradient-to-br from-black to-[#333333] z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center space-y-8 px-4 pb-12">
        {/* Title and Subtitle */}
        <div className="text-center space-y-4 mt-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFFFFF] to-[#7B8EEA] bg-clip-text text-transparent">
            Redeem awesome<br />products and services
          </h1>
          <p className="text-[#878787] md:text-lg max-w-2xl">
            Exchange your BOLTZ tokens for products, services, and more. Start enjoying the benefits of your energy savings today!
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#FFFFFF]/50 backdrop-blur-md shadow-lg rounded-lg border border-[#BFBFBF] p-12 md:p-8 max-w-3xl">
          <div className="bg-[#FDFDFD] p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full border border-gray-200">
            {/* Token Balance */}
            <div className="flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="text-black text-lg font-semibold mb-2">
                {isLoading ? "Loading..." : "My Current Balance"}
              </div>
              <div className="text-black font-bold text-4xl text-center">
                {isLoading ? "..." : `${Number(tokenBalance?.displayValue).toFixed(3)} ${tokenBalance?.symbol}`}
              </div>
            </div>

            {/* Redeem Actions */}
            {/* Custom Burn */}
            <div className="flex items-center justify-between gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="flex items-center gap-4">
                <Image src="/meralco.svg" alt="Meralco Icon" width={40} height={40} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Meralco Billing Deduction</h3>
                  <p className="text-sm text-gray-500">
                    Customers can decide how much BLTZ can be redeemed and deducted from their monthly electricity bill.
                    <br />
                    <span className="text-[#555555] font-bold">1 BLTZ = 1 PHP total bill deduction</span>
                  </p>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customBurnAmount}
                    onChange={(e) => setCustomBurnAmount(e.target.value)}
                    className="text-[#111111] border border-gray-300 rounded px-2 py-1 mt-2"
                  />
                </div>
              </div>
              <button
                onClick={() => handleBurn(customBurnAmount)}
                disabled={isBurning}
                className="bg-[#FF5733] hover:bg-[#FF693E] text-white font-semibold py-2 px-6 rounded-lg"
              >
                {isBurning ? "Processing..." : "Redeem"}
              </button>
            </div>

            {/* Burn 1,000 BLTZ */}
            <div className="flex items-center justify-between gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="flex items-center gap-4">
                <Image src="/itron.svg" alt="Itron Icon" width={40} height={40} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Itron Product Voucher</h3>
                  <p className="text-sm text-gray-500">
                    <span className="text-[#555555] font-bold">1,000 BLTZ</span> can be exchanged for a{" "}
                    <span className="text-[#555555] font-bold">500 PHP voucher</span> with a minimum single-receipt spend of{" "}
                    <span className="text-[#555555] font-bold">4500 PHP</span>.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleBurn("1000")}
                disabled={isBurning}
                className="bg-[#FF5733] hover:bg-[#FF693E] text-white font-semibold py-2 px-6 rounded-lg"
              >
                {isBurning ? "Processing..." : "Redeem"}
              </button>
            </div>

            {/* Burn 20,000 BLTZ */}
            <div className="flex items-center justify-between gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="flex items-center gap-4">
                <Image src="/huawei.svg" alt="Huawei Icon" width={40} height={40} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Huawei Product Redemption</h3>
                  <p className="text-sm text-gray-500">
                    <span className="text-[#555555] font-bold">20,000</span> BLTZ can be exchanged for{" "}
                    <span className="text-[#555555] font-bold">one (1) Huawei product or service worth 1,000 PHP</span> from
                    any of the partner merchants.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleBurn("20000")}
                disabled={isBurning}
                className="bg-[#FF5733] hover:bg-[#FF693E] text-white font-semibold py-2 px-6 rounded-lg"
              >
                {isBurning ? "Processing..." : "Redeem"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
