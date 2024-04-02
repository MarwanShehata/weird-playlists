/* eslint-disable */
/* eslint max-classes-per-file: "off" */
/* eslint-disable-next-line */

// Fetch tracks from Spotify API
/* Basic Auth */
const clientId = import.meta.env.VITE_CLIENTID;
const clientSecret = import.meta.env.VITE_CLIENTSECRET;
const playlistId = '6XVNcaZKzxdErXvCj9JCEe';

const basicAuth = async () => {

}
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
const accessToken = data.access_token;

const fetchTracks = async (playlistId, accessToken) => {
    try {
        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            fetchOptions,
        );

        if (!response.ok) {
            throw new Error('Failed to fetch tracks');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


/* Handling Data */
const handleData = async () => {
    try {
        const fetchedData = await fetchTracks(playlistId, accessToken);
        if (fetchedData) {
            processTracks(fetchedData);
        } else {
            console.error(`Failed to fetch the tracks`);
        }
    } catch (error) {
    }
};

/* Tidying up the response */
const processTracks = (data) => {
    let tracksInfo = [];

    data.items.forEach((item) => {
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

        tracksInfo.push({
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
const tracksInfo = handleData()


////////////////////////////////////////////////////////////////////
// Render tracks to HTML
// const renderTracks = (tracks, elementId) => {
//   const trackList = document.getElementById(elementId);

//   if (!trackList) {
//     console.error(`No element with ID ${elementId} found`);
//     return;
//   }

//   tracks.items.forEach(({ track }) => {
//     const listItem = document.createElement('li');
//     listItem.textContent = track.name;
//     trackList.appendChild(listItem);
//   });
// };

// // Main function
// const main = async () => {
//   const playlistId = '0ZXVX604hmghJgqWCMsqcU';
//   const accessToken = '85e2ffd5076a48949631f2fd57bb9676';

//   const tracks = await fetchTracks(playlistId, accessToken);

//   if (tracks) {
//     renderTracks(tracks, 'track-list');
//   } else {
//     console.error('Failed to fetch or render tracks');
//   }
// };

// main();