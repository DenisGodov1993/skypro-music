import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReduxProvider from '@/store/ReduxProvider';
import Filter from '@/components/Filter/Filter';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';

const mockTracks: TrackType[] = data;

describe('Filter component', () => {
  test('Отображение кнопок фильтров', () => {
    render(
      <ReduxProvider>
        <Filter
          title={['исполнителю', 'жанру', 'году выпуска']}
          tracks={mockTracks}
        />
      </ReduxProvider>,
    );

    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
  });

  test('Отображение списка авторов при клике на фильтр исполнителю', async () => {
    render(
      <ReduxProvider>
        <Filter
          title={['исполнителю', 'жанру', 'году выпуска']}
          tracks={mockTracks}
        />
      </ReduxProvider>,
    );

    const authorFilterButton = screen.getByText('исполнителю');
    await userEvent.click(authorFilterButton);

    // Проверяем, что первый автор из данных отображается
    expect(screen.getByText(mockTracks[0].author)).toBeInTheDocument();
  });

  test('Отображение жанров при клике на фильтр жанру', async () => {
    render(
      <ReduxProvider>
        <Filter
          title={['исполнителю', 'жанру', 'году выпуска']}
          tracks={mockTracks}
        />
      </ReduxProvider>,
    );

    const genreFilterButton = screen.getByText('жанру');
    await userEvent.click(genreFilterButton);

    expect(screen.getByText(mockTracks[0].genre[0])).toBeInTheDocument();
  });
});

// интеграционные тесты
// import { render, screen, fireEvent } from '@testing-library/react';
// import Filter from '@/components/Filter/Filter';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { trackSliceReducer } from '@/store/features/trackSlice';

// const tracks = [
//   {
//     _id: 1,
//     name: 'Song A',
//     author: 'Author1',
//     genre: ['pop'],
//     release_date: '2020-01-01',
//     duration_in_seconds: 180,
//     album: 'Album1',
//     logo: null,
//     track_file: '',
//     stared_user: [],
//   },
//   {
//     _id: 2,
//     name: 'Song B',
//     author: 'Author2',
//     genre: ['rock'],
//     release_date: '2021-01-01',
//     duration_in_seconds: 200,
//     album: 'Album2',
//     logo: null,
//     track_file: '',
//     stared_user: [],
//   },
// ];

// const renderWithStore = (component: React.ReactNode) => {
//   const store = configureStore({ reducer: { tracks: trackSliceReducer } });
//   return render(<Provider store={store}>{component}</Provider>);
// };

// describe('Filter component', () => {
//   it('renders filter buttons', () => {
//     renderWithStore(
//       <Filter
//         title={['исполнителю', 'жанру', 'году выпуска']}
//         tracks={tracks}
//       />,
//     );
//     expect(screen.getByText('исполнителю')).toBeInTheDocument();
//     expect(screen.getByText('жанру')).toBeInTheDocument();
//     expect(screen.getByText('году выпуска')).toBeInTheDocument();
//   });

//   it('dispatches action on author click', () => {
//     const store = configureStore({ reducer: { tracks: trackSliceReducer } });
//     render(
//       <Provider store={store}>
//         <Filter title={['исполнителю']} tracks={tracks} />
//       </Provider>,
//     );

//     fireEvent.click(screen.getByText('исполнителю'));
//     fireEvent.click(screen.getByText('Author1'));
//     expect(store.getState().tracks.filters.authors).toContain('Author1');
//   });
// });
