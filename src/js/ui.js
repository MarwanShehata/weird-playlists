/* eslint-disable */
/* eslint max-classes-per-file: "off" */
/* eslint-disable-next-line */
import { handleData } from './api';

const init = async () => {
  const data = await handleData();
  const { tracksInfo, playlistInfo } = data;
  console.log(tracksInfo);
  console.log(playlistInfo);

  // 1- Create the card HTMLElement's with their corresponding
  //  classes and id's inside a function that takes the songs array as a parameter
  // 2- populate the songs list inside the #track-list element
  // 3-

  // ```html
  // <!-- a single song card 👇 -->
  // <li>
  //   <div class="song-card active" data-index="0">
  //     <div class="song-thumb"></div>
  //     <div class="body">
  //       <h3 class="title"><a class="song-link" href="" rel="noopener noreferrer">Click Pow Get Down</a></h3>
  //       <p class="author"><a href="" class="author-link" rel="noopener noreferrer">Raftaar x Fortnite</a></p>
  //     </div>
  //     <div class="option">
  //       <i class="fas fa-ellipsis-h"></i>
  //     </div>
  //   </div>
  // </li>
  // <!-- a single song card 👆 -->
  // ```
  // 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇

  function createSongCard(song) {
    const li = document.createElement('li');
    const songCardDiv = document.createElement('div');
    songCardDiv.className = 'song-card active';
    songCardDiv.setAttribute('data-index', song.trackNumber - 1);

    const songThumbDiv = document.createElement('div');
    songThumbDiv.className = 'song-thumb';
    const songThumbnail = document.createElement('img');
    songThumbnail.src = song.previewThumbnailLink;
    songThumbnail.alt = `Thumbnail for ${song.trackName}`;
    songThumbDiv.appendChild(songThumbnail);

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'body';

    const title = document.createElement('h3');
    title.className = 'title';
    const songLink = document.createElement('a');
    songLink.className = 'song-link';
    songLink.href = song.trackSpotifyLink;
    songLink.textContent = song.trackName;
    songLink.rel = 'noopener noreferrer';
    title.appendChild(songLink);
    bodyDiv.appendChild(title);

    const author = document.createElement('p');
    author.className = 'author';
    const authorLink = document.createElement('a');
    authorLink.className = 'author-link';
    authorLink.href = song.artistUrl;
    authorLink.textContent = song.artistName;
    authorLink.rel = 'noopener noreferrer';
    author.appendChild(authorLink);
    bodyDiv.appendChild(author);

    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.className = 'fas fa-ellipsis-h';
    optionDiv.appendChild(ellipsisIcon);

    songCardDiv.appendChild(songThumbDiv);
    songCardDiv.appendChild(bodyDiv);
    songCardDiv.appendChild(optionDiv);
    li.appendChild(songCardDiv);

    return li;
  }

  // ```html
  // <div class="playlist-details">
  //   <div class="playlist-thumbnail_wrapper">
  //     <img
  //       src="./assets/img/106-100x100.jpg"
  //       alt="Playlist Preview"
  //       id="playlist-thumbnail"
  //     />
  //   </div>
  //   <div class="playlist-details_namedescription">
  //     <span class="playlist-type" >Playlist</span>
  //     <h3 class="playlist-title"><a href="" class="playlist-link" rel="noopener noreferrer">Playlist Title</a></h3>
  //     <p class="playlist-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, tempo</p>
  //   </div>
  // </div>
  // ```
  // playlist details card 👇👇👇👇👇👇👇👇👇👇👇👇👇👇

  function createPlaylistCard(playlist) {
    const playlistCard = document.createElement('div');
    playlistCard.className = 'playlist-details';

    const thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.className = 'playlist-thumbnail_wrapper';
    const thumbnail = document.createElement('img');
    thumbnail.src = playlist.previewThumbnailLink;
    thumbnail.alt = `Thumbnail for ${playlist.playlistID}`;
    thumbnail.id = 'playlist-thumbnail';
    thumbnailWrapper.appendChild(thumbnail);
    playlistCard.appendChild(thumbnailWrapper);

    const detailsWrapper = document.createElement('div');
    detailsWrapper.className = 'playlist-details_namedescription';
    const playlistType = document.createElement('span');
    playlistType.className = 'playlist-type';
    playlistType.textContent = 'Playlist';
    detailsWrapper.appendChild(playlistType);

    const playlistTitle = document.createElement('h3');
    playlistTitle.className = 'playlist-title';
    const playlistLink = document.createElement('a');
    playlistLink.href = playlist.playlistSpotifyLink;
    playlistLink.className = 'playlist-link';
    playlistLink.rel = 'noopener noreferrer';
    playlistLink.textContent = playlist.playlistName;
    playlistTitle.appendChild(playlistLink);
    detailsWrapper.appendChild(playlistTitle);

    const playlistDescription = document.createElement('p');
    playlistDescription.className = 'playlist-description';
    playlistDescription.textContent = playlist.playlistDescription;
    detailsWrapper.appendChild(playlistDescription);

    playlistCard.appendChild(detailsWrapper);

    return playlistCard;
  }

  // const tracksInfo =
  // [
  //   {
  //       "playlistID": "0ZXVX604hmghJgqWCMsqcU",
  //       "tracks": [
  //           {
  //               "trackSpotifyLink": "https://open.spotify.com/track/0bjrZv6I3T0nMRfBhsC16Y",
  //               "previewThumbnailLink": "https://i.scdn.co/image/ab67616d0000b27363aa7ad66a20dd69eb287a48",
  //               "previewUrl": "https://p.scdn.co/mp3-preview/b2392b184e3969738fe8fadc1b3fa7e09a13e134?cid=ed65a662e90742a582aacac11d9d6fd2",
  //               "trackName": "Make You Happy",
  //               "trackId": "0bjrZv6I3T0nMRfBhsC16Y",
  //               "trackNumber": 1,
  //               "artistName": "Betablock3r",
  //               "artistUrl": "https://open.spotify.com/artist/1s5qarNhu9YkU9fFVSFcnk",
  //               "artistId": "1s5qarNhu9YkU9fFVSFcnk"
  //           },
  //           {
  //               "trackSpotifyLink": "https://open.spotify.com/track/7gRVrDCQcoEnHrPxdblf6I",
  //               "previewThumbnailLink": "https://i.scdn.co/image/ab67616d0000b2738059a4ea6a9ba10a02b2f71e",
  //               "previewUrl": null,
  //               "trackName": "Life Is Good",
  //               "trackId": "7gRVrDCQcoEnHrPxdblf6I",
  //               "trackNumber": 4,
  //               "artistName": "Dynamicduo",
  //               "artistUrl": "https://open.spotify.com/artist/4nvFFLtv7ZqoTr83387uK4",
  //               "artistId": "4nvFFLtv7ZqoTr83387uK4"
  //           },
  //           {
  //             ...some more songs
  //           }
  //       ]
  //   },
  //   {
  //       "playlistID": "6XVNcaZKzxdErXvCj9JCEe",
  //       "tracks": [
  //           {
  //               "trackSpotifyLink": "https://open.spotify.com/track/7nMlbqphtRihR99FYtaPc9",
  //               "previewThumbnailLink": "https://i.scdn.co/image/ab67616d0000b273f5ed099669f7244e18d90fa1",
  //               "previewUrl": "https://p.scdn.co/mp3-preview/60aac34f6cde21bfb51bbe818900a5f3f675c925?cid=ed65a662e90742a582aacac11d9d6fd2",
  //               "trackName": "Paraphernalia",
  //               "trackId": "7nMlbqphtRihR99FYtaPc9",
  //               "trackNumber": 1,
  //               "artistName": "Temples",
  //               "artistUrl": "https://open.spotify.com/artist/4ogwGU9VPWrnVBs1GEwZVV",
  //               "artistId": "4ogwGU9VPWrnVBs1GEwZVV"
  //           },
  //           {
  //               "trackSpotifyLink": "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ",
  //               "previewThumbnailLink": "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79",
  //               "previewUrl": null,
  //               "trackName": "The Less I Know The Better",
  //               "trackId": "6K4t31amVTZDgR3sKmwUJJ",
  //               "trackNumber": 7,
  //               "artistName": "Tame Impala",
  //               "artistUrl": "https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb",
  //               "artistId": "5INjqkS1o8h1imAzPqGZBb"
  //           },
  //           {
  //             ...more songs
  //           }
  //       ]
  //   }
  // ]

  function populateSongList() {
    const trackList = document.querySelector('#track-list');
    trackList.innerHTML = '';

    tracksInfo[0].tracks.forEach((song) => {
      const songCard = createSongCard(song);
      trackList.appendChild(songCard);
    });
  }
  populateSongList();

  // const playlistInfo =
  // [
  //   {
  //       "playlistID": "0ZXVX604hmghJgqWCMsqcU",
  //       "playlistData": [
  //           {
  //               "playlistSpotifyLink": "https://open.spotify.com/playlist/0ZXVX604hmghJgqWCMsqcU",
  //               "previewThumbnailLink": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb3e92c22d045bbe6f5e381815",
  //               "playlistID": "0ZXVX604hmghJgqWCMsqcU",
  //               "playlistDescription": "Songs used in MKBHD videos. Starting in 2019.",
  //               "ownerName": "Marques Brownlee",
  //               "ownerURL": "https://open.spotify.com/user/mkbhd"
  //           }
  //       ]
  //   },
  //   {
  //       "playlistID": "6XVNcaZKzxdErXvCj9JCEe",
  //       "playlistData": [
  //           {
  //               "playlistSpotifyLink": "https://open.spotify.com/playlist/6XVNcaZKzxdErXvCj9JCEe",
  //               "previewThumbnailLink": "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000bebb6ee2f37cb0a15a9d998c1d54",
  //               "playlistID": "6XVNcaZKzxdErXvCj9JCEe",
  //               "playlistDescription": "Dreamy Music for Your Trip",
  //               "ownerName": "Marwan Shehata",
  //               "ownerURL": "https://open.spotify.com/user/thelostelite"
  //           }
  //       ]
  //   }
  // ]

  function populatePlaylistDetails() {
    const trackList = document.querySelector('#track-list');

    const playlistCard = createPlaylistCard(playlistInfo[0].playlistData[0]);
    trackList.insertAdjacentElement('afterend', playlistCard);
  }
  populatePlaylistDetails();

  if (playlistInfo.length > 0) {
    const firstPlaylist = playlistInfo[0];
    const indicator = document.querySelector('#indicator-1'); // Modified: Use the first indicator
    if (indicator) {
      indicator.style.backgroundImage = `url(${firstPlaylist.playlistData[0].previewThumbnailLink})`; // Modified: Use the first playlist's previewThumbnailLink
    }
  }
};
init();
