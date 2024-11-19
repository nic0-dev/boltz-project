const fetchAuthToken = async (): Promise<{ idToken: string; refreshToken: string } | null> => {
    const authUrl = "https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/account/verify";
    const username = "meralcocustomer4@gmail.com";
    const password = "Meralco@2024";

    try {
        const credentials = btoa(`${username}:${password}`);
        const response = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error response from API:", errorDetails);
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Token data:", data);

        return {
            idToken: data.data.idToken,
            refreshToken: data.data.refreshToken,
        };
    } catch (error) {
        console.error("Error fetching token:", (error as Error).message);
        return null;
    }
};

const refreshAuthToken = async (refreshToken: string): Promise<string | null> => {
    const refreshUrl = "https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/account/refresh";

    try {
        const response = await fetch(refreshUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: refreshToken,
                email: "meralcocustomer4@gmail.com",
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error refreshing token:", errorDetails);
            throw new Error(`Failed to refresh token: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Refreshed Token Data:", data);

        return data.data.idToken; // Return the new idToken
    } catch (error) {
        console.error("Error refreshing token:", (error as Error).message);
        return null;
    }
};

const fetchLatestMeterData = async (idToken: string): Promise<MeterData | null> => {
    const meterApiUrl = "https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/meter/latest";
    const meterId = "MTR0004";

    try {
        const response = await fetch(`${meterApiUrl}?meterId=${meterId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error fetching meter data:", errorDetails);
            throw new Error(`Failed to fetch meter data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Meter Data:", data);
        return data.data;
    } catch (error) {
        console.error("Error fetching meter data:", (error as Error).message);
        return null;
    }
};

import { useEffect, useState } from "react";

interface MeterData {
    meterId: string;
    consumption_kWh: number;
    demand_kW: number;
    powerFactor: number;
    startDate: string;
    endDate: string;
}

export default function Dashboard() {
    const [meterData, setMeterData] = useState<MeterData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let tokenResponse = await fetchAuthToken();
                if (!tokenResponse) {
                    setError("Authentication failed. Please log in again.");
                    return;
                }

                let { idToken, refreshToken } = tokenResponse;

                let data = await fetchLatestMeterData(idToken);
                if (!data) {
                    console.warn("Attempting to refresh token...");
                    idToken = await refreshAuthToken(refreshToken);

                    if (!idToken) {
                        setError("Failed to refresh token. Please log in again.");
                        return;
                    }

                    data = await fetchLatestMeterData(idToken);
                    if (!data) {
                        setError("Failed to fetch meter data after refreshing token.");
                        return;
                    }
                }

                setMeterData(data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : meterData ? (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Latest Meter Data</h2>
                    <ul className="list-disc pl-5 mt-4 text-white">
                        <li><strong>Meter ID:</strong> {meterData.meterId}</li>
                        <li><strong>Consumption (kWh):</strong> {meterData.consumption_kWh}</li>
                        <li><strong>Demand (kW):</strong> {meterData.demand_kW}</li>
                        <li><strong>Power Factor:</strong> {meterData.powerFactor}</li>
                        <li><strong>Start Date:</strong> {new Date(meterData.startDate).toLocaleString()}</li>
                        <li><strong>End Date:</strong> {new Date(meterData.endDate).toLocaleString()}</li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
