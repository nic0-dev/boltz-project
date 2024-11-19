export default async function handler(req, res) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/data.json`);
        const data = await response.json();
        res.status(200).json({ data });
    } catch (error) {
        console.error("Error fetching data from /public/data.json:", error);

        res.status(500).json({ error: "Failed to fetch mock data." });
    }
}
