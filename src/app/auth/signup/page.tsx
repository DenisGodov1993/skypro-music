'use client';

import { registerUser } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';

// import { useState, ChangeEvent } from 'react';
// import axios, { AxiosError } from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== repeatPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    registerUser({ email, password, username: email }) // username: email.split("@")[0]
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            console.log(error.request);
            setErrorMessage('Отсутствует интернет, попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка, попробуйте позже');
          }
        }
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onChangeRepeatPassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}

// import styles from './signup.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';

// export default function SignUp() {
//   return (
//     <>
//       {/* <div className={styles.wrapper}>
//         <div className={styles.containerEnter}>
//           <div className={styles.modal__block}>
//             <form className={styles.modal__form}> */}
//               <Link href="/music/main">
//                 <div className={styles.modal__logo}>
//                   <img src="/img/logo_modal.png" alt="logo" />
//                 </div>
//               </Link>
//               <input
//                 className={classNames(styles.modal__input, styles.login)}
//                 type="text"
//                 name="login"
//                 placeholder="Почта"
//               />
//               <input
//                 className={styles.modal__input}
//                 type="password"
//                 name="password"
//                 placeholder="Пароль"
//               />
//               <input
//                 className={styles.modal__input}
//                 type="password"
//                 name="password"
//                 placeholder="Повторите пароль"
//               />
//               <div className={styles.errorContainer}></div>
//               <button className={styles.modal__btnSignupEnt}>
//                 Зарегистрироваться
//               </button>
//             {/* </form>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// }

// // export default function Signup() {
// //     return <h1>Регистрация!</h1>
// // }
