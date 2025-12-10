'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';

import axios from 'axios';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { BASE_URL } from '@/services/constants';
import Centerblock from '@/components/Centerblock/Centerblock';
import MusicLayout from '@/app/music/MusicLayout';
interface PlaylistType {
  _id: number;
  name: string;
  items: number[];
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState<string>('');

  useEffect(() => {
    // Если глобальные треки не загружены или есть ошибка
    if (fetchIsLoading) return; // ждём загрузку
    if (fetchError || allTracks.length === 0) {
      setIsLoading(false); // стоп локальной загрузки
      return;
    }
    setIsLoading(true);

    //     if (!fetchIsLoading && allTracks.length) {
//       setIsLoading(false);
//       return;
//     }

    const load = async () => {
      try {
        const playlistId = Number(params.id) + 1;
        const playlistsRes = await axios.get<{
          success: boolean;
          data: PlaylistType;
        }>(`${BASE_URL}/catalog/selection/${playlistId}/`);

        const playlist = playlistsRes.data.data;
        if (!playlist) {
          setErrorRes('Подборка не найдена');
          return;
        }

        setPlaylistName(playlist.name);

        const filteredTracks = allTracks.filter((track) =>
          playlist.items.includes(track._id),
        );
        setTracks(filteredTracks);
      } catch (err) {
        console.error(err);
        setErrorRes('Ошибка загрузки подборки');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [params.id, allTracks, fetchIsLoading, fetchError]);
  return (
    <MusicLayout>
      <Centerblock
        errorRes={errorRes || fetchError}
        tracks={tracks}
        isLoading={isLoading}
        itemName={playlistName}
      />
    </MusicLayout>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppSelector } from '@/store/store';

// import axios from 'axios';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import MusicLayout from '@/app/music/MusicLayout';
// interface PlaylistType {
//   _id: number;
//   name: string;
//   items: number[];
// }

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
//     (state) => state.tracks,
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorRes, setErrorRes] = useState<string | null>(null);
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [playlistName, setPlaylistName] = useState<string>('');

//   useEffect(() => {
//     // Если глобальные треки не загружены или есть ошибка
//     if (fetchIsLoading) return; // ждём загрузку
//     if (fetchError || allTracks.length === 0) {
//       setIsLoading(false); // стоп локальной загрузки
//       return;
//     }
//     setIsLoading(true);

//     const load = async () => {
//       try {
//         const playlistId = Number(params.id) + 1;
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType;
//         }>(`${BASE_URL}/catalog/selection/${playlistId}/`);

//         const playlist = playlistsRes.data.data;
//         if (!playlist) {
//           setErrorRes('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );
//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setErrorRes('Ошибка загрузки подборки');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     load();
//   }, [params.id, allTracks, fetchIsLoading, fetchError]);
//   return (
//     <MusicLayout>
//       <Centerblock
//         errorRes={errorRes || fetchError}
//         tracks={tracks}
//         isLoading={isLoading}
//         itemName={playlistName}
//       />
//     </MusicLayout>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppSelector } from '@/store/store';

// import axios from 'axios';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import MusicLayout from '@/app/music/MusicLayout';

// interface PlaylistType {
//   _id: number;
//   name: string;
//   items: number[];
// }

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
//     (state) => state.tracks,
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorRes, setErrorRes] = useState<string | null>(null);
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [playlistName, setPlaylistName] = useState<string>('');
// useEffect(() => {

//   // Если глобальные треки не загрузились, запрос не происходит
//     if (!fetchIsLoading && allTracks.length) {
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);

//     async function load() {
//        try {
//         const playlistId = Number(params.id) + 1;
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType;
//         }>(`${BASE_URL}/catalog/selection/${playlistId}/`);

//         const playlist = playlistsRes.data.data;

//         if (!playlist) {
//           setErrorRes('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);

//         // Если треки не найдены
//         if (filteredTracks.length === 0) {
//           setErrorRes('Треки для этой подборки не найдены');
//         }

//       } catch (err) {
//         console.error(err);
//         setErrorRes('Что-то с интернетом. Ошибка загрузки');
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     load();
//   }, [params.id, allTracks, fetchError, fetchIsLoading]);

//   // useEffect(() => {
//   //   async function load() {
//   //     if (!fetchIsLoading && allTracks.length) {
//   //       // Ждём пока глобальные треки загрузятся
//   //       return;
//   //     }
//   //     setIsLoading(true);
//   //     try {
//   //       const playlistId = Number(params.id) + 1;
//   //       const playlistsRes = await axios.get<{
//   //         success: boolean;
//   //         data: PlaylistType;
//   //       }>(`${BASE_URL}/catalog/selection/${playlistId}/`);
//   //       // console.log('API RESPONSE:', playlistsRes.data);

//   //       // const playlists = playlistsRes.data.data;

//   //       // const playlistId = Number(params.id) + 1;
//   //       // const playlist = playlists.find((p) => p._id === playlistId);

//   //       // const playlistId = Number(params.id) + 1;
//   //       const playlist = playlistsRes.data.data;

//   //       if (!playlist) {
//   //         setErrorRes('Подборка не найдена');
//   //         return;
//   //       }

//   //       setPlaylistName(playlist.name);

//   //       const filteredTracks = allTracks.filter((track) =>
//   //         playlist.items.includes(track._id),
//   //       );

//   //       setTracks(filteredTracks);
//   //     } catch (err) {
//   //       console.error(err);
//   //       setErrorRes('Что-то с интернетом. Ошибка загрузки');
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   }
//   //   load();
//   // }, [params.id, allTracks]);

//   return (
//     <MusicLayout>
//       <Centerblock
//         errorRes={errorRes || fetchError}
//         tracks={tracks}
//         isLoading={isLoading}
//         // isLoading={fetchIsLoading || isLoading}
//         itemName={playlistName}
//       />
//     </MusicLayout>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppSelector } from '@/store/store';

// import axios from 'axios';
// // import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import MusicLayout from '@/app/music/MusicLayout';

// interface PlaylistType {
//   _id: number;
//   name: string;
//   items: number[];
// }

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const { allTracks, fetchIsLoading } = useAppSelector((state) => state.tracks);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorRes, setErrorRes] = useState<string | null>(null);
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [playlistName, setPlaylistName] = useState<string>('');
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState('');

//   useEffect(() => {
//     async function load() {
//       try {
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType[];
//         }>(`${BASE_URL}/catalog/selection/all`);
//         const playlists = playlistsRes.data.data;

//         const playlistId = Number(params.id) + 1;
//         const playlist = playlists.find((p) => p._id === playlistId);

//         if (!playlist) {
//           setErrorRes('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         // const allTracks = await getTracks();

//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setErrorRes('Что-то с интернетом. Ошибка загрузки');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     load();
//   }, [params.id, allTracks]);

//   return (
//     <MusicLayout>
//       <Centerblock
//         // tracks={tracks}
//         // itemName={playlistName}
//         // loading={loading}
//         // error={error}

//         errorRes={errorRes}
//         tracks={tracks}
//         isLoading={fetchIsLoading && isLoading}
//         itemName={playlistName}
//       />
//     </MusicLayout>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import MusicLayout from '@/app/music/MusicLayout';

// interface PlaylistType {
//   _id: number;
//   name: string;
//   items: number[];
// }

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [playlistName, setPlaylistName] = useState<string>('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function load() {
//       try {
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType[];
//         }>(`${BASE_URL}/catalog/selection/all`);
//         const playlists = playlistsRes.data.data;

//         const playlistId = Number(params.id) + 1;
//         const playlist = playlists.find((p) => p._id === playlistId);

//         if (!playlist) {
//           setError('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         const allTracks = await getTracks();

//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setError('Что-то с интернетом. Ошибка загрузки');
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, [params.id]);

//   return (
//     <MusicLayout>
//       <Centerblock
//         tracks={tracks}
//         itemName={playlistName}
//         loading={loading}
//         error={error}
//       />
//     </MusicLayout>
//   );
// }
