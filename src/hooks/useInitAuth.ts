import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import {
  setUsername,
  setAccessToken,
  setRefreshToken,
} from '@/store/features/authSlice';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username') || '';
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';

    dispatch(setUsername(username));
    dispatch(setAccessToken(access));
    dispatch(setRefreshToken(refresh));
  }, [dispatch]);
};
