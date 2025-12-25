import { applyFilters } from '@/utils/applyFilters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@sharedTypes/sharedTypes';

export type SortType = 'default' | 'author' | 'year_new' | 'year_old';

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  isShuffle: boolean;
  fetchError: null | string;
  fetchIsLoading: boolean;
  pagePlaylist: TrackType[];
  filteredTracks: TrackType[];
  filters: {
    authors: string[];
    genres: string[];
    years: string[];
    search: string;
    sort: SortType;
  };
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  isShuffle: false,
  fetchError: null,
  fetchIsLoading: true,
  pagePlaylist: [],
  filteredTracks: [],
  filters: {
    authors: [],
    genres: [],
    years: [],
    search: '',
    sort: 'default',
  },
};

// Вспомогательная функция для подучения следующего или предыдущего трека
const getNextOrPrevTrack = (
  playlist: TrackType[],
  currentTrack: TrackType | null,
  direction: 'next' | 'prev',
): TrackType | null => {
  if (!currentTrack) return null;

  const currIdx = playlist.findIndex((el) => el._id === currentTrack._id);
  if (currIdx === -1) return null;

  const newIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
  if (newIdx < 0 || newIdx >= playlist.length) return null;

  return playlist[newIdx];
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setNextTrack: (state) => {
      const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'next');
    },
    setPrevTrack: (state) => {
      const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'prev');
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<number>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (t) => t._id !== action.payload,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      state.filters.authors = state.filters.authors.includes(author)
        ? state.filters.authors.filter((a) => a !== author)
        : [...state.filters.authors, author];
      state.filteredTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      state.filters.genres = state.filters.genres.includes(genre)
        ? state.filters.genres.filter((g) => g !== genre)
        : [...state.filters.genres, genre];
      state.filteredTracks = applyFilters(state);
    },
    // setFilterYears: (state, action: PayloadAction<string>) => {
    //   const year = action.payload;
    //   state.filters.years = state.filters.years.includes(year)
    //     ? state.filters.years.filter((y) => y !== year)
    //     : [...state.filters.years, year];
    //   state.filteredTracks = applyFilters(state);
    // },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.filters.sort = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    resetFilters: (state) => {
      state.filters = {
        authors: [],
        genres: [],
        search: '',
        years: [],
        sort: 'default',
      };
      state.filteredTracks = state.pagePlaylist;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  setAllTracks,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFetchError,
  setFetchIsLoading,
  setPagePlaylist,
  setFilterAuthors,
  setFilterGenres,
  // setFilterYears,
  setSearch,
  setSort,
  resetFilters,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;

// сортировка отдельно по годам
// import { applyFilters } from '@/utils/applyFilters';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@sharedTypes/sharedTypes';

// export type initialStateType = {
//   currentTrack: TrackType | null;
//   isPlay: boolean;
//   playlist: TrackType[];
//   shuffledPlaylist: TrackType[];
//   allTracks: TrackType[];
//   favoriteTracks: TrackType[];
//   isShuffle: boolean;
//   fetchError: null | string;
//   fetchIsLoading: boolean;
//   pagePlaylist: TrackType[];
//   filteredTracks: TrackType[];
//   filters: {
//     authors: string[];
//     genres: string[];
//     years: string[];
//     search: string;
//     sort: 'default' | 'author' | 'year';
//   };
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
//   playlist: [],
//   shuffledPlaylist: [],
//   allTracks: [],
//   favoriteTracks: [],
//   isShuffle: false,
//   fetchError: null,
//   fetchIsLoading: true,
//   pagePlaylist: [],
//   filteredTracks: [],
//   filters: {
//     authors: [],
//     genres: [],
//     years: [],
//     search: '',
//     sort: 'default',
//   },
// };

// // Вспомогательная функция для подучения следующего или предыдущего трека
// const getNextOrPrevTrack = (
//   playlist: TrackType[],
//   currentTrack: TrackType | null,
//   direction: 'next' | 'prev',
// ): TrackType | null => {
//   if (!currentTrack) return null;

//   const currIdx = playlist.findIndex((el) => el._id === currentTrack._id);
//   if (currIdx === -1) return null;

//   const newIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
//   if (newIdx < 0 || newIdx >= playlist.length) return null;

//   return playlist[newIdx];
// };

// const trackSlice = createSlice({
//   name: 'tracks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//     toggleShuffle: (state) => {
//       state.isShuffle = !state.isShuffle;
//     },
//     setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
//       state.playlist = action.payload;
//       state.shuffledPlaylist = [...state.playlist].sort(
//         () => Math.random() - 0.5,
//       );
//     },
//     setNextTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'next');
//     },
//     setPrevTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'prev');
//     },
//     setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
//       state.allTracks = action.payload;
//     },
//     setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
//       state.favoriteTracks = action.payload;
//     },
//     addLikedTracks: (state, action: PayloadAction<TrackType>) => {
//       state.favoriteTracks = [...state.favoriteTracks, action.payload];
//     },
//     removeLikedTracks: (state, action: PayloadAction<number>) => {
//       state.favoriteTracks = state.favoriteTracks.filter(
//         (t) => t._id !== action.payload,
//       );
//     },
//     setFetchError: (state, action: PayloadAction<string>) => {
//       state.fetchError = action.payload;
//     },
//     setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
//       state.fetchIsLoading = action.payload;
//     },
//     setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
//       state.pagePlaylist = action.payload;
//       state.filteredTracks = applyFilters(state);
//     },
//     setFilterAuthors: (state, action: PayloadAction<string>) => {
//       const author = action.payload;
//       state.filters.authors = state.filters.authors.includes(author)
//         ? state.filters.authors.filter((a) => a !== author)
//         : [...state.filters.authors, author];
//       state.filteredTracks = applyFilters(state);
//     },
//     setFilterGenres: (state, action: PayloadAction<string>) => {
//       const genre = action.payload;
//       state.filters.genres = state.filters.genres.includes(genre)
//         ? state.filters.genres.filter((g) => g !== genre)
//         : [...state.filters.genres, genre];
//       state.filteredTracks = applyFilters(state);
//     },
//     setFilterYears: (state, action: PayloadAction<string>) => {
//       const year = action.payload;
//       state.filters.years = state.filters.years.includes(year)
//         ? state.filters.years.filter((y) => y !== year)
//         : [...state.filters.years, year];
//       state.filteredTracks = applyFilters(state);
//     },
//     setSearch: (state, action: PayloadAction<string>) => {
//       state.filters.search = action.payload;
//       state.filteredTracks = applyFilters(state);
//     },
//     setSort: (state, action: PayloadAction<'default' | 'author' | 'year'>) => {
//       state.filters.sort = action.payload;
//       state.filteredTracks = applyFilters(state);
//     },
//     resetFilters: (state) => {
//       state.filters = {
//         authors: [],
//         genres: [],
//         years: [],
//         search: '',
//         sort: 'default',
//       };
//       state.filteredTracks = state.pagePlaylist;
//     },
//   },
// });

// export const {
//   setCurrentTrack,
//   setIsPlay,
//   setCurrentPlaylist,
//   setNextTrack,
//   setPrevTrack,
//   toggleShuffle,
//   setAllTracks,
//   setFavoriteTracks,
//   addLikedTracks,
//   removeLikedTracks,
//   setFetchError,
//   setFetchIsLoading,
//   setPagePlaylist,
//   setFilterAuthors,
//   setFilterGenres,
//   setFilterYears,
//   setSearch,
//   setSort,
//   resetFilters,
// } = trackSlice.actions;

// export const trackSliceReducer = trackSlice.reducer;

// переходный вариант
// import { applyFilters } from '@/utils/applyFilters';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@sharedTypes/sharedTypes';

// export type initialStateType = {
//   currentTrack: TrackType | null;
//   isPlay: boolean;
//   playlist: TrackType[];
//   shuffledPlaylist: TrackType[];
//   allTracks: TrackType[];
//   favoriteTracks: TrackType[];
//   isShuffle: boolean;
//   fetchError: null | string;
//   fetchIsLoading: boolean;
//   pagePlaylist: TrackType[];
//   filteredTracks: TrackType[];
//   filters: {
//     authors: string[];
//     genres: string[];
//     years: string[];
//   };
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
//   playlist: [],
//   shuffledPlaylist: [],
//   allTracks: [],
//   favoriteTracks: [],
//   isShuffle: false,
//   fetchError: null,
//   fetchIsLoading: true,
//   pagePlaylist: [],
//   filteredTracks: [],
//   filters: {
//     authors: [],
//     genres: [],
//     years: [],
//   },
// };

// // Вспомогательная функция для подучения следующего или предыдущего трека
// const getNextOrPrevTrack = (
//   playlist: TrackType[],
//   currentTrack: TrackType | null,
//   direction: 'next' | 'prev',
// ): TrackType | null => {
//   if (!currentTrack) return null;

//   const currIdx = playlist.findIndex((el) => el._id === currentTrack._id);
//   if (currIdx === -1) return null;

//   const newIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
//   if (newIdx < 0 || newIdx >= playlist.length) return null;

//   return playlist[newIdx];
// };

// const trackSlice = createSlice({
//   name: 'tracks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//     toggleShuffle: (state) => {
//       state.isShuffle = !state.isShuffle;
//     },
//     setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
//       state.playlist = action.payload;
//       state.shuffledPlaylist = [...state.playlist].sort(
//         () => Math.random() - 0.5,
//       );
//     },
//     setNextTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'next');
//     },
//     setPrevTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'prev');
//     },
//     setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
//       state.allTracks = action.payload;
//     },
//     setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
//       state.favoriteTracks = action.payload;
//     },
//     addLikedTracks: (state, action: PayloadAction<TrackType>) => {
//       state.favoriteTracks = [...state.favoriteTracks, action.payload];
//     },
//     removeLikedTracks: (state, action: PayloadAction<number>) => {
//       state.favoriteTracks = state.favoriteTracks.filter(
//         (t) => t._id !== action.payload,
//       );
//     },
//     setFetchError: (state, action: PayloadAction<string>) => {
//       state.fetchError = action.payload;
//     },
//     setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
//       state.fetchIsLoading = action.payload;
//     },
//     setPagePlaylist: (state, action) => {
//       state.pagePlaylist = action.payload;
//     },
//     setFilterAuthors: (state, action: PayloadAction<string>) => {
//       const author = action.payload;
//       if (state.filters.authors.includes(author)) {
//         state.filters.authors = state.filters.authors.filter((el) => {
//           return el !== author;
//         });
//       } else {
//         state.filters.authors = [...state.filters.authors, author];
//       }

//       state.filteredTracks = applyFilters(state);
//     },
//     setFilterGenres: (state, action: PayloadAction<string>) => {
//       const genres = action.payload;
//       if (state.filters.genres.includes(genres)) {
//         state.filters.genres = state.filters.genres.filter((el) => {
//           return el !== genres;
//         });
//       } else {
//         state.filters.genres = [...state.filters.genres, genres];
//       }

//       state.filteredTracks = state.filteredTracks = applyFilters(state);
//     },
//   },
// });

// export const {
//   setCurrentTrack,
//   setIsPlay,
//   setCurrentPlaylist,
//   setNextTrack,
//   setPrevTrack,
//   toggleShuffle,
//   setAllTracks,
//   setFavoriteTracks,
//   addLikedTracks,
//   removeLikedTracks,
//   setFetchError,
//   setFetchIsLoading,
//   setPagePlaylist,
//   setFilterAuthors,
//   setFilterGenres,
// } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;

// рабочий вариант
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@sharedTypes/sharedTypes';

// type initialStateType = {
//   currentTrack: TrackType | null;
//   isPlay: boolean;
//   playlist: TrackType[];
//   shuffledPlaylist: TrackType[];
//   allTracks: TrackType[];
//   favoriteTracks: TrackType[];
//   isShuffle: boolean;
//   fetchError: null | string;
//   fetchIsLoading: boolean;
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
//   playlist: [],
//   shuffledPlaylist: [],
//   allTracks: [],
//   favoriteTracks: [],
//   isShuffle: false,
//   fetchError: null,
//   fetchIsLoading: true,
// };

// // Вспомогательная функция для подучения следующего или предыдущего трека
// const getNextOrPrevTrack = (
//   playlist: TrackType[],
//   currentTrack: TrackType | null,
//   direction: 'next' | 'prev',
// ): TrackType | null => {
//   if (!currentTrack) return null;

//   const currIdx = playlist.findIndex((el) => el._id === currentTrack._id);
//   if (currIdx === -1) return null;

//   const newIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
//   if (newIdx < 0 || newIdx >= playlist.length) return null;

//   return playlist[newIdx];
// };

// const trackSlice = createSlice({
//   name: 'tracks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//     toggleShuffle: (state) => {
//       state.isShuffle = !state.isShuffle;
//     },
//     setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
//       state.playlist = action.payload;
//       state.shuffledPlaylist = [...state.playlist].sort(
//         () => Math.random() - 0.5,
//       );
//     },
//     setNextTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'next');
//     },
//     setPrevTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'prev');
//     },
//     setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
//       state.allTracks = action.payload;
//     },
//     setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
//       state.favoriteTracks = action.payload;
//     },
//     addLikedTracks: (state, action: PayloadAction<TrackType>) => {
//       state.favoriteTracks = [...state.favoriteTracks, action.payload];
//     },
//     removeLikedTracks: (state, action: PayloadAction<number>) => {
//       state.favoriteTracks = state.favoriteTracks.filter(
//         (t) => t._id !== action.payload,
//       );
//     },
//     setFetchError: (state, action: PayloadAction<string>) => {
//       state.fetchError = action.payload;
//     },
//     setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
//       state.fetchIsLoading = action.payload;
//     },
//   },
// });

// export const {
//   setCurrentTrack,
//   setIsPlay,
//   setCurrentPlaylist,
//   setNextTrack,
//   setPrevTrack,
//   toggleShuffle,
//   setAllTracks,
//   setFavoriteTracks,
//   addLikedTracks,
//   removeLikedTracks,
//   setFetchError,
//   setFetchIsLoading,
// } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;
