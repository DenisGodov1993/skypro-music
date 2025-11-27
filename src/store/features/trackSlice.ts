import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
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
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const curIndex = state.playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      const nextIndexTrack = curIndex + 1;
      state.currentTrack = playlist[nextIndexTrack];
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  toggleShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@sharedTypes/sharedTypes';

// type initialStateType = {
//   currentTrack: TrackType | null;
//   isPlay: boolean;
//   playlist: TrackType[];
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
//   playlist: [],
// };

// const trackSlice = createSlice({
//   name: 'tacks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//       // state.isPlay = true;
//     },
//     setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
//       state.playlist = action.payload;
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//     setNextTrack: (state) => {
//       if (state.currentTrack) {
//         const curIndex = state.playlist.findIndex(
//           (el) => el._id === state.currentTrack?._id,
//         );
//         const nextIndexTrack = curIndex + 1;
//         state.currentTrack = state.playlist[nextIndexTrack];
//       }
//     },
//   },
// });

// export const { setCurrentTrack, setIsPlay, setCurrentPlaylist, setNextTrack } =
//   trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@sharedTypes/sharedTypes';

// type initialStateType = {
//   currentTrack: TrackType | null;
//   isPlay: boolean;
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
// };

// const trackSlice = createSlice({
//   name: 'tacks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//       state.isPlay = true;
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//   },
// });

// export const { setCurrentTrack, setIsPlay } = trackSlice.actions;
// // export const { setCurrentTrack, setIsPlaying } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;

// import { TrackType } from '@sharedTypes/sharedTypes';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type initialStateType = {
//   currentTrack: null | TrackType;
//   isPlay: boolean;
// };

// const initialState: initialStateType = {
//   currentTrack: null,
//   isPlay: false,
// };

// const trackSlice = createSlice({
//   name: 'tacks',
//   initialState,
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//       state.currentTrack = action.payload;
//     },
//     setIsPlay: (state, action: PayloadAction<boolean>) => {
//       state.isPlay = action.payload;
//     },
//   },
// });

// // export const { setCurrentTrack } = trackSlice.actions;
// export const { setCurrentTrack, setIsPlay } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;
