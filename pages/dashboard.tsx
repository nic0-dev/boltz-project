import { Bar, BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { PieChart, Pie, Cell} from 'recharts';
import Navbar from "@/components/Navbar";
import { useContract } from "@thirdweb-dev/react";
import { ConnectWallet, darkTheme, useAddress, useTokenBalance } from "@thirdweb-dev/react";

interface DataPoint {
    consumption: number;
    generation: number;
    datetime: string; // ISO 8601 format
}

export async function getServerSideProps() {
    let rawData = [];

    try {
        // Fetch the data using the NEXT_PUBLIC_SITE_URL environment variable
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/data.json`);
        rawData = await res.json();
    } catch (error) {
        console.error("Error fetching data.json:", error);
    }

    // Filter and transform the data
    const filteredData = rawData.filter((item: DataPoint) =>
        item.datetime.startsWith("2024-10-01")
    );

    const electricityRate = 11.4295; // Php/kWh
    const generatedRate = 6.4948; // Php/kWh (for earnings calculation)
    let totalGeneratedEarnings = 0;
    const totalOctoberConsumption = 505.559334;
    const totalSeptemberConsumption = 665.8401609;
    const totalSavingEarnings = (totalSeptemberConsumption - totalOctoberConsumption) * 0.1;

    const transformedData = filteredData.map((item: DataPoint) => {
        // Calculate net consumption
        const netConsumption = item.consumption - item.generation;

        // If net consumption is less than or equal to 0, price is 0
        const price = netConsumption <= 0 ? 0 : netConsumption * electricityRate;
        const generatedEarnings = netConsumption <= 0 ? Math.abs(netConsumption) * generatedRate : 0;
        totalGeneratedEarnings += generatedEarnings;

        return {
            time: new Date(item.datetime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "UTC",
            }),
            consumption: item.consumption || 0,
            generation: item.generation || 0,
            billingAmount: price, // Add the billing amount for the chart
            generatedEarnings: generatedEarnings,
        };
    });

    return {
        props: {
            data: transformedData,
            totalGeneratedEarnings: totalGeneratedEarnings.toFixed(2),
            totalSavingEarnings: totalSavingEarnings.toFixed(2)
        },
    };
}

export default function Dashboard({ data, totalGeneratedEarnings, totalSavingEarnings }: { data: DataPoint[],totalGeneratedEarnings: string,totalSavingEarnings: string }) {
    const address = useAddress();
    const { contract: stakeTokenContract } = useContract(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);
    const { data: tokenBalance, isLoading } = useTokenBalance(stakeTokenContract, address);
    if(!address) {
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
        <div className="relative bg-[#111111] text-white min-h-screen">
            <Navbar />
            <div className="px-36 py-8">
                <div className="flex flex-row gap-4 justify-between w-full">
                    <div className="text-2xl font-bold mb-4">Dashboard</div>
                    <div className="text-sm text-[#878787]">Current Month: October, 2024</div>
                </div>
                {/* Cards*/}
                <div className="h-200vh grid grid-rows-3 grid-cols-3 gap-4">
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-2 flex flex-col items-center justify-center p-4">
                        <div className="text-white text-lg font-semibold mb-4">Hourly Energy Profile</div>
                        <ResponsiveContainer width="95%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#ffffff"
                                    interval={2}
                                    tick={{ fontSize: 12, fill: "#ffffff" }}
                                />
                                <YAxis
                                    stroke="#ffffff"
                                    tick={{ fontSize: 12, fill: "#ffffff" }}
                                    label={{
                                        value: "kWh",
                                        angle: -90,
                                        position: "insideLeft",
                                        fill: "#ffffff",
                                        fontSize: 14,
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1C1C1C",
                                        border: "1px solid #878787",
                                        borderRadius: "4px",
                                    }}
                                    labelFormatter={(label) => `Time: ${label}`}
                                    formatter={(value, name) => [
                                        `${(value as number).toFixed(4)} kWh`,
                                        name,
                                    ]}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="consumption"
                                    stroke="#FF9500"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Consumption"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="generation"
                                    stroke="#7B8EEA"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Generation"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    
                    {/* 2nd Card: Takes 1 cell */}
                    <div className="bg-gradient-to-tr from-[#AA0600] to-[#FF9500] border border-[#333333] rounded-lg flex flex-col items-center justify-center text-white text-xl font-bold">
                        <div className="text-white text-lg font-semibold mb-2">
                        {isLoading ? "Loading..." : "Token Balance"}
                        </div>
                        <div className="text-4xl text-center">
                        {isLoading ? "..." : `${Number(tokenBalance?.displayValue).toFixed(3)}`}
                        </div>
                        <div className="text-4xl text-center">
                        BLTZ
                        </div>
                    </div>
                    
                    {/* 3rd Card: Takes 1 cell */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex flex-col items-center justify-center text-white text-xl font-bold">
                        <div className="text-white text-lg font-semibold my-4">Current Earnings from</div>
                        <div className="flex flex-col justify-between w-[80%] px-8">
                            <div className="flex flex-row items-center justify-between">
                                <div className="text-sm text-[#878787]">Solar</div>
                                <div className="text-sm text-[#878787]">Savings</div>
                                
                            </div>
                            
                            <div className="flex flex-row items-center justify-between">
                                <div className="text-2xl">{totalGeneratedEarnings} Php</div>
                                <div className="border border-[#878787] h-16 mx-4"></div>  {/* Vertical line */}
                                <div className="text-2xl text-right">{totalSavingEarnings} Php</div>  {/* Placeholder for savings */}
                            </div>
                        </div>
                    </div>

                    {/* 4th Card: Takes 1 cell */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex flex-col items-center justify-center text-white text-xl font-bold">
                        <div className="text-white text-lg font-semibold mt-4 pb-4">Ave. Token rate per hour</div>
                        {/* Handle the computation directly inside the card */}
                        <div className="text-4xl">
                            {(
                                (parseFloat(totalGeneratedEarnings) + parseFloat(totalSavingEarnings)) / 48
                            ).toFixed(2)} BLTZ
                        </div>
                    </div>
                                                            
                    {/* 5th Card: Total Earnings Breakdown */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-1 flex flex-col items-center justify-center text-white text-xl font-bold">
                        <div className="text-white text-lg font-semibold mt-4 pb-4">Total Earnings Breakdown</div>
                        <ResponsiveContainer width="100%" height={260}> 
                            <PieChart>
                                {/* Define the gradients for each segment */}
                                <defs>
                                    <linearGradient id="gradientColor1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#7B8EEA" />
                                        <stop offset="50%" stopColor="#3B46F1" />
                                    </linearGradient>
                                    <linearGradient id="gradientColor2" x1="0%" y1="00%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#FF9500" />
                                        <stop offset="50%" stopColor="#FF3B30" />
                                    </linearGradient>
                                </defs>

                                <Pie 
                                    data={[ 
                                        { name: 'Generated Earnings', value: parseFloat(totalGeneratedEarnings) },
                                        { name: 'Savings Earnings', value: parseFloat(totalSavingEarnings) }
                                    ]}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={90}
                                    innerRadius={50}
                                    stroke="#333333"
                                >
                                    {/* Apply individual gradients to each segment */}
                                    <Cell fill="url(#gradientColor1)" />  {/* Gradient for Generated Earnings */}
                                    <Cell fill="url(#gradientColor2)" />  {/* Gradient for Savings Earnings */}
                                </Pie>

                                

                                <Legend
                                    iconSize={12}         // Smaller legend icon size
                                    formatter={(value) => {
                                        const totalEarnings = parseFloat(totalGeneratedEarnings) + parseFloat(totalSavingEarnings);
                                        const percentage = value === 'Generated Earnings' 
                                            ? (parseFloat(totalGeneratedEarnings) / totalEarnings * 100).toFixed(2)
                                            : (parseFloat(totalSavingEarnings) / totalEarnings * 100).toFixed(2);
                    
                                        // Apply custom colors to the legend items
                                        const color = value === 'Generated Earnings' ? '#5765EE' : '#FF3B30'; 
                                        return (
                                            <span style={{ color, fontSize: '0.8rem' }}>
                                                {value} ({percentage}%)
                                            </span>
                                        );
                                    }}
                                    wrapperStyle={{
                                        fontSize: '0.8rem',  // Reduce legend font size
                                        paddingTop: 25,        // Adjust vertical spacing in the legend
                                        marginBottom: 5,     // Adjust vertical spacing in the legend
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>


                    {/* 6th Card: Takes the whole row (col-span-3) */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-3 flex flex-col items-center justify-center text-white text-xl font-bold">
                        <div className="text-white text-lg font-semibold my-4">Hourly Cost</div>
                        <ResponsiveContainer width="95%" height={300}>
                            <BarChart
                                data={data}
                                barCategoryGap="20%"  // Increase the space between categories
                                barGap={24}            // Increase the space between bars within the same category
                            >
                                <defs>
                                    <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FF9500" />
                                        <stop offset="100%" stopColor="#FF3B30" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#ffffff"
                                    interval={2}
                                    tick={{ fontSize: 12, fill: "#ffffff" }}
                                />
                                <YAxis
                                    stroke="#ffffff"
                                    tick={{ fontSize: 12, fill: "#ffffff" }}
                                    label={{
                                        value: "Php",
                                        angle: -90,
                                        position: "insideLeft",
                                        fill: "#ffffff",
                                        fontSize: 14,
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1C1C1C",
                                        border: "1px solid #878787",
                                        borderRadius: "4px",
                                    }}
                                    labelFormatter={(label) => `Time: ${label}`}
                                    formatter={(value, name) => [
                                        `${(value as number).toFixed(4)} Php`,
                                        name,
                                    ]}
                                />
                                <Legend />
                                
                                {/* Bar for Billing Amount with Gradient */}
                                <Bar
                                    dataKey="billingAmount"  // Use billingAmount here
                                    fill="url(#gradientColor)"  // Apply the gradient
                                    stroke="#FF3B30"           // Set stroke to #FF3B30
                                    strokeWidth={2}            // Optional: adjust stroke width
                                    radius={[4, 4, 0, 0]}      // Rounded corners on the top of the bar
                                    name="Bill"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>



                    </div>

            </div>
        </div>
    );
}
