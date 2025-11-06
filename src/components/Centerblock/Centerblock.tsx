import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
import Track from '../Track/Track';
import { data } from '@/data';

export default function Centerblock() {

  const filters = ['исполнителю', 'году выпуска', 'жанру'];
  const items = ['Трек', 'Исполнитель', 'Альбом', 'Время'];

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>

      <div className={styles.centerblock__filter}>
        <Filter title={filters} />
      </div>

      <div className={styles.centerblock__content}>
        <FilterItem items={items} />
        <div className={styles.content__playlist}> 
          {data.map((track) => (
            <Track key={track._id} track={track} />
          ))}
        </div>
      </div> 
    </div>
  );
}


// рабочий вариант

// 'use client';

// import styles from './centerblock.module.css';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import Track from '../Track/Track';
// import { data } from '@/data';

// export default function Centerblock() {
//   // Названия фильтров
//   const filters = ['исполнителю', 'году выпуска', 'жанру'];

//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       {/* Фильтры */}
//       <div className={styles.centerblock__filter}>
//         <Filter title={filters} />
//       </div>

//       {/* Список треков */}
//       <div className={styles.centerblock__content}>
//         <div className={styles.content__playlist}>
//           {data.map((track) => (
//             <Track key={track._id} track={track} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// промежуточный код
// import styles from './centerblock.module.css';
// // import classnames from 'classnames';
// import Search from '../Search/Search';
// import Filter from '../Filter/Filter';
// import FilterItem from '../FilterItem/FilterItem';
// import Track from '../Track/Track';
// import { data } from '@/data';

// export default function Centerblock() {
//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       <div className={styles.centerblock__filter}>
//         <Filter />
//         {/* <div className={styles.filter__title}>Искать по:</div>
//         <div className={styles.filter__button}>исполнителю</div>
//         <div className={styles.filter__button}>году выпуска</div>
//         <div className={styles.filter__button}>жанру</div> */}
//       </div>

//       <div className={styles.centerblock__content}>
//         <FilterItem />
//         {/* <div className={styles.content__title}>
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
//         </div> */}
//         <div className={styles.content__playlist}> 
//           {data.map((track) => (
//             <Track key={track._id} track={track} />
//           ))}
//         </div>
//       </div> 
//     </div>
//   );
// }


//промежуточный код
// import styles from './centerblock.module.css';
// // import Link from 'next/link';
// import classnames from 'classnames';
// import Search from '../Search/Search';
// import Track from '../Track/Track';
// import { data } from '@/data';

// export default function Centerblock() {
//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>

//       <div className={styles.centerblock__filter}>
//         <div className={styles.filter__title}>Искать по:</div>
//         <div className={styles.filter__button}>исполнителю</div>
//         <div className={styles.filter__button}>году выпуска</div>
//         <div className={styles.filter__button}>жанру</div>
//       </div>

//       <div className={styles.centerblock__content}>
//         <div className={styles.content__title}>
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
//         </div>
//         <div className={styles.content__playlist}> 
//           {data.map((track) => (
//             <Track key={track._id} track={track} />
//           ))}
//           {/* <Track /> */}

          
//           {/* <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div> 
//                   <Link className={styles.track__titleLink} href="">
//                     Guilt <span className={styles.track__titleSpan}></span>
//                   </Link>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Nero
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Welcome Reality
//                 </Link>
//               </div>
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:44</span>
//             </div>
//           </div> */}
          

//         </div>
//       </div> 
//     </div>
//   );
// }




//очищенный код
// import styles from './centerblock.module.css';
// import Link from 'next/link';
// import classnames from 'classnames';
// import Search from '../Search/Search';

// export default function Centerblock() {
//   return (
//     <div className={styles.centerblock}>
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>
//       <div className={styles.centerblock__filter}>
//         <div className={styles.filter__title}>Искать по:</div>
//         <div className={styles.filter__button}>исполнителю</div>
//         <div className={styles.filter__button}>году выпуска</div>
//         <div className={styles.filter__button}>жанру</div>
//       </div>
//       <div className={styles.centerblock__content}>
//         <div className={styles.content__title}>
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
//         </div>
//         <div className={styles.content__playlist}>

          
//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div> 
//                   <Link className={styles.track__titleLink} href="">
//                     Guilt <span className={styles.track__titleSpan}></span>
//                   </Link>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Nero
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Welcome Reality
//                 </Link>
//               </div>
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:44</span>
//             </div>
//           </div>


//         </div>
//       </div> 
//     </div>
//   );
// }




// import styles from './centerblock.module.css';
// import Link from 'next/link';
// import classnames from 'classnames';
// import Search from '../Search/Search';

// export default function Centerblock() {
//   return (
//     <div className={styles.centerblock}>
//       {/* <div className={styles.centerblock__search}>
//         <svg className={styles.search__svg}>
//           <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
//         </svg>
//         <input
//           className={styles.search__text}
//           type="search" 
//           placeholder="Поиск"
//           name="search"
//         />
//       </div> */}
//       <Search />
//       <h2 className={styles.centerblock__h2}>Треки</h2>
//       <div className={styles.centerblock__filter}>
//         <div className={styles.filter__title}>Искать по:</div>
//         <div className={styles.filter__button}>исполнителю</div>
//         <div className={styles.filter__button}>году выпуска</div>
//         <div className={styles.filter__button}>жанру</div>
//       </div>
//       <div className={styles.centerblock__content}>
//         <div className={styles.content__title}>
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
//         </div>
//         <div className={styles.content__playlist}>











//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     Guilt <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Nero
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Welcome Reality
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:44</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     Elektro <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Dynoro, Outwork, Mr. Gee
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Elektro
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:22</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     I’m Fire <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Ali Bakgor
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   I’m Fire
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:22</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     Non Stop
//                     <span className={styles.track__titleSpan}>(Remix)</span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Стоункат, Psychopath
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Non Stop
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:12</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div>
//                   <Link className={styles.track__titleLink} href="">
//                     Run Run
//                     <span className={styles.track__titleSpan}>
//                       (feat. AR/CO)
//                     </span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Jaded, Will Clarke, AR/CO
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Run Run
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:54</span>
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       </div> 
//     </div>
//   );
// }





































// до TS
// import styles from './centerblock.module.css';
// import Link from 'next/link';
// import classnames from 'classnames';


// export default function Centerblock() {
//   return (
//     <div className={styles.centerblock}>
//       <div className={styles.centerblock__search}>
//         <svg className={styles.search__svg}>
//           <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
//         </svg>
//         <input
//           className={styles.search__text}
//           type="search" 
//           placeholder="Поиск"
//           name="search"
//         />
//       </div>
//       <h2 className={styles.centerblock__h2}>Треки</h2>
//       <div className={styles.centerblock__filter}>
//         <div className={styles.filter__title}>Искать по:</div>
//         <div className={styles.filter__button}>исполнителю</div>
//         <div className={styles.filter__button}>году выпуска</div>
//         <div className={styles.filter__button}>жанру</div>
//       </div>
//       <div className={styles.centerblock__content}>
//         <div className={styles.content__title}>
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
//         </div>
//         <div className={styles.content__playlist}>
//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     Guilt <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Nero
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Welcome Reality
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:44</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     Elektro <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Dynoro, Outwork, Mr. Gee
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Elektro
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:22</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     I’m Fire <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Ali Bakgor
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   I’m Fire
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:22</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 {/* <div className="track__title-text"> */}
//                   <Link className={styles.track__titleLink} href="">
//                     Non Stop
//                     <span className={styles.track__titleSpan}>(Remix)</span>
//                   </Link>
//                 {/* </div> */}
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Стоункат, Psychopath
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Non Stop
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:12</span>
//               {/* </div> */}
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div>
//                   <Link className={styles.track__titleLink} href="">
//                     Run Run
//                     <span className={styles.track__titleSpan}>
//                       (feat. AR/CO)
//                     </span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Jaded, Will Clarke, AR/CO
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Run Run
//                 </Link>
//               </div>
//               {/* <div className="track__time"> */}
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:54</span>
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       </div> 
//     </div>
//   );
// }




// код с <div className="....">

// import styles from './Centerblock.module.css';
// import Link from 'next/link';
// import classnames from 'classnames';


// export default function Centerblock() {
//   return (
//     <div className={styles.centerblock}>
//       <div className={styles.centerblock__search}>
//         <svg className={styles.search__svg}>
//           <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
//         </svg>
//         <input
//           className={styles.search__tex}
//           type="search"
//           placeholder="Поиск"
//           name="search"
//         />
//       </div>
//       <h2 className={styles.centerblock__h2}>Треки</h2>
//       <div className={styles.centerblock__filter}>
//         <div className={styles.filter__title}>Искать по:</div>
//         <div className={styles.filter__button}>исполнителю</div>
//         <div className={styles.filter__button}>году выпуска</div>
//         <div className={styles.filter__button}>жанру</div>
//       </div>
//       <div className={styles.centerblock__content}>
//         <div className={styles.content__title}>
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
//         </div>
//         <div className={styles.content__playlist}>
//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div className="track__title-text">
//                   <Link className={styles.track__titleLink} href="">
//                     Guilt <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Nero
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Welcome Reality
//                 </Link>
//               </div>
//               <div className="track__time">
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:44</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div className="track__title-text">
//                   <Link className={styles.track__titleLink} href="">
//                     Elektro <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Dynoro, Outwork, Mr. Gee
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Elektro
//                 </Link>
//               </div>
//               <div className="track__time">
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:22</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div className="track__title-text">
//                   <Link className={styles.track__titleLink} href="">
//                     I’m Fire <span className={styles.track__titleSpan}></span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Ali Bakgor
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   I’m Fire
//                 </Link>
//               </div>
//               <div className="track__time">
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:22</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div className="track__title-text">
//                   <Link className={styles.track__titleLink} href="">
//                     Non Stop
//                     <span className={styles.track__titleSpan}>(Remix)</span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Стоункат, Psychopath
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Non Stop
//                 </Link>
//               </div>
//               <div className="track__time">
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>4:12</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.playlist__item}>
//             <div className={styles.playlist__track}>
//               <div className={styles.track__title}>
//                 <div className={styles.track__titleImage}>
//                   <svg className={styles.track__titleSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>
//                 <div>
//                   <Link className={styles.track__titleLink} href="">
//                     Run Run
//                     <span className={styles.track__titleSpan}>
//                       (feat. AR/CO)
//                     </span>
//                   </Link>
//                 </div>
//               </div>
//               <div className={styles.track__author}>
//                 <Link className={styles.track__authorLink} href="">
//                   Jaded, Will Clarke, AR/CO
//                 </Link>
//               </div>
//               <div className={styles.track__album}>
//                 <Link className={styles.track__albumLink} href="">
//                   Run Run
//                 </Link>
//               </div>
//               <div className="track__time">
//                 <svg className={styles.track__timeSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                 </svg>
//                 <span className={styles.track__timeText}>2:54</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> 
//     </div>
//   );
// }
