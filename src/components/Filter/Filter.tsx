'use client';

import styles from './filter.module.css';
import classNames from 'classnames';
import { getUniqueValuesByKey } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFilterAuthors } from '@/store/features/trackSlice';
// import { setCurrentTrack } from '@/store/features/trackSlice';

type FilterProps = {
  title: string[];
  tracks: TrackType[];
};

export default function Filter({ title, tracks }: FilterProps) {
  const dispatch = useAppDispatch();
  const { authors: activeAuthors } = useAppSelector(
    (state) => state.tracks.filters,
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // уникальные значения
  const authors = getUniqueValuesByKey(tracks, 'author').filter(Boolean);

  const getListForFilter = (filterName: string): string[] => {
    switch (filterName) {
      case 'исполнителю':
        return authors;
      default:
        return [];
    }
  };

  const handleItemClick = (filterName: string, value: string) => {
    if (filterName === 'исполнителю') {
      dispatch(setFilterAuthors(value));
    }
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
              })}
            >
              {filterName}
            </button>

            {activeFilter === filterName && (
              <div className={styles.filter__list}>
                {getListForFilter(filterName).map((item) => (
                  <div
                    key={item}
                    className={classNames(styles.filter__listItem, {
                      [styles.active]: activeAuthors.includes(item),
                    })}
                    onClick={() =>
                      handleItemClick(filterName, item)
                    }
                  >
                    {item}
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
