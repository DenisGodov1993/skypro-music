import { TrackType } from '@sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
    currentTrack: null | TrackType;
    isPlay: boolean;
};

const initialState: initialStateType = {
    currentTrack: null,
    isPlay: false,
};

const trackSlice = createSlice({
    name: 'tacks',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
            state.currentTrack = action.payload;
        },
        setIsPlay: (state, action: PayloadAction<boolean>) => {
            state.isPlay = action.payload;
        },
    },
});

// export const { setCurrentTrack } = trackSlice.actions;
export const { setCurrentTrack, setIsPlay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;

// import { TrackType } from '@sharedTypes/sharedTypes';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type initialStateType = {
//     currentTrack: null | TrackType;
// };

// const initialState: initialStateType = {
//     currentTrack: null,
// };

// const trackSlice = createSlice({
//     name: 'tacks',
//     initialState,
//     reducers: {
//         setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//             state.currentTrack = action.payload;
//         },
//     },
// });

// export const { setCurrentTrack } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;



// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TrackType } from '@/sharedTypes/types';

// type initialStateType = {
//   currentTrack: TrackType | null;
// };

// const initialState: initialStateType = {
//   currentTrack: null,
// };

// const trackSlice = createSlice({
//   name: 'tracks',  
//   initialState,  
//   reducers: {
//     setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
//     state.currentTrack = action.payload;    
//     },  
//   },
// });

// export const { setCurrentTrack } = trackSlice.actions;
// export const trackSliceReducer = trackSlice.reducer;