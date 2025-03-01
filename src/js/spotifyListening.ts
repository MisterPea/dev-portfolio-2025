type songInfoType = {
  track_name: string,
  artist: string,
  album: string,
  url: string,
  is_listening: boolean,
};

export default async function spotifyListening() {
  if (window.location.pathname === '/') {
    try {
      const response = await fetch('https://p7ia9yj603.execute-api.us-east-1.amazonaws.com/default/spotifyAuth');
      const data = await response.json();

      if (data.error) {
        console.log('Error fetching Spotify info:', data.error);
        return;
      }

      writeSongInfo(data);

    } catch (error) {
      return;
    }
  }
}

function writeSongInfo(data: songInfoType) {
  const { track_name, album, artist, url, is_listening } = data;

  const appendTo = document.querySelector('.spotify-data');

  if (!appendTo) {
    return;
  }

  appendTo.innerHTML = `
    <span> If you're curious about my aural explorations, 
    ${is_listening ? "I'm currently listening to" : "I was just listening to"}:</span>
    <span class="about-spotify_inline"><a href=${url} title="View ${track_name} on Spotify" rel="noreferrer" target="_blank">${track_name}</a></span> by 
    <span class="about-spotify_inline"><a href=${url} title="View ${track_name} on Spotify" rel="noreferrer" target="_blank">${artist}</a></span> from the album 
    <span class="about-spotify_inline"><a href=${url} title="View ${track_name} on Spotify" rel="noreferrer" target="_blank">${album}</a>.</span>
    `;
}