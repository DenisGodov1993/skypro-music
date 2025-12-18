import axios from 'axios';
import { BASE_URL } from '@/services/constants';
import { createUserProp } from '@/services/auth/types';

export const createUser = ({ email, password }: createUserProp) => {
  const data = {
    email,
    password,
    username: email,
  };

  return axios.post(BASE_URL + '/user/signup/', data);
};

export const authUser = (data: createUserProp) => {
  return axios.post(BASE_URL + '/user/login/', data);
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokenType = accessTokenType & refreshTokenType;

export const getTokens = (data: createUserProp): Promise<tokenType> => {
  return axios.post(BASE_URL + '/user/token/', data).then((res) => res.data);
};

export const refreshToken = async (refresh: string) => {
  const res = await axios.post(
    BASE_URL + '/user/token/refresh/',
    { refresh },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  return res.data; // { access: string }
};

// export const refreshToken = (refresh: string): Promise<tokenType> => {
//   return axios
//     .post(BASE_URL + '/user/token/refresh/', { refresh })
//     .then((res) => res.data);
// };






// import axios from 'axios';
// import { BASE_URL } from '../constants';

// type authUserProps = {
//   email: string;
//   password: string;
// };

// type registerUserProps = {
//   email: string;
//   password: string;
//   username: string;
// };

// type authUserReturn = {
//   email: string;
//   username: string;
//   _id: number;
// };

// export const authUser = (data: authUserProps): Promise<authUserReturn> => {
//   return axios.post(BASE_URL + '/user/login/', data, {
//     headers: {
//       // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
//       'content-type': 'application/json',
//     },
//   });
// };

// export const registerUser = (
//   data: registerUserProps,
// ): Promise<authUserReturn> => {
//   return axios.post(BASE_URL + '/user/signup/', data, {
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// };
