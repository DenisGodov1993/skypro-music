import { useMemo, useState } from 'react';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';

type CenterblockProps = {
  tracks: TrackType[];
  itemName?: string;
  loading?: boolean;
  error?: string;
};

export default function Centerblock({
  tracks,
  itemName = 'Трек',
  loading,
  error,
}: CenterblockProps) {
  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

  const [selectedFilter, setSelectedFilter] = useState<{
    type: string;
    value: string;
  } | null>(null);

  const filteredTracks = useMemo(() => {
    if (!selectedFilter) return tracks;

    const { type, value } = selectedFilter;

    switch (type) {
      case 'исполнителю':
        return tracks.filter((t) => t.author === value);

      case 'жанру':
        return tracks.filter(
          (t) => Array.isArray(t.genre) && t.genre.includes(value),
        );

      case 'году выпуска':
        return tracks.filter(
          (t) =>
            typeof t.release_date === 'string' &&
            t.release_date.startsWith(value),
        );

      default:
        return tracks;
    }
  }, [selectedFilter, tracks]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{itemName}</h2>

      <div className={styles.centerblock__filter}>
        <Filter title={filters} tracks={tracks} onSelect={setSelectedFilter} />
      </div>

      <div className={styles.centerblock__content}>
        <FilterItem items={items} />

        {loading ? (
          <div className={styles.loading}>
            Данные загружаются
            <span className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        ) : error ? (
          // <div className={styles.error}>{error}</div>
          <div className={styles.error}>
            {error}
            <span className={styles.errorDots}>
              <span>!</span>
              <span>!</span>
              <span>!</span>
            </span>
          </div>
        ) : (
          <div className={styles.content__playlist}>
            {filteredTracks.map((track) => (
              <Track key={track._id} track={track} playlist={filteredTracks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useMemo, useState } from 'react';
// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type CenterblockProps = {
//   tracks: TrackType[];
//   itemName?: string;
//   loading?: boolean;
// };

// export default function Centerblock({
//   tracks,
//   itemName = 'Трек',
//   loading,
// }: CenterblockProps) {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   const [selectedFilter, setSelectedFilter] = useState<{
//     type: string;
//     value: string;
//   } | null>(null);

//   const filteredTracks = useMemo(() => {
//     if (!selectedFilter) return tracks;

//     const { type, value } = selectedFilter;

//     switch (type) {
//       case 'исполнителю':
//         return tracks.filter((t) => t.author === value);

//       case 'жанру':
//         return tracks.filter(
//           (t) => Array.isArray(t.genre) && t.genre.includes(value),
//         );

//       case 'году выпуска':
//         return tracks.filter(
//           (t) =>
//             typeof t.release_date === 'string' &&
//             t.release_date.startsWith(value),
//         );

//       default:
//         return tracks;
//     }
//   }, [selectedFilter, tracks]);

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>{itemName}</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} tracks={tracks} onSelect={setSelectedFilter} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />

//         {/* {loading ? (
//           <p className={styles.loading}>Данные загружаются...</p>
//         ) : ( */}
//         {loading ? (
//   <div className={styles.loading}>
//     Данные загружаются
//     <span className={styles.dots}>
//       <span></span>
//       <span></span>
//       <span></span>
//     </span>
//   </div>
// ) : (

//           <div className={styles.content__playlist}>
//             {filteredTracks.map((track) => (
//               <Track key={track._id} track={track} playlist={filteredTracks} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useMemo, useState } from 'react';
// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type CenterblockProps = {
//   tracks: TrackType[];
//   itemName?: string;
//   loading?: boolean;
// };

// export default function Centerblock({
//   tracks,
//   itemName = 'Трек',
//   loading,
// }: CenterblockProps) {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   const [selectedFilter, setSelectedFilter] = useState<{
//     type: string;
//     value: string;
//   } | null>(null);

//   const filteredTracks = useMemo(() => {
//     if (!selectedFilter) return tracks;

//     const { type, value } = selectedFilter;

//     switch (type) {
//       case 'исполнителю':
//         return tracks.filter((t) => t.author === value);

//       case 'жанру':
//         // genre у тебя — string[]
//         return tracks.filter(
//           (t) => Array.isArray(t.genre) && t.genre.includes(value),
//         );

//       case 'году выпуска':
//         // release_date например "2020-05-12" — сравниваем по префиксу года
//         return tracks.filter(
//           (t) =>
//             typeof t.release_date === 'string' &&
//             t.release_date.startsWith(value),
//         );

//       default:
//         return tracks;
//     }
//   }, [selectedFilter, tracks]);

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>{itemName}</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} tracks={tracks} onSelect={setSelectedFilter} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />

//         {loading ? (
//           <p className={styles.loading}>Данные загружаются...</p>
//         ) : (
//           <div className={styles.content__playlist}>
//             {/* {tracks.map(track => (
//             <Track key={track.id} track={track} playlist={tracks} /> */}
//             {filteredTracks.map((track) => (
//               <Track key={track._id} track={track} playlist={filteredTracks} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useMemo, useState } from 'react';
// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type CenterblockProps = {
//   tracks: TrackType[];
//   itemName?: string;
// };

// export default function Centerblock({ tracks, itemName = 'Трек' }: CenterblockProps) {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   const [selectedFilter, setSelectedFilter] = useState<{
//     type: string;
//     value: string;
//   } | null>(null);

//   const filteredTracks = useMemo(() => {
//     if (!selectedFilter) return tracks;

//     const { type, value } = selectedFilter;

//     switch (type) {
//       case 'исполнителю':
//         return tracks.filter((t) => t.author === value);

//       case 'жанру':
//         // genre у тебя — string[]
//         return tracks.filter(
//           (t) => Array.isArray(t.genre) && t.genre.includes(value),
//         );

//       case 'году выпуска':
//         // release_date например "2020-05-12" — сравниваем по префиксу года
//         return tracks.filter(
//           (t) =>
//             typeof t.release_date === 'string' &&
//             t.release_date.startsWith(value),
//         );

//       default:
//         return tracks;
//     }
//   }, [selectedFilter, tracks]);

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>{itemName}</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} tracks={tracks} onSelect={setSelectedFilter} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />
//         <div className={styles.content__playlist}>
//           {/* {tracks.map(track => (
//             <Track key={track.id} track={track} playlist={tracks} /> */}
//           {filteredTracks.map((track) => (
//             <Track key={track._id} track={track} playlist={filteredTracks} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// рабочий вариант
// import { useMemo, useState } from 'react';
// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type CenterblockProps = {
//   tracks: TrackType[];
// };

// export default function Centerblock({ tracks }: CenterblockProps) {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   const [selectedFilter, setSelectedFilter] = useState<{
//     type: string;
//     value: string;
//   } | null>(null);

//   const filteredTracks = useMemo(() => {
//     if (!selectedFilter) return tracks;

//     const { type, value } = selectedFilter;

//     switch (type) {
//       case 'исполнителю':
//         return tracks.filter((t) => t.author === value);

//       case 'жанру':
//         // genre у тебя — string[]
//         return tracks.filter((t) => Array.isArray(t.genre) && t.genre.includes(value));

//       case 'году выпуска':
//         // release_date например "2020-05-12" — сравниваем по префиксу года
//         return tracks.filter((t) => typeof t.release_date === 'string' && t.release_date.startsWith(value));

//       default:
//         return tracks;
//     }
//   }, [selectedFilter, tracks]);

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} tracks={tracks}  onSelect={setSelectedFilter} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />
//         <div className={styles.content__playlist}>
//           {/* {tracks.map(track => (
//             <Track key={track.id} track={track} playlist={tracks} /> */}
//           {filteredTracks.map((track) => (
//             <Track key={track._id} track={track} playlist={filteredTracks} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// до реальной фильтрации из апи
// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type CenterblockProps = {
//   tracks: TrackType[];
// };

// export default function Centerblock({ tracks }: CenterblockProps) {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} tracks={tracks} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />
//         <div className={styles.content__playlist}>
//           {/* {tracks.map(track => (
//             <Track key={track.id} track={track} playlist={tracks} /> */}
//           {tracks.map((track) => (
//             <Track key={track._id} track={track} playlist={tracks} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// // import { data } from '@/data';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type CenterblockProps = {
//   tracks: TrackType[];
// };

// export default function Centerblock({ tracks }: CenterblockProps) {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />
//         <div className={styles.content__playlist}>
//           {tracks.map(track) => (
//             <Track key={track.id} track={track} playlist={tracks} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { data } from '@/data';

// export default function Centerblock() {
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];
//   const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} />
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem items={items} />
//         <div className={styles.content__playlist}>
//           {data.map((track) => (
//             <Track key={track._id} track={track} playlist={data} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
