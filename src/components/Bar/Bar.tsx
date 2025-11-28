'use client';

import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useRef, useEffect, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { formatTime } from '@/utils/helper';

export default function Bar() {
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);

  // useEffect(() => {
  //   setIsLoadedTrack(false);
  //   setCurrentTime(0);
  // }, [currentTrack]);

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const loopTrack = () => {
    setIsLoop((prev) => !prev);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setCurrentTime(0);

      audioRef.current.play();
      dispatch(setIsPlay(true));

      setIsLoadedTrack(true);
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTime = Number(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = inputTime;
    }

    setCurrentTime(inputTime);
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    const handleCanPlay = () => {
      audio
        .play()
        .then(() => dispatch(setIsPlay(true)))
        .catch(() => {});
    };

    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack, dispatch]);

  const handleEnded = () => {
    if (isLoop) {
      audioRef.current?.play();
      return;
    }

    dispatch(setNextTrack());
  };

  if (!currentTrack) return <></>;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        style={{ display: 'none' }}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className={styles.bar__content}>

        <div className={styles.timePanel}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <ProgressBar
          max={duration}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              {isPlay ? (
                <div className={classNames(styles.btn)} onClick={pauseTrack}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
                  </svg>
                </div>
              ) : (
                <div className={classNames(styles.btn)} onClick={playTrack}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play" />
                  </svg>
                </div>
              )}

              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  { [styles.active]: isLoop },
                )}
                onClick={loopTrack}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  { [styles.active]: isShuffle },
                )}
                onClick={onToggleShuffle}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>

                <div className={styles.trackPlay__author}>
                  {currentTrack.name}
                </div>

                <div className={styles.trackPlay__album}>
                  {currentTrack.author}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>

              <input
                className={classNames(styles.volume__progressLine, styles.btn)}
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => {
                  const v = Number(e.target.value) / 100;
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import styles from './bar.module.css';
// import classNames from 'classnames';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { ChangeEvent, useRef, useEffect, useState } from 'react';
// import {
//   setIsPlay,
//   setNextTrack,
//   setPrevTrack,
//   toggleShuffle,
// } from '@/store/features/trackSlice';
// import ProgressBar from '../ProgressBar/ProgressBar';
// import { formatTime } from '@/utils/helper';

// export default function Bar() {
//   const dispatch = useAppDispatch();

//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
//   const isPlay = useAppSelector((state) => state.tracks.isPlay);

//   const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

//   const [isLoop, setIsLoop] = useState(false);
//   const [isLoadedTrack, setIsLoadedTrack] = useState(false);

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const [volume, setVolume] = useState(0.5);

//   // useEffect(() => {
//   //   setIsLoadedTrack(false);
//   //   setCurrentTime(0);
//   // }, [currentTrack]);

//   const playTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       dispatch(setIsPlay(true));
//     }
//   };

//   const pauseTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       dispatch(setIsPlay(false));
//     }
//   };

//   const loopTrack = () => {
//     setIsLoop((prev) => !prev);
//   };

//   const onTimeUpdate = () => {
//     if (audioRef.current) {
//       setCurrentTime(audioRef.current.currentTime);
//     }
//   };

//   const onLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration);

//       audioRef.current.play();
//       dispatch(setIsPlay(true));

//       setIsLoadedTrack(true);
//     }
//   };

//   const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
//     const inputTime = Number(e.target.value);

//     if (audioRef.current) {
//       audioRef.current.currentTime = inputTime;
//     }

//     setCurrentTime(inputTime);
//   };

//   const onNextTrack = () => {
//     dispatch(setNextTrack());
//   };

//   const onPrevTrack = () => {
//     dispatch(setPrevTrack());
//   };

//   const onToggleShuffle = () => {
//     dispatch(toggleShuffle());
//   };

//   useEffect(() => {
//     if (audioRef.current && currentTrack) {
//       audioRef.current.load();
//     }
//   }, [currentTrack]);

//   useEffect(() => {
//     if (!audioRef.current || !currentTrack) return;

//     const audio = audioRef.current;

//     const handleCanPlay = () => {
//       audio
//         .play()
//         .then(() => dispatch(setIsPlay(true)))
//         .catch(() => {});
//     };

//     audio.addEventListener('canplay', handleCanPlay);

//     return () => {
//       audio.removeEventListener('canplay', handleCanPlay);
//     };
//   }, [currentTrack, dispatch]);

//   const handleEnded = () => {
//     if (isLoop) {
//       audioRef.current?.play();
//       return;
//     }

//     dispatch(setNextTrack());
//   };

//   if (!currentTrack) return <></>;

//   return (
//     <div className={styles.bar}>
//       <audio
//         ref={audioRef}
//         src={currentTrack.track_file}
//         style={{ display: 'none' }}
//         loop={isLoop}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={handleEnded}
//       />

//       <div className={styles.bar__content}>
//         <ProgressBar
//           max={duration}
//           step={0.1}
//           readOnly={!isLoadedTrack}
//           value={currentTime}
//           onChange={onChangeProgress}
//         />

//         <div className={styles.timePanel}>
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </div>

//         <div className={styles.bar__playerBlock}>
//           <div className={styles.bar__player}>
//             <div className={styles.player__controls}>
//               <div className={styles.player__btnPrev} onClick={onPrevTrack}>
//                 <svg className={styles.player__btnPrevSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
//                 </svg>
//               </div>

//               {isPlay ? (
//                 <div className={classNames(styles.btn)} onClick={pauseTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
//                   </svg>
//                 </div>
//               ) : (
//                 <div className={classNames(styles.btn)} onClick={playTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-play" />
//                   </svg>
//                 </div>
//               )}

//               <div className={styles.player__btnNext} onClick={onNextTrack}>
//                 <svg className={styles.player__btnNextSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
//                 </svg>
//               </div>

//               <div
//                 className={classNames(
//                   styles.player__btnRepeat,
//                   styles.btnIcon,
//                   { [styles.active]: isLoop },
//                 )}
//                 onClick={loopTrack}
//               >
//                 <svg className={styles.player__btnRepeatSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
//                 </svg>
//               </div>

//               <div
//                 className={classNames(
//                   styles.player__btnShuffle,
//                   styles.btnIcon,
//                   { [styles.active]: isShuffle },
//                 )}
//                 onClick={onToggleShuffle}
//               >
//                 <svg className={styles.player__btnShuffleSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
//                 </svg>
//               </div>
//             </div>

//             <div className={styles.player__trackPlay}>
//               <div className={styles.trackPlay__contain}>
//                 <div className={styles.trackPlay__image}>
//                   <svg className={styles.trackPlay__svg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>

//                 <div className={styles.trackPlay__author}>
//                   {currentTrack.name}
//                 </div>

//                 <div className={styles.trackPlay__album}>
//                   {currentTrack.author}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.bar__volumeBlock}>
//             <div className={styles.volume__content}>
//               <div className={styles.volume__image}>
//                 <svg className={styles.volume__svg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
//                 </svg>
//               </div>

//               <input
//                 className={classNames(styles.volume__progressLine, styles.btn)}
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={volume * 100}
//                 onChange={(e) => {
//                   const v = Number(e.target.value) / 100;
//                   setVolume(v);
//                   if (audioRef.current) audioRef.current.volume = v;
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';
// // import Link from 'next/link';

// import styles from './bar.module.css';
// // import classnames from 'classnames';
// import classNames from 'classnames';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { ChangeEvent, useRef, useEffect, useState } from 'react';
// import {
//   setIsPlay,
//   setNextTrack,
//   setPrevTrack,
//   toggleShuffle,
// } from '@/store/features/trackSlice';
// import ProgressBar from '../ProgressBar/ProgressBar';
// import { formatTime } from '@/utils/helper';

// export default function Bar() {
//   const dispatch = useAppDispatch();

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   // console.log(currentTrack);

//   const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
//   const isPlay = useAppSelector((state) => state.tracks.isPlay);

//   const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

//   const [isLoop, setIsLoop] = useState(false);
//   const [isLoadedTrack, setIsLoadedTrack] = useState(false);

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const [volume, setVolume] = useState(0.5);

//   useEffect(() => {
//     setIsLoadedTrack(false);
//     setCurrentTime(0);
//   }, [currentTrack]);

//   const playTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       dispatch(setIsPlay(true));
//     }
//   };

//   const pauseTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       dispatch(setIsPlay(false));
//     }
//   };

//   const loopTrack = () => {
//     // setIsLoop(!isLoop);
//     setIsLoop((prev) => !prev);
//   };

//   const onTimeUpdate = () => {
//     if (audioRef.current) {
//       // console.log(audioRef.current.currentTime);
//       // console.log(audioRef.current.duration);

//       // console.log(audioRef.current.volume);
//       setCurrentTime(audioRef.current.currentTime);
//     }
//   }; // вывести текущее и общее время справа в конце трека прогресс бара с корректным временем (3:25)

//   const onLoadedMetadata = () => {
//     // console.log('start');
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration);

//       audioRef.current.play();
//       dispatch(setIsPlay(true));

//       setIsLoadedTrack(true);
//     }
//   };

//   const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
//     const inputTime = Number(e.target.value);

//     if (audioRef.current) {
//       // const inputTime = Number(e.target.value);

//       audioRef.current.currentTime = inputTime;
//     }

//     setCurrentTime(inputTime);
//   };

//   const onNextTrack = () => {
//     dispatch(setNextTrack());
//   };

//   const onPrevTrack = () => {
//     dispatch(setPrevTrack());
//   };

//   const onToggleShuffle = () => {
//     dispatch(toggleShuffle());
//   };

//   // загружаем новый трек при переключении
//   useEffect(() => {
//     if (audioRef.current && currentTrack) {
//       audioRef.current.load();
//     }
//   }, [currentTrack]);

//   // Автоплей при готовности трека
//   useEffect(() => {
//     if (!audioRef.current || !currentTrack) return;

//     const audio = audioRef.current;

//     const handleCanPlay = () => {
//       audio
//         .play()
//         .then(() => dispatch(setIsPlay(true)))
//         .catch(() => {}); // Игнорируем
//     };

//     audio.addEventListener('canplay', handleCanPlay);

//     return () => {
//       audio.removeEventListener('canplay', handleCanPlay);
//     };
//   }, [currentTrack, dispatch]);

//   // Нереализованные кнопки
//   // const notReady = () => alert('Еще не реализовано');

//   // обработчик конца трека
//   const handleEnded = () => {
//     if (isLoop) {
//       audioRef.current?.play();
//       return;
//     }

//     dispatch(setNextTrack());
//   };

//   if (!currentTrack) return <></>;

//   return (
//     <div className={styles.bar}>
//       <audio
//         ref={audioRef}
//         src={currentTrack.track_file}
//         style={{ display: 'none' }}
//         // loop={true}
//         loop={isLoop}
//         // onTimeUpdate={() => console.log(111)}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         // onEnded={() => console.log('NEXT track')}
//         onEnded={handleEnded}
//       />
//       <div className={styles.bar__content}>
//         {/* <div className={styles.bar__playerProgress}></div> */}
//         <ProgressBar
//           // max={audioRef.current?.duration || 0}
//           max={duration}
//           step={0.1}
//           readOnly={!isLoadedTrack}
//           // value={11} //реализовать состояние текущего времени
//           value={currentTime}
//           onChange={onChangeProgress}
//         />

//         <div className={styles.timePanel}>
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </div>

//         <div className={styles.bar__playerBlock}>
//           <div className={styles.bar__player}>
//             <div className={styles.player__controls}>
//               <div className={styles.player__btnPrev} onClick={onPrevTrack}>
//                 <svg className={styles.player__btnPrevSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
//                 </svg>
//               </div>

//               {isPlay ? (
//                 <div className={classNames(styles.btn)} onClick={pauseTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
//                   </svg>
//                 </div>
//               ) : (
//                 <div className={classNames(styles.btn)} onClick={playTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-play" />
//                   </svg>
//                 </div>
//               )}

//               {/* // реализовать логику, в которой при проигровании последнего трека, нажимая на следующий трек, ничего не происходит */}
//               <div className={styles.player__btnNext} onClick={onNextTrack}>
//                 <svg className={styles.player__btnNextSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
//                 </svg>
//               </div>

//               {/* <div
//                 className={classNames(styles.player__btnRepeat, styles.btnIcon)}
//                 onClick={loopTrack} // состояние при котором иконка активна, белым цветом
//               > */}
//               <div
//                 className={classNames(
//                   styles.player__btnRepeat,
//                   styles.btnIcon,
//                   { [styles.active]: isLoop },
//                 )}
//                 onClick={loopTrack}
//               >
//                 <svg className={styles.player__btnRepeatSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
//                 </svg>
//               </div>

//               {/* <div
//                 className={classNames(
//                   styles.player__btnShuffle,
//                   styles.btnIcon,
//                 )}
//                 onClick={onToggleShuffle}
//               > */}

//               <div
//                 className={classNames(
//                   styles.player__btnShuffle,
//                   styles.btnIcon,
//                   { [styles.active]: isShuffle },
//                 )}
//                 onClick={onToggleShuffle}
//               >
//                 <svg className={styles.player__btnShuffleSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
//                 </svg>
//               </div>
//             </div>

//             <div className={styles.player__trackPlay}>
//               <div className={styles.trackPlay__contain}>
//                 <div className={styles.trackPlay__image}>
//                   <svg className={styles.trackPlay__svg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>

//                 <div className={styles.trackPlay__author}>
//                   {currentTrack.name}
//                 </div>

//                 <div className={styles.trackPlay__album}>
//                   {currentTrack.author}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.bar__volumeBlock}>
//             <div className={styles.volume__content}>
//               <div className={styles.volume__image}>
//                 <svg className={styles.volume__svg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
//                 </svg>
//               </div>

//               <input
//                 className={classNames(styles.volume__progressLine, styles.btn)}
//                 type="range"
//                 // name="range"
//                 min="0"
//                 max="100"
//                 value={volume * 100}
//                 // onChange={(e) => {
//                 //   //превести к правельному виду
//                 //   setVolume(Number(e.target.value));
//                 //   if (audioRef.current)
//                 //     audioRef.current.volume = Number(e.target.value) / 100;
//                 //   console.log(Number(e.target.value));
//                 // }}

//                 onChange={(e) => {
//                   const v = Number(e.target.value) / 100;
//                   setVolume(v);
//                   if (audioRef.current) audioRef.current.volume = v;
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//до финальной версии
// 'use client';
// import Link from 'next/link';

// import styles from './bar.module.css';
// // import classnames from 'classnames';
// import classNames from 'classnames';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { ChangeEvent, useRef, useEffect, useState } from 'react';
// import {
//   setIsPlay,
//   setNextTrack,
//   toggleShuffle,
// } from '@/store/features/trackSlice';
// import ProgressBar from '../ProgressBar/ProgressBar';

// export default function Bar() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   // console.log(currentTrack);
//   const dispatch = useAppDispatch();

//   const [isLoop, setIsLoop] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [isLoadedTrack, setIsLoadedTrack] = useState(false);

//   const currentTrack = useAppSelector((state) => state.tracks?.currentTrack);
//   const isPlay = useAppSelector((state) => state.tracks?.isPlay);

//   useEffect(() => {
//     setIsLoadedTrack(false);
//   }, [currentTrack]);

//   const playTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       dispatch(setIsPlay(true));
//     }
//   };

//   const pauseTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       dispatch(setIsPlay(false));
//     }
//   };

//   const loopTrack = () => {
//     setIsLoop(!isLoop);
//   };

//   const onTimeUpdate = () => {
//     if (audioRef.current) {
//       // console.log(audioRef.current.currentTime);
//       // console.log(audioRef.current.duration);
//       console.log(audioRef.current.volume);
//     }
//   }; // вывести текущее и общее время справа в конце трека прогресс бара с корректным временем (3:25)

//   const onLoadedMetadata = () => {
//     console.log('start');
//     if (audioRef.current) {
//       audioRef.current.play();
//       dispatch(setIsPlay(true));
//       setIsLoadedTrack(true);
//     }
//   };

//   const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
//     if (audioRef.current) {
//       const inputTime = Number(e.target.value);

//       audioRef.current.currentTime = inputTime;
//     }
//   };

//   const onNextTrack = () => {
//     dispatch(setNextTrack());
//   };

//   const onToggleShuffle = () => {
//     dispatch(toggleShuffle());
//   };

//   // загружаем новый src перед автоплеем
//   useEffect(() => {
//     if (audioRef.current && currentTrack) {
//       audioRef.current.load();
//     }
//   }, [currentTrack]);

//   // Автоплей при готовности трека
//   useEffect(() => {
//     if (!audioRef.current || !currentTrack) return;

//     const audio = audioRef.current;

//     const handleCanPlay = () => {
//       audio
//         .play()
//         .then(() => dispatch(setIsPlay(true)))
//         .catch(() => {}); // Игнорируем
//     };

//     audio.addEventListener('canplay', handleCanPlay);

//     return () => {
//       audio.removeEventListener('canplay', handleCanPlay);
//     };
//   }, [currentTrack, dispatch]);

//   // Нереализованные кнопки
//   const notReady = () => alert('Еще не реализовано');

//   if (!currentTrack) return <></>;

//   return (
//     <div className={styles.bar}>
//       <audio
//         ref={audioRef}
//         src={currentTrack?.track_file}
//         style={{ display: 'none' }}
//         loop={true}
//         // onTimeUpdate={() => console.log(111)}
//         onTimeUpdate={onTimeUpdate}
//         onLoadedMetadata={onLoadedMetadata}
//         onEnded={() => console.log('NEXT track')}
//       />
//       <div className={styles.bar__content}>
//         {/* <div className={styles.bar__playerProgress}></div> */}
//         <ProgressBar
//           max={audioRef.current?.duration || 0}
//           step={0.1}
//           readOnly={!isLoadedTrack}
//           value={11} //реализовать состояние текущего времени
//           onChange={onChangeProgress}
//         />
//         <div className={styles.bar__playerBlock}>
//           <div className={styles.bar__player}>
//             <div className={styles.player__controls}>
//               <div className={styles.player__btnPrev} onClick={notReady}>
//                 <svg className={styles.player__btnPrevSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
//                 </svg>
//               </div>

//               {isPlay ? (
//                 <div className={classNames(styles.btn)} onClick={pauseTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
//                   </svg>
//                 </div>
//               ) : (
//                 <div className={classNames(styles.btn)} onClick={playTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-play" />
//                   </svg>
//                 </div>
//               )}
//               {/* // реализовать логику, в которой при проигровании последнего трека, нажимая на следующий трек, ничего не происходит */}
//               <div className={styles.player__btnNext} onClick={onNextTrack}>
//                 <svg className={styles.player__btnNextSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
//                 </svg>
//               </div>

//               <div
//                 className={classNames(styles.player__btnRepeat, styles.btnIcon)}
//                 onClick={loopTrack} // состояние при котором иконка активна, белым цветом
//               >
//                 <svg className={styles.player__btnRepeatSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
//                 </svg>
//               </div>

//               <div
//                 className={classNames(
//                   styles.player__btnShuffle,
//                   styles.btnIcon,
//                 )}
//                 onClick={onToggleShuffle}
//               >
//                 <svg className={styles.player__btnShuffleSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
//                 </svg>
//               </div>
//             </div>

//             <div className={styles.player__trackPlay}>
//               <div className={styles.trackPlay__contain}>
//                 <div className={styles.trackPlay__image}>
//                   <svg className={styles.trackPlay__svg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>

//                 <div className={styles.trackPlay__author}>
//                   {currentTrack.name}
//                 </div>

//                 <div className={styles.trackPlay__album}>
//                   {currentTrack.author}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.bar__volumeBlock}>
//             <div className={styles.volume__content}>
//               <div className={styles.volume__image}>
//                 <svg className={styles.volume__svg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
//                 </svg>
//               </div>

//               <input
//                 className={classNames(styles.volume__progressLine, styles.btn)}
//                 type="range"
//                 name="range"
//                 onChange={(e) => {
//                   //превести к правельному виду
//                   setVolume(Number(e.target.value));
//                   if (audioRef.current)
//                     audioRef.current.volume = Number(e.target.value) / 100;
//                   console.log(Number(e.target.value));
//                 }}
//                 // onChange={(e) => {
//                 //   if (audioRef.current) {
//                 //     audioRef.current.volume = Number(e.target.value) / 100;
//                 //   }
//                 // }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';
// // import Link from 'next/link';

// import styles from './bar.module.css';
// import classnames from 'classnames';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { useRef, useEffect } from 'react';
// import { setIsPlay } from '@/store/features/trackSlice';

// export default function Bar() {
//   const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
//   const isPlay = useAppSelector((state) => state.tracks.isPlay);
//   const dispatch = useAppDispatch();

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   // console.log(currentTrack);

//   const playTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       dispatch(setIsPlay(true));
//     }
//   };

//   const pauseTrack = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       dispatch(setIsPlay(false));
//     }
//   };

//   // загружаем новый src перед автоплеем
//   useEffect(() => {
//     if (audioRef.current && currentTrack) {
//       audioRef.current.load();
//     }
//   }, [currentTrack]);

//   // Автоплей при готовности трека
//   useEffect(() => {
//     if (!audioRef.current || !currentTrack) return;

//     const audio = audioRef.current;

//     const handleCanPlay = () => {
//       audio
//         .play()
//         .then(() => dispatch(setIsPlay(true)))
//         .catch(() => {}); // Игнорируем
//     };

//     audio.addEventListener('canplay', handleCanPlay);

//     return () => {
//       audio.removeEventListener('canplay', handleCanPlay);
//     };
//   }, [currentTrack, dispatch]);

//   // Нереализованные кнопки
//   const notReady = () => alert('Еще не реализовано');

//   if (!currentTrack) return <></>;

//   return (
//     <div className={styles.bar}>
//       {/* <audio controls src={currentTrack?.track_file}></audio> */}
//       {/* <audio ref={audioRef} controls src={currentTrack?.track_file}></audio> */}
//       <audio
//         ref={audioRef}
//         src={currentTrack?.track_file}
//         style={{ display: 'none' }}
//       />
//       <div className={styles.bar__content}>
//         <div className={styles.bar__playerProgress}></div>
//         <div className={styles.bar__playerBlock}>
//           <div className={styles.bar__player}>
//             <div className={styles.player__controls}>
//               <div className={styles.player__btnPrev} onClick={notReady}>
//                 <svg className={styles.player__btnPrevSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
//                 </svg>
//               </div>

//               {isPlay ? (
//                 <div className={classnames(styles.btn)} onClick={pauseTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
//                   </svg>
//                 </div>
//               ) : (
//                 <div className={classnames(styles.btn)} onClick={playTrack}>
//                   <svg className={styles.player__btnPlaySvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-play" />
//                   </svg>
//                 </div>
//               )}

//               <div className={styles.player__btnNext} onClick={notReady}>
//                 <svg className={styles.player__btnNextSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
//                 </svg>
//               </div>

//               <div
//                 className={classnames(styles.player__btnRepeat, styles.btnIcon)}
//                 onClick={notReady}
//               >
//                 <svg className={styles.player__btnRepeatSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
//                 </svg>
//               </div>

//               <div
//                 className={classnames(
//                   styles.player__btnShuffle,
//                   styles.btnIcon,
//                 )}
//                 onClick={notReady}
//               >
//                 <svg className={styles.player__btnShuffleSvg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
//                 </svg>
//               </div>
//             </div>

//             <div className={styles.player__trackPlay}>
//               <div className={styles.trackPlay__contain}>
//                 <div className={styles.trackPlay__image}>
//                   <svg className={styles.trackPlay__svg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
//                   </svg>
//                 </div>

//                 <div className={styles.trackPlay__author}>
//                   {currentTrack.name}
//                 </div>

//                 <div className={styles.trackPlay__album}>
//                   {currentTrack.author}
//                 </div>
//               </div>

//               {/* <div className={styles.trackPlay__dislike}>
//                 <div
//                   className={classnames(
//                     styles.player__btnShuffle,
//                     styles.btnIcon,
//                   )}
//                 >
//                   <svg className={styles.trackPlay__likeSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
//                   </svg>
//                 </div>
//                 <div
//                   className={classnames(
//                     styles.trackPlay__dislike,
//                     styles.btnIcon,
//                   )}
//                 >
//                   <svg className={styles.trackPlay__dislikeSvg}>
//                     <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
//                   </svg>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//           <div className={styles.bar__volumeBlock}>
//             <div className={styles.volume__content}>
//               <div className={styles.volume__image}>
//                 <svg className={styles.volume__svg}>
//                   <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
//                 </svg>
//               </div>

//               <input
//                 type="range"
//                 className={styles.volume__progressLine}
//                 onChange={(e) => {
//                   if (audioRef.current) {
//                     audioRef.current.volume = Number(e.target.value) / 100;
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
