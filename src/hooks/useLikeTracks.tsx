import { useState, useCallback } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReAuth } from '@/utils/withReAuth';
import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';

type UseLikeTrackReturn = {
  toggleLike: () => Promise<void>;
  isLike: boolean;
  isLoading: boolean;
  errorMsg: string | null;
};

export const useLikeTrack = (
  track: TrackType | null,
  isAuthReady: boolean,
): UseLikeTrackReturn => {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);
  const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //   const isLike = favoriteTracks.some((t) => t._id === track._id);

  // Если трек null, всегда возвращаем "не лайкнутый"
  const isLike = track
    ? favoriteTracks.some((t) => t._id === track._id)
    : false;

  //   const toggleLike = useCallback(async () => {
  //     if (!isAuthReady || !access || !refresh) {
  //       setErrorMsg('Необходимо войти в аккаунт');
  //       return;
  //     }

  //     if (isLoading) return;

  //     setIsLoading(true);
  //     setErrorMsg(null);

  const toggleLike = useCallback(async () => {
    if (!track) return; // если трек отсутствует, ничего не делаем
    if (!isAuthReady || !access || !refresh) {
      setErrorMsg('Необходимо войти в аккаунт');
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await withReAuth(
        (token) =>
          isLike ? removeLike(token, track._id) : addLike(token, track._id),
        refresh,
        dispatch,
        access,
      );

      if (isLike) {
        dispatch(removeLikedTracks(track._id));
      } else {
        dispatch(addLikedTracks(track));
      }
    } catch {
      setErrorMsg('Ошибка при изменении лайка');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthReady, access, refresh, isLike, track, dispatch, isLoading]);

  return {
    toggleLike,
    isLike,
    isLoading,
    errorMsg,
  };
};

// рабочий вариант
// import { useState, useCallback } from 'react';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import {
//   addLikedTracks,
//   removeLikedTracks,
// } from '@/store/features/trackSlice';

// export const useLikeTrack = (track: TrackType, isAuthReady: boolean) => {
//   const dispatch = useAppDispatch();
//   const { access, refresh } = useAppSelector((state) => state.auth);
//   const favoriteTracks = useAppSelector((state) => state.tracks.favoriteTracks);

//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const isLike = favoriteTracks.some((t) => t._id === track._id);

//   const toggleLike = useCallback(async () => {
//     if (!isAuthReady || !access || !refresh) {
//       setErrorMsg('Необходимо войти в аккаунт');
//       return;
//     }

//     if (isLoading) return;

//     setIsLoading(true);
//     setErrorMsg(null);

//     try {
//       await withReAuth(
//         (token) =>
//           isLike ? removeLike(token, track._id) : addLike(token, track._id),
//         refresh,
//         dispatch,
//         access,
//       );

//       if (isLike) {
//         dispatch(removeLikedTracks(track._id));
//       } else {
//         dispatch(addLikedTracks(track));
//       }
//     } catch {
//       setErrorMsg('Ошибка при изменении лайка');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [
//     isAuthReady,
//     access,
//     refresh,
//     isLike,
//     track,
//     dispatch,
//     isLoading,
//   ]);

//   return {
//     toggleLike,
//     isLike,
//     isLoading,
//     errorMsg,
//   };
// };

// import { useState, useCallback } from 'react';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
// import { AxiosError } from 'axios';

// export const useLikeTrack = (track: TrackType | null) => {
//   const dispatch = useAppDispatch();
//   const { favoriteTracks } = useAppSelector((s) => s.tracks);
//   const { access, refresh } = useAppSelector((s) => s.auth);

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);

//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

// //   const toggleLike = async () => {
// //     if (!track) {
// //       setErrorMsg('Трек не найден');
// //       return;
// //     }

//     const toggleLike = useCallback(async () => {
//    if (!track) {
//       setErrorMsg('Трек не найден');
//       return;
//     }
// }, [track, access, refresh, isLike]);

//     if (!access || !refresh) {
//       setErrorMsg('Необходимо войти в аккаунт');
//       return;
//     }

//     const apiAction = isLike ? removeLike : addLike;

//     setIsLoading(true);
//     setErrorMsg(null);

//     try {
//       // Проверяем access и обновляем через refresh при необходимости
//       await withReAuth(
//         (token) => apiAction(token, track._id),
//         refresh,
//         dispatch,
//         access
//       );

//       // Обновляем Redux
//       if (isLike) {
//         dispatch(removeLikedTracks(track._id));
//       } else {
//         dispatch(addLikedTracks(track));
//       }
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         setErrorMsg(
//           (error.response?.data as { message?: string })?.message ?? 'Ошибка сервера'
//         );
//       } else if (error instanceof Error) {
//         setErrorMsg(error.message);
//       }
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLike,
//     toggleLike,
//     isLoading,
//     errorMsg,
//   };
// };

// рабочий вариант
// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import {
//   addLikedTracks,
//   removeLikedTracks,
// } from '@/store/features/trackSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { AxiosError } from 'axios';
// import { useState } from 'react';

// export const useLikeTrack = (track: TrackType | null) => {
//   const dispatch = useAppDispatch();
//   const { favoriteTracks } = useAppSelector((s) => s.tracks);
//   const { access, refresh } = useAppSelector((s) => s.auth);

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);

//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const toggleLike = async () => {
//     if (!track || !refresh) {
//       setErrorMsg('Необходимо войти в аккаунт');
//       return;
//     }

//     const apiAction = isLike ? removeLike : addLike;
//     const reduxAction = isLike
//       ? () => dispatch(removeLikedTracks(track._id))
//       : () => dispatch(addLikedTracks(track));

//     setIsLoading(true);
//     setErrorMsg(null);

//     try {
//       await withReAuth(
//         (token) => apiAction(token, track._id),
//         refresh,
//         dispatch,
//         access,
//       );

//       reduxAction();
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         setErrorMsg(
//           (error.response?.data as { message?: string })?.message ??
//             'Ошибка сервера',
//         );
//       } else if (error instanceof Error) {
//         setErrorMsg(error.message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLike,
//     toggleLike,
//     isLoading,
//     errorMsg,
//   };
// };

// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { AxiosError } from 'axios';
// import { useState } from 'react';

// type returnTypeHook = {
//   isLoading: boolean;
//   errorMsg: string | null;
//   toggleLike: () => void;
//   isLike: boolean;
// };

// export const useLikeTrack = (
//   track: TrackType | null,
//   isAuthReady: boolean,
// ): returnTypeHook => {
//   const dispatch = useAppDispatch();
//   const { favoriteTracks } = useAppSelector((state) => state.tracks);
//   const { access, refresh } = useAppSelector((state) => state.auth);

//   //   const [isClient, setIsClient] = useState(false);
//   //   useEffect(() => setIsClient(true), []);

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const toggleLike = () => {
//     if (!isAuthReady || !access || !refresh || !track) {
//       setErrorMsg('Нет авторизации');
//       return;
//     }

//     const actionApi = isLike ? removeLike : addLike;
//     const actionSlice = isLike
//       ? () => dispatch(removeLikedTracks(track._id))
//       : () => dispatch(addLikedTracks(track));

//     setIsLoading(true);
//     setErrorMsg(null);

//     // withReAuth(
//     //   (newToken) => actionApi(newToken || access, track._id),
//     //   refresh,
//     //   dispatch,
//     // )
//     withReAuth(
//       (token) => actionApi(token, track._id),
//       refresh,
//       dispatch,
//       access,
//     )
//       .then(() => {
//         actionSlice();
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError && error.response) {
//           setErrorMsg(error.response.data.message || 'Ошибка сервера');
//         } else if (error instanceof Error) {
//           setErrorMsg(error.message);
//         } else {
//           setErrorMsg('Неизвестная ошибка');
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return {
//     isLoading,
//     errorMsg,
//     toggleLike,
//     isLike,
//   };
// };

// рабочий вариант
// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { AxiosError } from 'axios';
// import { useState } from 'react';

// type returnTypeHook = {
//   isLoading: boolean;
//   errorMsg: string | null;
//   toggleLike: () => void;
//   isLike: boolean;
// };

// export const useLikeTrack = (
//   track: TrackType | null,
//   isAuthReady: boolean,
// ): returnTypeHook => {
//   const dispatch = useAppDispatch();
//   const { favoriteTracks } = useAppSelector((state) => state.tracks);
//   const { access, refresh } = useAppSelector((state) => state.auth);

//   //   const [isClient, setIsClient] = useState(false);
//   //   useEffect(() => setIsClient(true), []);

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const toggleLike = () => {
//     if (!isAuthReady || !access || !refresh || !track) {
//       setErrorMsg('Нет авторизации');
//       return;
//     }

//     const actionApi = isLike ? removeLike : addLike;
//     const actionSlice = isLike
//       ? () => dispatch(removeLikedTracks(track._id))
//       : () => dispatch(addLikedTracks(track));

//     setIsLoading(true);
//     setErrorMsg(null);

//     withReAuth(
//       (newToken) => actionApi(newToken || access, track._id),
//       refresh,
//       dispatch,
//     )
//       .then(() => {
//         actionSlice();
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError && error.response) {
//           setErrorMsg(error.response.data.message || 'Ошибка сервера');
//         } else if (error instanceof Error) {
//           setErrorMsg(error.message);
//         } else {
//           setErrorMsg('Неизвестная ошибка');
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return {
//     isLoading,
//     errorMsg,
//     toggleLike,
//     isLike,
//   };
// };

// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { AxiosError } from 'axios';
// import { useState } from 'react';

// type returnTypeHook = {
//   isLoading: boolean;
//   errorMsg: string | null;
//   toggleLike: () => void;
//   isLike: boolean;
// };

// export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
//   const { favoriteTracks } = useAppSelector((state) => state.tracks);
//   const { access, refresh } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const toggleLike = () => {
//     if (!access || !refresh) {
//       setErrorMsg('Нет авторизации');
//       return;
//     }

//     if (!track) return;

//     const actionApi = isLike ? removeLike : addLike;
//     const actionSlice = isLike
//       ? () => dispatch(removeLikedTracks(track._id))
//       : () => dispatch(addLikedTracks(track));

//     setIsLoading(true);
//     setErrorMsg(null);

//     withReAuth(
//       (newToken) => actionApi(newToken || access, track._id),
//       access,
//       refresh,
//       dispatch,
//     )
//       .then(() => {
//         actionSlice();
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setErrorMsg(error.response.data.message);
//           } else if (error.request) {
//             setErrorMsg('Произошла ошибка. Попробуйте позже');
//           } else {
//             setErrorMsg('Неизвестная ошибка');
//           }
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return {
//     isLoading,
//     errorMsg,
//     toggleLike,
//     isLike,
//   };
// };

// import { addLike, removeLike } from '@/services/tracks/tracksApi';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { withReAuth } from '@/utils/withReAuth';
// import { AxiosError } from 'axios';
// import { useState } from 'react';

// type returnTypeHook = {
//   isLoading: boolean;
//   errorMsg: string | null;
//   toggleLike: () => void;
//   isLike: boolean;
// };

// export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
//   const { favoriteTracks } = useAppSelector((state) => state.tracks);
//   const { access, refresh } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const toggleLike = () => {
//     if (!access) {
//       return setErrorMsg('Нет авторизации');
//     }

//     // const actionApi = isLike ? removeLike : addLike;
//     // const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

//     // const actionApi = isLike ? addLike : addLike;
//     // const actionSlice = isLike ? addLikedTracks : addLikedTracks;

//     const actionApi = isLike ? removeLike : addLike;
//     const actionSlice = isLike
//       ? () => dispatch(removeLikedTracks(track._id))
//       : () => dispatch(addLikedTracks(track));

//     setIsLoading(true);
//     setErrorMsg(null);
//     if (track) {
//       withReAuth(
//         (newToken) => actionApi(newToken || access, track._id),
//         refresh,
//         dispatch,
//       )
//         // .then(() => {
//         //   dispatch(actionSlice(track));
//         // })
//         .then(() => {
//           actionSlice();
//         })
//         .catch((error) => {
//           if (error instanceof AxiosError) {
//             if (error.response) {
//               setErrorMsg(error.response.data.message);
//             } else if (error.request) {
//               setErrorMsg('Произошла ошибка. Попробуйте позже');
//             } else {
//               setErrorMsg('Неизвестная ошибка');
//             }
//           }
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   };

//   return {
//     isLoading,
//     errorMsg,
//     toggleLike,
//     isLike,
//   };
// };

// import { addLike } from "@/services/tracks/tracksApi";
// import { TrackType } from "@/sharedTypes/sharedTypes";
// import { addLikedTracks } from "@/store/features/trackSlice";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { withReAuth } from "@/utils/withReAuth";
// import { AxiosError } from "axios";
// import { useState } from "react";

// type returnTypeHook = {
//   isLoading: boolean;
//   errorMsg: string | null;
//   toggleLike: () => void;
//   isLike: boolean;
// };

// export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
//   const { favoriteTracks } = useAppSelector((state) => state.tracks);
//   const { access, refresh } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();

//   const isLike = favoriteTracks.some((t) => t._id === track?._id);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const toggleLike = () => {
//     if (!access) {
//       return setErrorMsg('Нет авторизации');
//     }

//     // const actionApi = isLike ? removeLike : addLike;
//     // const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

//     const actionApi = isLike ? addLike : addLike;
//     const actionSlice = isLike ? addLikedTracks : addLikedTracks;

//     setIsLoading(true);
//     setErrorMsg(null);
//     if (track) {
//       withReAuth(
//         (newToken) => actionApi(newToken || access, track._id),
//         refresh,
//         dispatch,
//       )
//         .then(() => {
//           dispatch(actionSlice(track));
//         })
//         .catch((error) => {
//           if (error instanceof AxiosError) {
//             if (error.response) {
//               setErrorMsg(error.response.data.message);
//             } else if (error.request) {
//               setErrorMsg('Произошла ошибка. Попробуйте позже');
//             } else {
//               setErrorMsg('Неизвестная ошибка');
//             }
//           }
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   };

//   return {
//     isLoading,
//     errorMsg,
//     toggleLike,
//     isLike,
//   };
// };
