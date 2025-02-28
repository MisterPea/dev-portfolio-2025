import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import axios from 'axios';
import { getStoredSong, fetchCurrentlyPlaying } from './getCurrentListening.mjs';

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const DYNAMO_TABLE = "SpotifyNowPlaying";


export const handler = async (event) => {
  try {
    const { artist, album, track_name, is_listening, url, timestamp } = await getStoredSong();

    // If less than 6 min elapsed since last song
    if (timestamp + 360000 > Math.floor(Date.now())) {
      console.log("Using cached song");
      return { artist, album, track_name, is_listening, url }
    } else {
      console.log("Fetching new song");
      const { token } = await getToken();
      const currentlyPlaying = await fetchCurrentlyPlaying(token);
      return currentlyPlaying
    }
  } catch (error) {
    console.error('Error in Lambda function', error);
    return { error: 'Internal Sever Error' };
  }
};

// Retrieve or request token
async function getToken() {
  const authData = await getStoredAuth();

  if (authData && authData.auth_token && authData.token_expiration > Math.floor(Date.now())) {
    console.log("Using cached token");
    return { token: authData.auth_token };
  }
  if (authData && authData.refresh_token) {
    console.log("Refreshing token...");
    return await refreshSpotifyToken(authData.refresh_token);
  } else {
    console.log("No refresh token found. Need to authenticate manually.");
    return { error: "No refresh token. Please authenticate manually and add it to your DynamoDB manually, you big lug." };
  }
}

// Fetch token details from DynamoDB
async function getStoredAuth() {
  const params = {
    TableName: DYNAMO_TABLE,
    Key: { id: { S: "auth" } },
  };

  const command = new GetItemCommand(params);
  const result = await dynamoClient.send(command);

  if (!result.Item) {
    console.log("No authentication data found in DynamoDB.");
    return null;
  }

  return {
    auth_token: result.Item.auth_token?.S || null,
    refresh_token: result.Item.refresh_token?.S || null,
    token_expiration: result.Item.token_expiration?.N ? parseInt(result.Item.token_expiration.N) : 0,
  };
}

// Refresh Token
async function refreshSpotifyToken(refreshToken) {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(tokenUrl, new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }), {
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const newAuthToken = response.data.access_token;
    // expires_in is in seconds
    const expirationTime = Math.floor(Date.now()) + (response.data.expires_in * 1000);

    await updateStoredAuth(newAuthToken, refreshToken, expirationTime);

    return { token: newAuthToken };
  } catch (error) {
    console.error("Failed to refresh token", error.response?.data || error);
    return { error: "Failed to refresh token" };
  }
}

// Update token in DynamoDB
async function updateStoredAuth(authToken, refreshToken, expiration) {
  const params = {
    TableName: DYNAMO_TABLE,
    Item: {
      id: { S: "auth" },
      auth_token: { S: authToken },
      refresh_token: { S: refreshToken },
      token_expiration: { N: expiration.toString() } // DynamoDB requires numbers as strings
    }
  };

  const command = new PutItemCommand(params);
  await dynamoClient.send(command);

  console.log("Stored new token data in DynamoDB");
}