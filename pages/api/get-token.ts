// this api route will handle the req to exchange spotify's auth code for a token

// imports types for handling API req and res
import type { NextApiRequest, NextApiResponse } from "next";

// Helper function to convert clientId and clientSecret to Base64
const encodeToBase64 = (clientId: string, clientSecret: string) => {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
};

// defines the main function (handler) that will respond to incoming API requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   res.status(200).json({ message: "API is working!" });

  // this will check if the request is a POST req
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // extracts the auth code from the req body
  const { code } = req.body;

  // load spotify app credentials
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URL!;

  // encode the clientId and clientSecret into a Base64 string
  const authHeader = encodeToBase64(clientId, clientSecret);

  // send a post request to spotify's /api/token endpoint
  try {
    // sends an HTTP request to the Spotify API’s token endpoint to exchange the authorization code for an access token.
    const response = await fetch("https://accounts.spotify.com/api/token", {
      // post bc we're submitting data (code) to Spotify in exchange for the access code
      method: "POST",
      // headers that are sent with the request
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authHeader}`, // (spotify requires this)
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    // handle the response
    const data = await response.json();

    // check if the token was recieved
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tokens" });
  }
}
