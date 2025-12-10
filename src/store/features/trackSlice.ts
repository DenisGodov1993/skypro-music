import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
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
  name: 'tacks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },

    // setNextTrack: (state) => {
    //   const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
    //   const curIndex = list.findIndex(
    //     (el) => el._id === state.currentTrack?._id,
    //   );
    //   const next = curIndex + 1;

    //   if (next < list.length) {
    //     state.currentTrack = list[next];
    //   }
    // },

    setNextTrack: (state) => {
      const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'next');
    },

    // setPrevTrack: (state) => {
    //   const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;

    //   const curIndex = list.findIndex(
    //     (el) => el._id === state.currentTrack?._id,
    //   );
    //   const prev = curIndex - 1;

    //   if (prev >= 0) {
    //     state.currentTrack = list[prev];
    //   }
    // },

    setPrevTrack: (state) => {
      const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      state.currentTrack = getNextOrPrevTrack(list, state.currentTrack, 'prev');
    },

    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },

    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
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
  setFetchError,
  setFetchIsLoading,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@sharedTypes/sharedTypes';

// type initialStateType = {
//   currentTrack: TrackType | null;
//   isPlay: boolean;
//   playlist: TrackType[];
//   shuffledPlaylist: TrackType[];
//   isShuffle: boolean;
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
//   playlist: [],
//   shuffledPlaylist: [],
//   isShuffle: false,
// };

// const trackSlice = createSlice({
//   name: 'tacks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//     },
//     setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
//       state.playlist = action.payload;
//       state.shuffledPlaylist = [...state.playlist].sort(
//         () => Math.random() - 0.5,
//       );
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//     toggleShuffle: (state) => {
//       state.isShuffle = !state.isShuffle;
//     },

//     setNextTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;
//       const curIndex = list.findIndex(
//         (el) => el._id === state.currentTrack?._id,
//       );
//       const next = curIndex + 1;

//       if (next < list.length) {
//         state.currentTrack = list[next];
//       }
//     },

//     setPrevTrack: (state) => {
//       const list = state.isShuffle ? state.shuffledPlaylist : state.playlist;

//       const curIndex = list.findIndex(
//         (el) => el._id === state.currentTrack?._id,
//       );
//       const prev = curIndex - 1;

//       if (prev >= 0) {
//         state.currentTrack = list[prev];
//       }
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
// } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;