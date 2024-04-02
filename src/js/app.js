/* eslint-disable */
/* eslint max-classes-per-file: "off" */

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
/* eslint-disable *//* eslint-disable *//* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2309280646_28_60_28_194_4`, ...oo_oo(`450674457_28_40_28_137_4`, ...oo_oo(`2046519605_28_20_28_80_4`, ...oo_oo(`3862538326_28_0_28_24_4`, accessToken)))));

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
      /* eslint-disable *//* eslint-disable *//* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2309280646_59_66_59_215_4`, ...oo_oo(`450674457_59_46_59_158_4`, ...oo_oo(`2046519605_59_26_59_100_4`, ...oo_oo(`3862538326_59_6_59_44_4`, `processing tracks......`)))));
            processTracks(fetchedData);
        } else {
            console.error(`Failed to fetch the tracks`);
        }
    } catch (error) {
    /* eslint-disable *//* eslint-disable *//* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2309280646_65_64_65_219_4`, ...oo_oo(`450674457_65_44_65_162_4`, ...oo_oo(`2046519605_65_24_65_104_4`, ...oo_oo(`3862538326_65_4_65_48_4`, `Error fetching tracks:`, error)))));
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
  /* eslint-disable *//* eslint-disable *//* eslint-disable *//* eslint-disable */console.log(...oo_oo(`2309280646_99_62_99_195_4`, ...oo_oo(`450674457_99_42_99_138_4`, ...oo_oo(`2046519605_99_22_99_81_4`, ...oo_oo(`3862538326_99_2_99_25_4`, tracksInfo)))));
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