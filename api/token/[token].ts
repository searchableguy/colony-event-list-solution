import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const { token } = req.query;
    const endpoint = encodeURI(
      `https://api.ethplorer.io/getTokenInfo/${token}?apiKey=${process.env.ETHPLORER_API_KEY}`
    );
    const result = await fetch(endpoint);
    const json = await result.json();
    res.status(200).json(json);
  } catch (error) {
    console.error(error);
    res.status(501).send("Problem fetching the token info.");
  }
}
