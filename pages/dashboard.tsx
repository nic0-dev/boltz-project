import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";

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

        console.log("Fetched data:", rawData); // Debugging log
    } catch (error) {
        console.error("Error fetching data.json:", error);
    }

    // Filter and transform the data
    const filteredData = rawData.filter((item: DataPoint) =>
        item.datetime.startsWith("2024-01-01")
    );

    const transformedData = filteredData.map((item: DataPoint) => ({
        time: new Date(item.datetime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        consumption: item.consumption || 0,
        generation: item.generation || 0,
    }));

    return {
        props: {
            data: transformedData,
        },
    };
}




export default function Dashboard({ data }: { data: DataPoint[] }) {
    console.log("Chart data:", data);
    return (
        <div className="relative bg-[#111111] text-white min-h-screen">
            <Navbar />
            <div className="px-36 py-8">
                <div className="text-2xl font-bold mb-4">Dashboard</div>
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
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        02
                    </div>
                    
                    {/* 3rd Card: Takes 1 cell */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        03
                    </div>
                    
                    {/* 4th Card: Takes 1 cell */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        04
                    </div>
                    
                    {/* 5th Card: Takes 1 cell */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        05
                    </div>
                    
                    {/* 6th Card: Takes the whole row (col-span-3) */}
                    <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-3 flex items-center justify-center text-white text-xl font-bold">
                        06
                    </div>
                    </div>

            </div>
        </div>
    );
}
