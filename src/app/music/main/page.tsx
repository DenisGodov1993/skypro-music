'use client';

import MusicLayout from '@/app/music/MusicLayout';
import Centerblock from '@/components/Centerblock/Centerblock';
import { setPagePlaylist, resetFilters } from '@/store/features/trackSlice';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setPagePlaylist(allTracks));
      dispatch(resetFilters());
    }
  }, [allTracks, dispatch]);

  return (
    <MusicLayout>
      <Centerblock
        tracks={allTracks} 
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        itemName="Треки"
      />
    </MusicLayout>
  );
}


// 'use client';

// import MusicLayout from '@/app/music/MusicLayout';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import { setPagePlaylist, resetFilters } from '@/store/features/trackSlice';

// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';

// export default function Home() {
//   const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
//     (state) => state.tracks
//   );
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (allTracks.length) {
//       // Записываем все треки страницы в Redux
//       dispatch(setPagePlaylist(allTracks));
//       // Сбрасываем фильтры, чтобы на новой странице все фильтры были чистые
//       dispatch(resetFilters());
//     }
//   }, [allTracks, dispatch]);

//   return (
//     <MusicLayout>
//       <Centerblock
//         tracks={allTracks} // Centerblock берёт треки из Redux фильтров
//         isLoading={fetchIsLoading}
//         errorRes={fetchError}
//         itemName="Треки"
//       />
//     </MusicLayout>
//   );
// }

// переходный вариант
// 'use client';

// import MusicLayout from '@/app/music/MusicLayout';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import { setPagePlaylist } from '@/store/features/trackSlice';

// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { TrackType } from '@/sharedTypes/sharedTypes';

// export default function Home() {
//   const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } = useAppSelector(
//     (state) => state.tracks);
//     const [playlist, setPlaylist] = useState<TrackType[]>([]);
//     const dispatch = useAppDispatch();

//     useEffect(() => {
//       const playlist = filters.authors.length ? filteredTracks : allTracks;
//       setPlaylist(playlist);
//       // dispatch(setPagePlaylist(allTracks));
//     }, [filteredTracks, allTracks]);

//   return (
//     <MusicLayout>
//       <Centerblock
//         pagePlaylist={allTracks}
//         tracks={playlist}
//         isLoading={fetchIsLoading}
//         errorRes={fetchError}
//         itemName="Треки"
//       />
//     </MusicLayout>
//   );
// }

// рабочий вариант
// 'use client';

// import Centerblock from '@/components/Centerblock/Centerblock';
// import { useAppSelector } from '@/store/store';
// import MusicLayout from '@/app/music/MusicLayout';

// export default function Home() {
//   const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
//     (state) => state.tracks,
//   );

//   return (
//     <MusicLayout>
//       <Centerblock
//         tracks={allTracks}
//         isLoading={fetchIsLoading}
//         errorRes={fetchError}
//         itemName="Треки"
//       />
//     </MusicLayout>
//   );
// }
