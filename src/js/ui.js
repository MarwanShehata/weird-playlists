/* eslint-disable */
/* eslint max-classes-per-file: "off" */
/* eslint-disable-next-line */
import { handleData } from './api';

const init = async () => {
    const data = await handleData();
    const { tracksInfo, playlistInfo } = data;
    console.log(tracksInfo);
    console.log(playlistInfo);

};
init();
