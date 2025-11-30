'use client';

import styles from './page.module.css';
import Navigation from '../../../components/Navigation/Navigation';
import Centerblock from '../../../components/Centerblock/Centerblock';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Bar from '../../../components/Bar/Bar';

import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
 
export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        alert('res');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            //запрос был сделан, но ответ не получен
            // `error.request` - это экзкмпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
            setError('Что-то с интернетом');
          } else {
            //Произошло что-то при настройке запросов, вызвавшее ошибку
            console.log('Error', error.message);
            setError('Неизвестная ошибка');
          }
        }
      });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          {error}
          <Navigation />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

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
