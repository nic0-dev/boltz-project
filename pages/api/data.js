import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    // Resolve the path to the data.json file in the public folder
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Ensure the data is parsed correctly and respond
    res.status(200).json(data);
}
