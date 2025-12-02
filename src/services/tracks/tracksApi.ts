// // tracksApi.ts
// import axios from 'axios';
// import { BASE_URL } from '../constants';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// /**
//  * Получает все треки с _id >= 2
//  */
// export const getTracks = async (): Promise<TrackType[]> => {
//   const res = await axios.get<{ data: TrackType[] }>(`${BASE_URL}/catalog/track/all/`);
//   const allTracks = res.data.data;

//   // Фильтруем на стороне клиента, чтобы вернуть только _id >= 2
//   return allTracks.filter(track => track._id >= 2);
// };


import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

// Получить все треки
export const getTracks = (): Promise<TrackType[]> => {
  return axios
    .get<{ success: boolean; data: TrackType[] }>(`${BASE_URL}/catalog/track/all/`)
    .then(res => res.data.data);
};


// import axios from 'axios';
// import { BASE_URL } from '../constants';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// export const getTracks = (): Promise<TrackType[]> => {
//   return axios.get(BASE_URL + '/catalog/track/all/')
//     .then(res => res.data.data); 
// };






// import axios from 'axios';
// import { BASE_URL } from '../constants';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// export const getTracks = (): Promise<TrackType[]> => {
//   return axios(BASE_URL + '/catalog/track/all/').then((res) => {
//     console.log(res);
//     return res.data.data;
//   });
// };

// import axios from 'axios';
// import { BASE_URL } from '../constants';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// export const getTracks = (): Promise<TrackType[]> => {
//     return axios(BASE_URL + '/catalog/track/all/').then((res) => {
//         return res.data.data;
//     });
// };

// export const getSelection = (id: string): Promise<TrackType[]> => {
//   return axios(`${BASE_URL}/catalog/selection/${id}/`)
//     .then((res) => res.data.data);
// };

// import axios from 'axios';
// import { BASE_URL } from '../constants';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// export const getTracks = (): Promise<TrackType[]> => {
//     return axios(BASE_URL + '/catalog/tracks/all/').then((res) => {
//         return res.data.data;
//     });
// };
