/* eslint-disable */
/* eslint max-classes-per-file: "off" */
/* eslint-disable-next-line */

// Fetch tracks from Spotify API
/* Basic Auth */
const clientId = import.meta.env.VITE_CLIENTID;
const clientSecret = import.meta.env.VITE_CLIENTSECRET;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomizeStrings(strings) {
  const shuffledStrings = shuffleArray([...strings]); // Create a copy to avoid mutating the original array
  return shuffledStrings.slice(0, 3); // Return the first three elements
}

const playlistIDs = randomizeStrings([
  '1nswO3VrI4lpbViAIJWki9',
  '2Djd5E3rzmD4ucdleg3Kt0',
  '6O8wFpsgfGV6yBBur1tbOz',
  '0XcqppLE0vOScqRJY5ElJw',
  '5Zq5qGBlazIpN5OdDuIjCo',
  '7HhPmyyrYSoeXv1FNLXW6k',
  '0YXSaCQf45KtpAtMIkH3us',
  '5uFzeiPsDiltRtVOmwaBWu',
  '5uFzeiPsDiltRtVOmwaBWu',
  '23YuPS9GCH0Naekwy5p8y3',
  '0K73PVRpoDWaR96h7sE6Mh',
  '780BO4foiyFyU7ryViNSd6',
  '3NCv0NSKE7zavNbAs8fjxD',
  '3MZi3XjNsgL5VSvCgIgcmN',
  '60dxZ2uTqxYEGDrpOxrjsW',
  '5iNq6K8ZEpqYWu6tPzjBns',
  '3SeGBx830MuaXXtTukaT9s',
  '73NZd0wQ8fg820YetwSOYF',
]);
const fields =
  'external_urls.spotify,images.url,id,description,owner.display_name,owner.external_urls.spotify,tracks.items(track(external_urls.spotify,album.images.url,preview_url,name,id,track_number),track.artists(name,external_urls.spotify,id)),name';
/* BY USING FIELDS I REDUCED THE DATA CONSUMPTION FROM 301KB TO 70KB (TESTED WITH Postman) */

let accessToken;

const basicAuth = async () => {
  const authOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  };

  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    authOptions,
  );
  const data = await response.json();
  accessToken = data.access_token;
};
const playlistCache = new Map();
const fetchTracks = async (playlistId, accessToken) => {
  if (playlistCache.has(playlistId)) {
    return playlistCache.get(playlistId);
  }
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?fields=${encodeURIComponent(fields)}`,
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }
    const data = await response.json();
    playlistCache.set(playlistId, data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* Handling Data */
export const handleData = async () => {
  try {
    await basicAuth();
    let tracksInfo = []; // Added
    let playlistInfo = []; // Added

    for (const playlistId of playlistIDs) {
      const fetchedData = await fetchTracks(playlistId, accessToken); // Not efficient if there're duplicates
      console.log(fetchedData);
      if (fetchedData) {
        const playlistInfoItem = processPlaylistInfo(fetchedData);
        const tracksInfoItem = processTracksInfo(fetchedData);
        playlistInfo.push(playlistInfoItem);
        tracksInfo.push(tracksInfoItem);
        // console.log(playlistInfo);
        // console.log(tracksInfo);
        // return { playlistInfo, tracksInfo }; // Wrong, this will return only the 1st one
      } else {
        console.error(
          `Failed to fetch the tracks for playlist ID: ${playlistId}`,
        );
        return null;
      }
    }
    // console.log(tracksInfo);
    // console.log(playlistInfo);
    return { playlistInfo, tracksInfo };
  } catch (error) {
    console.error(error);
    return null;
  }
};

/* Tidying up the response */
const processTracksInfo = (data) => {
  let tracksInfo = {
    playlistID: data.id,
    tracks: [],
  };

  data.tracks.items.forEach((item) => {
    /* <Misc> */
    const trackSpotifyLink = item.track.external_urls.spotify;
    const previewThumbnailLink = item.track.album.images[0].url;
    const previewUrl = item.track.preview_url;
    /* Tracks */
    const trackName = item.track.name;
    const trackId = item.track.id;
    const trackNumber = item.track.track_number;
    /* Artists */
    const artistName = item.track.artists[0].name;
    const artistUrl = item.track.artists[0].external_urls.spotify;
    const artistId = item.track.artists[0].id;

    tracksInfo.tracks.push({
      trackSpotifyLink,
      previewThumbnailLink,
      previewUrl,
      trackName,
      trackId,
      trackNumber,
      artistName,
      artistUrl,
      artistId,
    });
  });
  return tracksInfo;
};

const processPlaylistInfo = (data) => {
  let playlistInfoObject = {
    playlistID: data.id,
    playlistData: [],
  };

  /* <Misc> */
  const playlistSpotifyLink = data.external_urls.spotify;
  const previewThumbnailLink = data.images[0].url;
  const playlistID = data.id;
  const playlistDescription = data.description;
  const playlistName = data.name;
  /* Owner */
  const ownerName = data.owner.display_name;
  const ownerURL = data.owner.external_urls.spotify;

  playlistInfoObject.playlistData.push({
    playlistName,
    playlistSpotifyLink,
    previewThumbnailLink,
    playlistID,
    playlistDescription,
    ownerName,
    ownerURL,
  });
  return playlistInfoObject;
};
