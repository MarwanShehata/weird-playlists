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

  function populateSongList(playlistIndex) {
    const trackList = document.querySelector(
      `[data-playlist-index="${playlistIndex}"]`,
    );
    trackList.innerHTML = '';

    tracksInfo[playlistIndex].tracks.forEach((song) => {
      const songCard = createSongCard(song);
      trackList.appendChild(songCard);
    });
  }
  // populateSongList();

  function populatePlaylistDetails(playlistIndex) {
    const trackList = document.querySelector(
      `[data-playlist-index="${playlistIndex}"]`,
    );

    const playlistCard = createPlaylistCard(
      playlistInfo[playlistIndex].playlistData[0],
    );
    trackList.insertAdjacentElement('afterend', playlistCard);
  }
  // populatePlaylistDetails();
  
  // Added: Loop through playlists and populate tracks and playlist details for each carousel item
  for (let i = 0; i < tracksInfo.length; i++) {
    populateSongList(i); // Modified: Pass the playlist index
    populatePlaylistDetails(i); // Modified: Pass the playlist index
  }
  for (let i = 0; i < playlistInfo.length; i++) {
    const indicator = document.querySelector(`#indicator-${i + 1}`);
    if (indicator) {
      indicator.style.backgroundImage = `url(${playlistInfo[i].playlistData[0].previewThumbnailLink})`;
    }
  }
};
init();
