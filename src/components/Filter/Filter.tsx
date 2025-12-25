'use client';

import styles from './filter.module.css';
import classNames from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setSort,
  SortType,
} from '@/store/features/trackSlice';
import { useState } from 'react';

type FilterProps = {
  title: string[];
  tracks: TrackType[];
};

export default function Filter({ title, tracks }: FilterProps) {
  const dispatch = useAppDispatch();
  const { authors, genres, sort } = useAppSelector(
    (state) => state.tracks.filters,
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);


  const authorsList = Array.from(new Set(tracks.map((t) => t.author)));

  const genresList = Array.from(new Set(tracks.flatMap((t) => t.genre)));

  const yearSortOptions: { label: string; value: SortType }[] = [
    { label: 'По умолчанию', value: 'default' },
    { label: 'Сначала новые', value: 'year_new' },
    { label: 'Сначала старые', value: 'year_old' },
  ];

  const counters: Record<string, number> = {
    исполнителю: authors.length,
    жанру: genres.length,
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div className={styles.filter__buttons}>
        {title.map((filterName) => (
          <div key={filterName} className={styles.filter__wrapper}>
            <button
              onClick={() =>
                setActiveFilter((prev) =>
                  prev === filterName ? null : filterName,
                )
              }
              className={classNames(styles.filter__button, {
                [styles.active]: activeFilter === filterName,
                [styles.filter__buttonActive]:
                  (filterName === 'исполнителю' && authors.length > 0) ||
                  (filterName === 'жанру' && genres.length > 0) ||
                  (filterName === 'году выпуска' && sort !== 'default'),
              })}
            >
              {filterName}
              {counters[filterName] > 0 && (
                <span className={styles.counter}>{counters[filterName]}</span>
              )}
            </button>

            {activeFilter === filterName && (
              <div className={styles.filter__list}>
                {filterName === 'исполнителю' &&
                  authorsList.map((author) => (
                    <div
                      key={author}
                      className={classNames(styles.filter__listItem, {
                        [styles.selected]: authors.includes(author),
                      })}
                      onClick={() => dispatch(setFilterAuthors(author))}
                    >
                      {author}
                    </div>
                  ))}

                {filterName === 'жанру' &&
                  genresList.map((genre) => (
                    <div
                      key={genre}
                      className={classNames(styles.filter__listItem, {
                        [styles.selected]: genres.includes(genre),
                      })}
                      onClick={() => dispatch(setFilterGenres(genre))}
                    >
                      {genre}
                    </div>
                  ))}

                {filterName === 'году выпуска' &&
                  yearSortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={classNames(styles.filter__listItem, {
                        [styles.selected]: sort === option.value,
                      })}
                      onClick={() => dispatch(setSort(option.value))}
                    >
                      {option.label}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import {
//   setFilterAuthors,
//   setFilterGenres,
//   setSort,
//   SortType,
// } from '@/store/features/trackSlice';
// import { useState } from 'react';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors, genres, sort } = useAppSelector(
//     (state) => state.tracks.filters,
//   );

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   /** 🔹 ТРЕКИ С УЧЁТОМ АВТОРА И ЖАНРА */
//   const filteredTracks = tracks.filter((track) => {
//     if (authors.length && !authors.includes(track.author)) return false;
//     if (genres.length && !genres.some((g) => track.genre.includes(g)))
//       return false;
//     return true;
//   });

//   /** 🔹 СПИСКИ ДЛЯ ФИЛЬТРОВ */
//   const authorsList = Array.from(new Set(filteredTracks.map((t) => t.author)));

//   const genresList = Array.from(
//     new Set(filteredTracks.flatMap((t) => t.genre)),
//   );

//   const yearSortOptions: { label: string; value: SortType }[] = [
//     { label: 'По умолчанию', value: 'default' },
//     { label: 'Сначала новые', value: 'year_new' },
//     { label: 'Сначала старые', value: 'year_old' },
//   ];

//   /** 🔹 СЧЁТЧИКИ */
//   const counters: Record<string, number> = {
//     исполнителю: authors.length,
//     жанру: genres.length,
//     'году выпуска': sort === 'default' ? 0 : 1,
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>

//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() =>
//                 setActiveFilter((prev) =>
//                   prev === filterName ? null : filterName,
//                 )
//               }
//               className={classNames(styles.filter__button, {
//                 [styles.active]: activeFilter === filterName,
//               })}
//             >
//               {filterName}
//               {counters[filterName] > 0 && (
//                 <span className={styles.counter}>
//                   {counters[filterName]}
//                 </span>
//               )}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {filterName === 'исполнителю' &&
//                   authorsList.map((author) => (
//                     <div
//                       key={author}
//                       className={classNames(styles.filter__listItem, {
//                         [styles.selected]: authors.includes(author),
//                       })}
//                       onClick={() => dispatch(setFilterAuthors(author))}
//                     >
//                       {author}
//                     </div>
//                   ))}

//                 {filterName === 'жанру' &&
//                   genresList.map((genre) => (
//                     <div
//                       key={genre}
//                       className={classNames(styles.filter__listItem, {
//                         [styles.selected]: genres.includes(genre),
//                       })}
//                       onClick={() => dispatch(setFilterGenres(genre))}
//                     >
//                       {genre}
//                     </div>
//                   ))}

//                 {filterName === 'году выпуска' &&
//                   yearSortOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       className={classNames(styles.filter__listItem, {
//                         [styles.selected]: sort === option.value,
//                       })}
//                       onClick={() => dispatch(setSort(option.value))}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import {
//   setFilterAuthors,
//   setFilterGenres,
//   setSort,
//   SortType,
// } from '@/store/features/trackSlice';
// import { useState } from 'react';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors, genres, sort } = useAppSelector(
//     (state) => state.tracks.filters,
//   );
//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   /** 🔹 ТРЕКИ С УЧЁТОМ ВЫБРАННЫХ АВТОРА И ЖАНРА */
//   const filteredTracks = tracks.filter((track) => {
//     if (authors.length && !authors.includes(track.author)) return false;
//     if (genres.length && !genres.some((g) => track.genre.includes(g)))
//       return false;
//     return true;
//   });

//   const authorsList = Array.from(new Set(filteredTracks.map((t) => t.author)));

//   const genresList = Array.from(
//     new Set(filteredTracks.flatMap((t) => t.genre)),
//   );

//   const yearSortOptions: { label: string; value: SortType }[] = [
//     { label: 'По умолчанию', value: 'default' },
//     { label: 'Сначала новые', value: 'year_new' },
//     { label: 'Сначала старые', value: 'year_old' },
//   ];

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>

//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() =>
//                 setActiveFilter((prev) =>
//                   prev === filterName ? null : filterName,
//                 )
//               }
//               className={classNames(styles.filter__button, {
//                 [styles.active]: activeFilter === filterName,
//               })}
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {filterName === 'исполнителю' &&
//                   authorsList.map((author) => (
//                     <div
//                       key={author}
//                       className={classNames(styles.filter__listItem, {
//                         [styles.active]: authors.includes(author),
//                       })}
//                       onClick={() => dispatch(setFilterAuthors(author))}
//                     >
//                       {author}
//                     </div>
//                   ))}

//                 {filterName === 'жанру' &&
//                   genresList.map((genre) => (
//                     <div
//                       key={genre}
//                       className={classNames(styles.filter__listItem, {
//                         [styles.active]: genres.includes(genre),
//                       })}
//                       onClick={() => dispatch(setFilterGenres(genre))}
//                     >
//                       {genre}
//                     </div>
//                   ))}

//                 {filterName === 'году выпуска' &&
//                   yearSortOptions.map((option) => (
//                     <div
//                       key={option.value}
//                       className={classNames(styles.filter__listItem, {
//                         [styles.active]: sort === option.value,
//                       })}
//                       onClick={() => dispatch(setSort(option.value))}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import {
//   setFilterAuthors,
//   setFilterGenres,
//   setSort,
//   SortType,
// } from '@/store/features/trackSlice';
// import { useState } from 'react';

// /* 🔒 Строгий тип сортировки */
// type SortType = 'default' | 'year_new' | 'year_old' | 'author';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// type FilterItem = {
//   label: string;
//   value: string;
// };

// export default function Filter({ title }: FilterProps) {
//   const dispatch = useAppDispatch();

//   const { pagePlaylist, filters } = useAppSelector((state) => state.tracks);
//   const { authors, genres, sort } = filters;

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   /* =======================
//      Авторы
//   ======================= */
//   const availableAuthors: FilterItem[] = Array.from(
//     new Set(pagePlaylist.map((t) => t.author).filter(Boolean)),
//   ).map((a) => ({ label: a, value: a }));

//   /* =======================
//      Жанры
//   ======================= */
//   const availableGenres: FilterItem[] = Array.from(
//     new Set(pagePlaylist.flatMap((t) => t.genre || [])),
//   ).map((g) => ({ label: g, value: g }));

//   /* =======================
//      Годы (привязка к автору / жанру)
//   ======================= */
//   const filteredForYears = pagePlaylist.filter((track) => {
//     if (authors.length && !authors.includes(track.author)) return false;
//     if (
//       genres.length &&
//       !genres.some((g) => track.genre?.includes(g))
//     )
//       return false;
//     return true;
//   });

//   const availableYears = Array.from(
//     new Set(
//       filteredForYears
//         .map((t) => t.release_date?.slice(0, 4))
//         .filter(Boolean),
//     ),
//   ).sort((a, b) => Number(b) - Number(a));

//   /* =======================
//      Сортировка по году
//   ======================= */
//   const yearSortOptions: { label: string; value: SortType }[] = [
//     { label: 'По умолчанию', value: 'default' },
//     { label: 'Сначала новые', value: 'year_new' },
//     { label: 'Сначала старые', value: 'year_old' },
//   ];

//   const handleClick = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') {
//       dispatch(setFilterAuthors(value));
//     }
//     if (filterName === 'жанру') {
//       dispatch(setFilterGenres(value));
//     }
//     if (filterName === 'году выпуска') {
//       dispatch(setSort(value as SortType));
//     }
//   };

//   const isActive = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') return authors.includes(value);
//     if (filterName === 'жанру') return genres.includes(value);
//     if (filterName === 'году выпуска') return sort === value;
//     return false;
//   };

//   const getList = (filterName: string): FilterItem[] => {
//     if (filterName === 'исполнителю') return availableAuthors;
//     if (filterName === 'жанру') return availableGenres;
//     if (filterName === 'году выпуска') return yearSortOptions;
//     return [];
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>

//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               className={classNames(styles.filter__button, {
//                 [styles.active]: activeFilter === filterName,
//               })}
//               onClick={() =>
//                 setActiveFilter((prev) =>
//                   prev === filterName ? null : filterName,
//                 )
//               }
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getList(filterName).map((item) => (
//                   <div
//                     key={`${filterName}-${item.value}`}
//                     className={classNames(styles.filter__listItem, {
//                       [styles.active]: isActive(filterName, item.value),
//                     })}
//                     onClick={() =>
//                       handleClick(filterName, item.value)
//                     }
//                   >
//                     {item.label}
//                   </div>
//                 ))}

//                 {filterName === 'году выпуска' && availableYears.length === 0 && (
//                   <div className={styles.filter__empty}>
//                     Нет доступных годов
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// сортировка отдельно по годам
// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { getUniqueValuesByKey } from '@/utils/helper';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';
// import { useState } from 'react';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors: activeAuthors, genres: activeGenres, years: activeYears } =
//     useAppSelector((state) => state.tracks.filters);

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   // Генерация уникальных значений
//   const authors = Array.from(new Set(getUniqueValuesByKey(tracks, 'author').filter(Boolean)));
//   const genres = Array.from(new Set(getUniqueValuesByKey(tracks, 'genre').flat().filter(Boolean)));
//   const years = Array.from(
//     new Set(
//       getUniqueValuesByKey(tracks, 'release_date')
//         .map((d) => d?.slice(0, 4))
//         .filter(Boolean)
//     )
//   );

//   const getListForFilter = (filterName: string): string[] => {
//     switch (filterName) {
//       case 'исполнителю':
//         return authors;
//       case 'жанру':
//         return genres;
//       case 'году выпуска':
//         return years;
//       default:
//         return [];
//     }
//   };

//   const handleItemClick = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') dispatch(setFilterAuthors(value));
//     if (filterName === 'жанру') dispatch(setFilterGenres(value));
//     if (filterName === 'году выпуска') dispatch(setFilterYears(value));
//   };

//   const isActive = (filterName: string, item: string) => {
//     if (filterName === 'исполнителю') return activeAuthors.includes(item);
//     if (filterName === 'жанру') return activeGenres.includes(item);
//     if (filterName === 'году выпуска') return activeYears.includes(item);
//     return false;
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>
//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() => setActiveFilter((prev) => (prev === filterName ? null : filterName))}
//               className={classNames(styles.filter__button, { [styles.active]: activeFilter === filterName })}
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getListForFilter(filterName).map((item, idx) => (
//                   <div
//                     key={`${filterName}-${item}-${idx}`} // уникальный ключ
//                     className={classNames(styles.filter__listItem, { [styles.active]: isActive(filterName, item) })}
//                     onClick={() => handleItemClick(filterName, item)}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// код для динамической фильтрации
// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';
// import { useState } from 'react';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors: activeAuthors, genres: activeGenres, years: activeYears } =
//     useAppSelector((state) => state.tracks.filters);

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   // Генерация доступных значений с учётом уже выбранных фильтров
//   const getFilteredTracksForFilter = (filterName: string): TrackType[] => {
//     let filtered = [...tracks];

//     // Убираем текущий фильтр, чтобы не исключать сам себя
//     if (filterName !== 'исполнителю' && activeAuthors.length) {
//       filtered = filtered.filter(t => activeAuthors.includes(t.author));
//     }
//     if (filterName !== 'жанру' && activeGenres.length) {
//       filtered = filtered.filter(t => activeGenres.some(g => t.genre.includes(g)));
//     }
//     if (filterName !== 'году выпуска' && activeYears.length) {
//       filtered = filtered.filter(t => activeYears.includes(t.release_date?.slice(0,4)));
//     }

//     return filtered;
//   };

//   const getListForFilter = (filterName: string): string[] => {
//     const filteredTracks = getFilteredTracksForFilter(filterName);

//     switch (filterName) {
//       case 'исполнителю':
//         return Array.from(new Set(filteredTracks.map(t => t.author).filter(Boolean)));
//       case 'жанру':
//         return Array.from(new Set(filteredTracks.flatMap(t => t.genre).filter(Boolean)));
//       case 'году выпуска':
//         return Array.from(new Set(filteredTracks.map(t => t.release_date?.slice(0, 4)).filter(Boolean)));
//       default:
//         return [];
//     }
//   };

//   const handleItemClick = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') dispatch(setFilterAuthors(value));
//     if (filterName === 'жанру') dispatch(setFilterGenres(value));
//     if (filterName === 'году выпуска') dispatch(setFilterYears(value));
//   };

//   const isActive = (filterName: string, item: string) => {
//     if (filterName === 'исполнителю') return activeAuthors.includes(item);
//     if (filterName === 'жанру') return activeGenres.includes(item);
//     if (filterName === 'году выпуска') return activeYears.includes(item);
//     return false;
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>
//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() => setActiveFilter((prev) => (prev === filterName ? null : filterName))}
//               className={classNames(styles.filter__button, { [styles.active]: activeFilter === filterName })}
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getListForFilter(filterName).map((item, idx) => (
//                   <div
//                     key={`${filterName}-${item}-${idx}`} // уникальный ключ
//                     className={classNames(styles.filter__listItem, { [styles.active]: isActive(filterName, item) })}
//                     onClick={() => handleItemClick(filterName, item)}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// код для комбинированной фильтрации
// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { getUniqueValuesByKey } from '@/utils/helper';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';
// import { useState } from 'react';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors: activeAuthors, genres: activeGenres, years: activeYears } =
//     useAppSelector((state) => state.tracks.filters);

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   // Генерация уникальных значений
//   const authors = Array.from(new Set(getUniqueValuesByKey(tracks, 'author').filter(Boolean)));
//   const genres = Array.from(new Set(getUniqueValuesByKey(tracks, 'genre').flat().filter(Boolean)));
//   const years = Array.from(
//     new Set(
//       getUniqueValuesByKey(tracks, 'release_date')
//         .map((d) => d?.slice(0, 4))
//         .filter(Boolean)
//     )
//   );

//   const getListForFilter = (filterName: string): string[] => {
//     switch (filterName) {
//       case 'исполнителю':
//         return authors;
//       case 'жанру':
//         return genres;
//       case 'году выпуска':
//         return years;
//       default:
//         return [];
//     }
//   };

//   const handleItemClick = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') dispatch(setFilterAuthors(value));
//     if (filterName === 'жанру') dispatch(setFilterGenres(value));
//     if (filterName === 'году выпуска') dispatch(setFilterYears(value));
//   };

//   const isActive = (filterName: string, item: string) => {
//     if (filterName === 'исполнителю') return activeAuthors.includes(item);
//     if (filterName === 'жанру') return activeGenres.includes(item);
//     if (filterName === 'году выпуска') return activeYears.includes(item);
//     return false;
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>
//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() => setActiveFilter((prev) => (prev === filterName ? null : filterName))}
//               className={classNames(styles.filter__button, { [styles.active]: activeFilter === filterName })}
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getListForFilter(filterName).map((item, idx) => (
//                   <div
//                     key={`${filterName}-${item}-${idx}`} // уникальный ключ
//                     className={classNames(styles.filter__listItem, { [styles.active]: isActive(filterName, item) })}
//                     onClick={() => handleItemClick(filterName, item)}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { getUniqueValuesByKey } from '@/utils/helper';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';
// import { useState } from 'react';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors: activeAuthors, genres: activeGenres, years: activeYears } = useAppSelector(state => state.tracks.filters);

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   const authors = getUniqueValuesByKey(tracks, 'author').filter(Boolean);
//   const genres = getUniqueValuesByKey(tracks, 'genre').flat();
//   const years = getUniqueValuesByKey(tracks, 'release_date').map(d => d?.slice(0, 4)).filter(Boolean);

//   const getListForFilter = (filterName: string): string[] => {
//     switch (filterName) {
//       case 'исполнителю': return authors;
//       case 'жанру': return genres;
//       case 'году выпуска': return years;
//       default: return [];
//     }
//   };

//   const handleItemClick = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') dispatch(setFilterAuthors(value));
//     if (filterName === 'жанру') dispatch(setFilterGenres(value));
//     if (filterName === 'году выпуска') dispatch(setFilterYears(value));
//   };

//   const isActive = (filterName: string, item: string) => {
//     if (filterName === 'исполнителю') return activeAuthors.includes(item);
//     if (filterName === 'жанру') return activeGenres.includes(item);
//     if (filterName === 'году выпуска') return activeYears.includes(item);
//     return false;
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>
//       <div className={styles.filter__buttons}>
//         {title.map(filterName => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() => setActiveFilter(prev => (prev === filterName ? null : filterName))}
//               className={classNames(styles.filter__button, { [styles.active]: activeFilter === filterName })}
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getListForFilter(filterName).map(item => (
//                   <div
//                     key={item}
//                     className={classNames(styles.filter__listItem, { [styles.active]: isActive(filterName, item) })}
//                     onClick={() => handleItemClick(filterName, item)}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// переходный вариант
// 'use client';

// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { getUniqueValuesByKey } from '@/utils/helper';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { setFilterAuthors } from '@/store/features/trackSlice';
// // import { setCurrentTrack } from '@/store/features/trackSlice';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
// };

// export default function Filter({ title, tracks }: FilterProps) {
//   const dispatch = useAppDispatch();
//   const { authors: activeAuthors } = useAppSelector(
//     (state) => state.tracks.filters,
//   );

//   const onSelectGenre = (genre: string) => {
//     // dispatch(setFilterGenres(genre));
//   };

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   // уникальные значения
//   const authors = getUniqueValuesByKey(tracks, 'author').filter(Boolean);

//   const getListForFilter = (filterName: string): string[] => {
//     switch (filterName) {
//       case 'исполнителю':
//         return authors;
//       default:
//         return [];
//     }
//   };

//   const handleItemClick = (filterName: string, value: string) => {
//     if (filterName === 'исполнителю') {
//       dispatch(setFilterAuthors(value));
//     }
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>

//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             <button
//               onClick={() =>
//                 setActiveFilter((prev) =>
//                   prev === filterName ? null : filterName,
//                 )
//               }
//               className={classNames(styles.filter__button, {
//                 [styles.active]: activeFilter === filterName,
//               })}
//             >
//               {filterName}
//             </button>

//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getListForFilter(filterName).map((item) => (
//                   <div
//                     key={item}
//                     className={classNames(styles.filter__listItem, {
//                       [styles.active]: activeAuthors.includes(item),
//                     })}
//                     onClick={() =>
//                       handleItemClick(filterName, item)
//                     }
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// рабочий вариант
// 'use client';

// import { useState } from 'react';
// import styles from './filter.module.css';
// import classNames from 'classnames';
// import { getUniqueValuesByKey } from '@/utils/helper';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// type FilterProps = {
//   title: string[];
//   tracks: TrackType[];
//   onSelect: (filter: { type: string; value: string } | null) => void;
// };

// export default function Filter({ title, tracks, onSelect }: FilterProps) {
//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   // Уникальные значения для каждого фильтра
//   const authors = getUniqueValuesByKey(tracks, 'author').filter(Boolean);
//   const genres = getUniqueValuesByKey(tracks, 'genre').filter(Boolean);
//   const years = getUniqueValuesByKey(tracks, 'release_date')
//     .map((d) => d.split('-')[0])
//     .filter(Boolean);

//   // const handleClick = (filterName: string) => {
//   //   setActiveFilter((prev) => (prev === filterName ? null : filterName));
//   // };

//   const getListForFilter = (filterName: string) => {
//     switch (filterName) {
//       case 'исполнителю':
//         return authors;
//       case 'жанру':
//         return genres;
//       case 'году выпуска':
//         return years;
//       default:
//         return [];
//     }
//   };

//   const handleItemClick = (filterName: string, value: string) => {
//     onSelect({ type: filterName, value }); // сообщаем родителю
//   };

//   return (
//     <div className={styles.filter}>
//       <div className={styles.filter__title}>Искать по:</div>
//       <div className={styles.filter__buttons}>
//         {title.map((filterName) => (
//           <div key={filterName} className={styles.filter__wrapper}>
//             {/* <button
//               onClick={() => handleClick(filterName)}
//               className={classNames(styles.filter__button, {
//                 [styles.active]: activeFilter === filterName,
//               })}
//             >
//               {filterName}
//             </button> */}
//             <button
//               onClick={() =>
//                 setActiveFilter((prev) =>
//                   prev === filterName ? null : filterName,
//                 )
//               }
//               className={classNames(styles.filter__button, {
//                 [styles.active]: activeFilter === filterName,
//               })}
//             >
//               {filterName}
//             </button>

//             {/* Всплывающий список фильтров */}
//             {activeFilter === filterName && (
//               <div className={styles.filter__list}>
//                 {getListForFilter(filterName).map((item, index) => (
//                   <div
//                     key={item + index}
//                     className={styles.filter__listItem}
//                     onClick={() => handleItemClick(filterName, item)} //вызываем select
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
