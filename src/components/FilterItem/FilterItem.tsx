'use client';

import classnames from 'classnames';
import styles from './filterItem.module.css';

type FilterItemProps = {
  items: string[];
};

export default function FilterItem({ items }: FilterItemProps) {
  return (
    <div className={styles.content__title}>
      {items.map((col, index) => (
        <div
          key={index}
          className={classnames(
            styles.playlistTitle__col,
            styles[`col0${index + 1}`]
          )}
        >
          {col === 'Время' ? (
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          ) : (
            col
          )}
        </div>
      ))}
    </div>
  );
}





// 'use client';

// import classnames from 'classnames';
// import styles from './filterItem.module.css';

// type FilterItemProps = {
//   items: string[]; 
// };

// export default function FilterItem({ items = ['Трек', 'Исполнитель', 'Альбом', 'Время'] }: FilterItemProps) {
//   return (
//     <div className={styles.content__title}>
//       {items.map((col, index) => (
//         <div
//           key={index}
//           className={classnames(styles.playlistTitle__col, styles[`col0${index + 1}`])}
//         >
//           {col === 'Время' ? (
//             <svg className={styles.playlistTitle__svg}>
//               <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
//             </svg>
//           ) : (
//             col
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }




// 'use client';

// import styles from './filterItem.module.css';

// export default function FilterItem() {

//   return (
//     <div className={styles.content__title}>
//           <div className={classnames(styles.playlistTitle__col, styles.col01)}>
//             Трек
//           </div>
//           <div className={classnames(styles.playlistTitle__col, styles.col02)}>
//             Исполнитель
//           </div>
//           <div className={classnames(styles.playlistTitle__col, styles.col03)}>
//             Альбом
//           </div>
//           <div className={classnames(styles.playlistTitle__col, styles.col04)}>
//             <svg className={styles.playlistTitle__svg}>
//               <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
//             </svg>
//           </div>
//           </div>
//   );
// }
