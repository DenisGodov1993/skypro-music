// import { refreshToken } from '@/services/auth/authApi';
// import { setAccessToken, clearUser } from '@/store/features/authSlice';
// import { AppDispatch } from '@/store/store';
// import { AxiosError } from 'axios';

// type ApiError = {
//   message?: string;
// };

// export const withReAuth = async <T>(
//   apiFunction: (access: string) => Promise<T>,
//   refresh: string | null,
//   dispatch: AppDispatch,
//   access: string | null,
// ): Promise<T> => {
//   try {
//     if (!access) {
//       throw new Error('Нет access токена');
//     }

//     return await apiFunction(access);
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     const data = axiosError.response?.data as ApiError | undefined;

//     const isUnauthorized =
//       axiosError.response?.status === 401 ||
//       data?.message?.includes('Токен');

//     if (!isUnauthorized || !refresh) {
//       throw error;
//     }

//     try {
//       const { access: newAccess } = await refreshToken(refresh);
//       dispatch(setAccessToken(newAccess));
//       return await apiFunction(newAccess);
//     } catch {
//       // 🔥 refresh умер — полностью разлогиниваем
//       dispatch(clearUser());
//       throw new Error('Сессия истекла, войдите заново');
//     }
//   }
// };

import { refreshToken } from '@/services/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

type ApiError = {
  message?: string;
};

export const withReAuth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
  access?: string,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction(access ?? '');
  } catch (error) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data as ApiError | undefined;

    // 🔥 Skypro API может не вернуть status → проверяем по message
    const isUnauthorized =
      axiosError.response?.status === 401 ||
      data?.message?.includes('Токен');

    if (isUnauthorized) {
      const newAccessToken = await refreshToken(refresh);
      dispatch(setAccessToken(newAccessToken.access));
      return await apiFunction(newAccessToken.access);
    }

    throw error;
  }
};

// import { refreshToken } from '@/services/auth/authApi';
// import { setAccessToken } from '@/store/features/authSlice';
// import { AppDispatch } from '@/store/store';
// import { AxiosError } from 'axios';
// // import { refresh } from 'next/cache';

// export const withReAuth = async <T>(
//   apiFunction: (access: string) => Promise<T>,
//   access: string,
//   refresh: string,
//   dispatch: AppDispatch,
// ): Promise<T> => {
//   try {
//     // Пытаемся выполнить запрос
//     // return await apiFunction('');
//     return await apiFunction(access);
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     // Если ошибка 401, обновляем токен и повторяем запрос
//     if (axiosError.response?.status === 401) {
//       try {
//         const newAccessToken = await refreshToken(refresh); // Обновляем токен
//         dispatch(setAccessToken(newAccessToken.access));
//         // Повторяем исходный запрос
//         return await apiFunction(newAccessToken.access);
//       } catch (refreshError) {
//         // Если обновление токена не удалось, пробрасываем ошибку
//         throw refreshError;
//       }
//     }

//     // Если ошибка не 401, пробрасываем её
//     throw error;
//   }
// };

// import { refreshToken } from '@/services/auth/authApi';
// import { setAccessToken } from '@/store/features/authSlice';
// import { AppDispatch } from '@/store/store';
// import { AxiosError } from 'axios';

// export const withReAuth = async <T>(
//   apiFunction: (access: string) => Promise<T>,
//   refresh: string,
//   dispatch: AppDispatch,
// ): Promise<T> => {
//   try {
//     // Пытаемся выполнить запрос
//     return await apiFunction('');
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     // Если ошибка 401, обновляем токен и повторяем запрос
//     if (axiosError.response?.status === 401) {
//       try {
//         const newAccessToken = await refreshToken(refresh); // Обновляем токен
//         dispatch(setAccessToken(newAccessToken.access));
//         // Повторяем исходный запрос
//         return await apiFunction(newAccessToken.access);
//       } catch (refreshError) {
//         // Если обновление токена не удалось, пробрасываем ошибку
//         throw refreshError;
//       }
//     }

//     // Если ошибка не 401, пробрасываем её
//     throw error;
//   }
// };

// withReAuth(
//   (newToken) => getFavoriteTracks(newToken || access),
//   refresh,
//   dispatch,
// );
