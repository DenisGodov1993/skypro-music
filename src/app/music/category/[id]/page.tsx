'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/services/constants';

import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import Centerblock from '@/components/Centerblock/Centerblock';

interface PlaylistType {
  _id: number;
  name: string;
  items: number[];
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        // 1. Получаем все подборки
        const playlistsRes = await axios.get<{
          success: boolean;
          data: PlaylistType[];
        }>(`${BASE_URL}/catalog/selection/all`);
        const playlists = playlistsRes.data.data;

        // 2. Находим нужную подборку
        const playlistId = Number(params.id) + 1;
        const playlist = playlists.find((p) => p._id === playlistId);

        if (!playlist) {
          setError('Подборка не найдена');
          return;
        }

        setPlaylistName(playlist.name);

        // 3. Получаем все треки
        const allTracks = await getTracks();

        // 4. Фильтруем треки по ID из items
        const filteredTracks = allTracks.filter((track) =>
          playlist.items.includes(track._id),
        );

        setTracks(filteredTracks);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowLoader(false), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  if (loading) return <h1>Загрузка...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />       
          <Centerblock tracks={tracks} itemName={playlistName} />
          <Sidebar />
        </main>
        <Bar />
      </div>
    </div>
  );
}

// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import { BASE_URL } from '@/services/constants';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';

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
//         // 1. Получаем все подборки
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType[];
//         }>(`${BASE_URL}/catalog/selection/all`);
//         const playlists = playlistsRes.data.data;

//         // 2. Находим нужную подборку
//         const playlistId = Number(params.id) + 1;
//         const playlist = playlists.find((p) => p._id === playlistId);

//         if (!playlist) {
//           setError('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         // 3. Получаем все треки
//         const allTracks = await getTracks();

//         // 4. Фильтруем треки по ID из items
//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setError('Ошибка загрузки');
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, [params.id]);

//   if (loading) return <h1>Загрузка...</h1>;
//   if (error) return <h1>{error}</h1>;

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <Navigation />
//           <Centerblock tracks={tracks} itemName={playlistName} />
//           <Sidebar />
//         </main>
//         <Bar />
//       </div>
//     </div>
//   );
// }

// грязный код
// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';

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
//         // 1. Получаем все подборки
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType[];
//         }>(`${BASE_URL}/catalog/selection/all`);
//         const playlists = playlistsRes.data.data;

//         // 2. Находим нужную подборку
//         const playlistId = Number(params.id) + 1; // смещаем на 1
//         const playlist = playlists.find((p) => p._id === playlistId);

//         // const playlist = playlists.find((p) => String(p._id) === params.id);
//         if (!playlist) {
//           setError('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         // 3. Получаем все треки
//         const allTracks = await getTracks();

//         // 4. Фильтруем треки по ID из items
//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setError('Ошибка загрузки');
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, [params.id]);

//   if (loading) return <h1>Загрузка...</h1>;
//   if (error) return <h1>{error}</h1>;

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <Navigation />
//         <main className={styles.main}>
//           <Sidebar />
//           <div style={{ flex: 1 }}>
//             <h1 style={{ margin: '20px 0', textAlign: 'center' }}>
//               {playlistName}
//             </h1>
//             {/* <Centerblock tracks={tracks} /> */}
//              <Centerblock tracks={tracks} itemName={playlistName} />
//           </div>
//         </main>
//         <Bar />
//       </div>
//     </div>
//   );
// }

// рабочий вариант
// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';

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
//         // 1. Получаем все подборки
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType[];
//         }>(`${BASE_URL}/catalog/selection/all`);
//         const playlists = playlistsRes.data.data;

//         // 2. Находим нужную подборку
//         const playlistId = Number(params.id) + 1; // смещаем на 1
//         const playlist = playlists.find((p) => p._id === playlistId);

//         // const playlist = playlists.find((p) => String(p._id) === params.id);
//         if (!playlist) {
//           setError('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         // 3. Получаем все треки
//         const allTracks = await getTracks();

//         // 4. Фильтруем треки по ID из items
//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setError('Ошибка загрузки');
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, [params.id]);

//   if (loading) return <h1>Загрузка...</h1>;
//   if (error) return <h1>{error}</h1>;

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <Navigation />
//         <main className={styles.main}>
//           <Sidebar />
//           <div style={{ flex: 1 }}>
//             <h1 style={{ margin: '20px 0', textAlign: 'center' }}>
//               {playlistName}
//             </h1>
//             <Centerblock tracks={tracks} />
//           </div>
//         </main>
//         <Bar />
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getTracks } from '@/services/tracks/tracksApi';
// import axios from 'axios';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';

// interface PlaylistType {
//   _id: number;
//   name: string;
//   items: number[]; // ID треков
// }

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [playlistName, setPlaylistName] = useState<string>(''); // новое состояние для названия
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function load() {
//       try {
//         // 1. Получаем все подборки
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType[];
//         }>(`${BASE_URL}/catalog/selection/all`);
//         const playlists = playlistsRes.data.data;

//         // 2. Находим нужную подборку
//         const playlist = playlists.find((p) => String(p._id) === params.id);
//         if (!playlist) {
//           setError('Подборка не найдена');
//           return;
//         }

//         // 3. Получаем все треки
//         const allTracks = await getTracks();

//         // 4. Фильтруем треки по ID из items
//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );

//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setError('Ошибка загрузки');
//       } finally {
//         setLoading(false);
//       }
//     }

//     load();
//   }, [params.id]);

//   if (loading) return <h1>Загрузка...</h1>;
//   if (error) return <h1>{error}</h1>;

//   return (
//     <>
//       <h1 style={{ margin: '20px 0', textAlign: 'center' }}>{playlistName}</h1>
//       <Centerblock tracks={tracks} />
//     </>
//   );
// }

// 'use client';

// import { useParams } from 'next/navigation';

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   return <h1>Категория {params.id}</h1>;
// }
//  создать лаяулт для категорий, вместо треки, должны быть названия плейлистов
