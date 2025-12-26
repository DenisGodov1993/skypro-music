
import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import Track from '@/components/Track/Track';
import { formatTime } from '@/utils/helper';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );
    // Проверяем отображение автора
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    // Проверяем отображение названия трека
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    // Проверяем отображение длительности трека
    expect(
      screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});

// import { render, screen, fireEvent } from '@testing-library/react';
// import Track from '@/components/Track/Track';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { trackSliceReducer } from '@/store/features/trackSlice';
// import { data } from '@/data';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// const mockTracks: TrackType[] = data;
// const mockTrack: TrackType = data[0];

// const renderWithStore = (component: React.ReactNode) => {
//   const store = configureStore({ reducer: { tracks: trackSliceReducer } });
//   return { store, ...render(<Provider store={store}>{component}</Provider>) };
// };

// describe('Track component', () => {
//   it('renders track name and author', () => {
//     renderWithStore(<Track track={mockTrack} playlist={mockTracks} />);
//     expect(screen.getByText(mockTrack.name)).toBeInTheDocument();
//     expect(screen.getByText(mockTrack.author)).toBeInTheDocument();
//   });

//   it('clicking on track sets currentTrack and plays', () => {
//     const { store } = renderWithStore(
//       <Track track={mockTrack} playlist={mockTracks} />,
//     );

//     fireEvent.click(screen.getByText(mockTrack.name));
//     expect(store.getState().tracks.currentTrack?._id).toBe(mockTrack._id);
//     expect(store.getState().tracks.isPlay).toBe(true);
//   });
// });

// интеграционные тесты
// import { render, screen, fireEvent } from '@testing-library/react';
// import Track from '@/components/Track/Track';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { trackSliceReducer } from '@/store/features/trackSlice';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// const track: TrackType = {
//   _id: 1,
//   name: 'Song A',
//   author: 'Author A',
//   genre: ['pop'],
//   release_date: '2020-01-01',
//   duration_in_seconds: 180,
//   album: 'Album A',
//   logo: null,
//   track_file: '',
//   stared_user: [],
// };

// const playlist: TrackType[] = [track];

// const renderWithStore = (component: React.ReactNode) => {
//   const store = configureStore({ reducer: { tracks: trackSliceReducer } });
//   return render(<Provider store={store}>{component}</Provider>);
// };

// describe('Track component', () => {
//   it('renders track name and author', () => {
//     renderWithStore(<Track track={track} playlist={playlist} />);
//     expect(screen.getByText('Song A')).toBeInTheDocument();
//     expect(screen.getByText('Author A')).toBeInTheDocument();
//   });

//   it('dispatches setCurrentTrack when clicking on inactive track', () => {
//     const store = configureStore({ reducer: { tracks: trackSliceReducer } });
//     render(
//       <Provider store={store}>
//         <Track track={track} playlist={playlist} />
//       </Provider>,
//     );

//     fireEvent.click(screen.getByText('Song A'));
//     expect(store.getState().tracks.currentTrack?._id).toBe(track._id);
//     expect(store.getState().tracks.isPlay).toBe(true);
//   });
// });
