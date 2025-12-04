'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import Centerblock from '@/components/Centerblock/Centerblock';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        // console.log('Загруженные треки:', res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            console.log(error.request);
            setError('Что-то с интернетом');
          } else {
            // console.log('Error', error.message);
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          {error && <div>{error}</div>}
          <Navigation />

          {!error && (
            <Centerblock tracks={tracks} itemName="Треки" loading={loading} />
          )}

          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';

// export default function Home() {
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getTracks()
//       .then((res) => {
//         setTracks(res);
//         // console.log('Загруженные треки:', res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//           } else if (error.request) {
//             console.log(error.request);
//             setError('Что-то с интернетом');
//           } else {
//             // console.log('Error', error.message);
//             setError('Неизвестная ошибка');
//           }
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {error && <div>{error}</div>}
//           <Navigation />
//           {/* {loading && (
//             <h1 className={styles.loading}>Данные загружаются . . .</h1>
//           )}
//            {error && !loading && (
//             <h1 style={{ color: 'red', padding: '20px' }}>{error}</h1>
//           )}
//           {/* Контент показывается только когда загрузка закончилась */}
//           {/* {!loading && !error && <Centerblock tracks={tracks} />}  */}

//           {/* <Centerblock tracks={tracks} /> */}
//           {!error && (
//             <Centerblock tracks={tracks} itemName="Треки" loading={loading} />
//           )}

//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';

// export default function Home() {
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     getTracks()
//       .then((res) => {
//         setTracks(res);
//         console.log('Загруженные треки:', res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//           } else if (error.request) {
//             console.log(error.request);
//             setError('Что-то с интернетом');
//           } else {
//             console.log('Error', error.message);
//             setError('Неизвестная ошибка');
//           }
//         }
//       });
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {error && <div>{error}</div>}
//           <Navigation />
//           <Centerblock tracks={tracks} />
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// грязный код
// 'use client';

// import styles from './page.module.css';
// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';

// export default function Home() {
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     getTracks()
//       .then((res) => {
//         setTracks(res);
//         console.log('Загруженные треки:', res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//           } else if (error.request) {
//             //запрос был сделан, но ответ не получен
//             console.log(error.request);
//             setError('Что-то с интернетом');
//           } else {
//             //Произошло что-то при настройке запросов, вызвавшее ошибку
//             console.log('Error', error.message);
//             setError('Неизвестная ошибка');
//           }
//         }
//       });
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {error && <div>{error}</div>}
//           <Navigation />
//           <Centerblock tracks={tracks} />
//           {/* <Centerblock tracks={tracks} itemName={playlistName} /> */}
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

//рабочий вариант
// 'use client';

// import styles from './page.module.css';
// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// export default function Home() {
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     getTracks()
//       .then((res) => {
//         setTracks(res);
//          console.log('Загруженные треки:', res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//           } else if (error.request) {
//             //запрос был сделан, но ответ не получен
//             console.log(error.request);
//             setError('Что-то с интернетом');
//           } else {
//             //Произошло что-то при настройке запросов, вызвавшее ошибку
//             console.log('Error', error.message);
//             setError('Неизвестная ошибка');
//           }
//         }
//       });
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {error && <div>{error}</div>}
//           <Navigation />
//           <Centerblock tracks={tracks} />
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// рабочий код с комментариями
// 'use client';

// import styles from './page.module.css';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// export default function Home() {
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [error, setError] = useState('');

//   // useEffect(() => {
//   //   getTracks().then((res) => {
//   //     res[0].
//   //   });
//   // }, []);

//   useEffect(() => {
//     getTracks()
//       // .then((res) => {
//       //   // создаём поле id из _id, чтобы Centerblock и Track корректно работали
//       //   const tracksWithId = res.map((track) => ({
//       //     ...track,
//       //     id: track._id,
//       //   }));
//       //   setTracks(tracksWithId);
//       //   console.log('Загруженные треки:', tracksWithId);
//       // })
//       .then((res) => {
//         setTracks(res);
//          console.log('Загруженные треки:', res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//           } else if (error.request) {
//             //запрос был сделан, но ответ не получен
//             // `error.request` - это экзкмпляр XMLHttpRequest в браузере и экземпляр
//             // http.ClientRequest в node.js
//             console.log(error.request);
//             setError('Что-то с интернетом');
//           } else {
//             //Произошло что-то при настройке запросов, вызвавшее ошибку
//             console.log('Error', error.message);
//             setError('Неизвестная ошибка');
//           }
//         }
//       });
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {/* {error} */}
//           {error && <div>{error}</div>}
//           <Navigation />
//           <Centerblock tracks={tracks} />
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './page.module.css';

// import Navigation from '@/components/Navigation/Navigation';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import { useEffect } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';

// export default function Home() {
//   useEffect(() => {
//     getTracks().then((res) => {
//       res[0].
//     });
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <Navigation />
//           <Centerblock />
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './page.module.css';
// import Navigation from '../../../components/Navigation/Navigation';
// import Centerblock from '../../../components/Centerblock/Centerblock';
// import Sidebar from '../../../components/Sidebar/Sidebar';
// import Bar from '../../../components/Bar/Bar';

// import { useEffect, useState } from 'react';
// import { getTracks } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// export default function Home() {
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     getTracks()
//       .then((res) => {
//         setTracks(res);
//         alert('res');
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//           } else if (error.request) {
//             //запрос был сделан, но ответ не получен
//             // `error.request` - это экзкмпляр XMLHttpRequest в браузере и экземпляр
//             // http.ClientRequest в node.js
//             console.log(error.request);
//             setError('Что-то с интернетом');
//           } else {
//             //Произошло что-то при настройке запросов, вызвавшее ошибку
//             console.log('Error', error.message);
//             setError('Неизвестная ошибка');
//           }
//         }
//       });
//   }, []);
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           {error}
//           <Navigation />
//           <Centerblock />
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }

// import styles from './page.module.css';
// import Navigation from '../../../components/Navigation/Navigation';
// import Centerblock from '../../../components/Centerblock/Centerblock';
// import Sidebar from '../../../components/Sidebar/Sidebar';
// import Bar from '../../../components/Bar/Bar';

// export default function Home() {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <Navigation />
//           <Centerblock />
//           <Sidebar />
//         </main>
//         <Bar />
//         <footer className="footer"></footer>
//       </div>
//     </div>
//   );
// }
