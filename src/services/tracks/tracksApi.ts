import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios.get(BASE_URL + '/catalog/track/all/')
    .then(res => res.data.data); 
};


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
