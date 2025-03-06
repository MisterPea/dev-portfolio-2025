import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import axios from 'axios';

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
const DYNAMO_TABLE = "SpotifyNowPlaying";
const currentlyPlayingEndpoint = "https://api.spotify.com/v1/me/player/currently-playing?market=US";
const playHistoryEndpoint = `https://api.spotify.com/v1/me/player/recently-played`;

// Check for stored song
export async function getStoredSong() {
  const params = {
    TableName: DYNAMO_TABLE,
    Key: { id: { S: "now-playing" } }
  };

  const command = new GetItemCommand(params);
  const result = await dynamoClient.send(command);

  return {
    artist: result.Item.artist?.S || null,
    album: result.Item.album?.S || null,
    url: result.Item.url?.S || null,
    track_name: result.Item.track_name?.S || null,
    is_listening: result.Item.is_listening?.BOOL || false,
    timestamp: result.Item.timestamp?.N ? parseInt(result.Item.timestamp.N) : 0,
  };
}

// If we are here, stored song is stale - fetch and update
export async function fetchCurrentlyPlaying(authToken) {
  // console.log("Attempting to fetch currently playing song");
  try {
    const currentPlayResponse = await axios.get(currentlyPlayingEndpoint, {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    });

    if (typeof currentPlayResponse.data ==='object') {
      const { name, album, external_urls } = currentPlayResponse.data.item
      const params = {
        TableName: DYNAMO_TABLE,
        Item: {
          id: { S: "now-playing" },
          artist: { S: album.artists[0].name },
          track_name: { S: name },
          is_listening: { BOOL: true },
          album: { S: album.name },
          url: { S: external_urls.spotify },
          timestamp: { N: Date.now().toString() },
        }
      };

      const command = new PutItemCommand(params);
      const result = await dynamoClient.send(command);
      return { track: name, artist: album.artists[0].name, album: album.name, url: external_urls.spotify }
    } else {
      // console.log("No song currently playing, fetching last song");
      const pastPlayResponse = await axios.get(playHistoryEndpoint, {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });

      const { track } = pastPlayResponse.data.items[0]
      const params = {
        TableName: DYNAMO_TABLE,
        Item: {
          id: { S: "now-playing" },
          artist: { S: track.album.artists[0].name },
          track_name: { S: track.name },
          is_listening: { BOOL: false },
          album: { S: track.album.name },
          url: { S: track.album.external_urls.spotify },
          timestamp: { N: Date.now().toString() },
        }
      };

      const command = new PutItemCommand(params);
      const result = await dynamoClient.send(command);
      return {
        track: track.name, artist: track.album.artists[0].name, album: track.album.name, url: track.album.external_urls.spotify
      }
    }

  } catch (error) {
    console.error("Could not fetch current song:", error);
    return null;
  }
}