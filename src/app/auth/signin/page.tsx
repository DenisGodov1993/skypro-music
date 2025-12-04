'use client';

import { authUser } from '@/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    setIsLoading(true);
    try {
      const res = await authUser({ email, password });
      console.log(res);
      router.push("/music/main"); // успешный вход → главная
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          setErrorMessage('Отсутствует интернет, попробуйте позже');
        } else {
          setErrorMessage('Неизвестная ошибка, попробуйте позже');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };


  //   authUser({ email, password })
  //     .then((res) => {
  //       console.log(res);
  //       router.push("/music/main");
  //     })
  //     .catch((error) => {
  //       if (error instanceof AxiosError) {
  //         if (error.response) {
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //           setErrorMessage(error.response.data.message);
  //         } else if (error.request) {
  //           console.log(error.request);
  //           setErrorMessage('Отсутствует интернет, попробуйте позже');
  //         } else {
  //           setErrorMessage('Неизвестная ошибка, попробуйте позже');
  //         }
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(true);
  //     });
  // };

  return (
    <>
      {/* <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a> */}
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
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>
        {/*Блок для ошибок*/}
        {errorMessage}
      </div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}

//рабочий код
// 'use client';

// import { authUser } from '@/services/auth/authApi';
// import styles from './signin.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { ChangeEvent, useState } from 'react';
// import { AxiosError } from 'axios';
// import { useRouter } from "next/navigation";

// export default function Signin() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     authUser({ email, password })
//       .then((res) => {
//         console.log(res);
//         router.push("/music/main");
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//             setErrorMessage(error.response.data.message);
//           } else if (error.request) {
//             console.log(error.request);
//             setErrorMessage('Отсутствует интернет, попробуйте позже');
//           } else {
//             setErrorMessage('Неизвестная ошибка, попробуйте позже');
//           }
//         }
//       })
//       .finally(() => {
//         setIsLoading(true);
//       });
//   };

//   return (
//     <>
//       <a href="/music/main">
//         <div className={styles.modal__logo}>
//           <img src="/img/logo_modal.png" alt="logo" />
//         </div>
//       </a>
//       <input
//         className={classNames(styles.modal__input, styles.login)}
//         type="text"
//         name="login"
//         placeholder="Почта"
//         onChange={onChangeEmail}
//       />
//       <input
//         className={classNames(styles.modal__input)}
//         type="password"
//         name="password"
//         placeholder="Пароль"
//         onChange={onChangePassword}
//       />
//       <div className={styles.errorContainer}>
//         {/*Блок для ошибок*/}
//         {errorMessage}
//       </div>
//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnEnter}
//       >
//         Войти
//       </button>
//       <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
//         Зарегистрироваться
//       </Link>
//     </>
//   );
// }

// 'use client';

// import { authUser } from '@/services/auth/authApi';
// import styles from './signin.module.css';
// import classNames from 'classnames';
// import Link from 'next/link';
// import { ChangeEvent, useState } from 'react';
// import { AxiosError } from 'axios';

// export default function Signin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     authUser({ email, password })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             // Запрос был сделан, и сервер ответил кодом состояния, который
//             // выходит за пределы 2хх
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//             setErrorMessage(error.response.data.message);
//           } else if (error.request) {
//             //запрос был сделан, но ответ не получен
//             // `error.request` - это экзкмпляр XMLHttpRequest в браузере и экземпляр
//             // http.ClientRequest в node.js
//             console.log(error.request);
//             setErrorMessage('Щтсутствует интернет, попробуйте позже');
//           } else {
//             //Произошло что-то при настройке запросов, вызвавшее ошибку
//             setErrorMessage('Неизвестная ошибка, попробуйте позже');
//           }
//         }
//       })
//       .finally(() => {
//         setIsLoading(true);
//       });
//   };

//   return (
//     <>
//       {/* <div className={styles.wrapper}>
//         <div className={styles.containerEnter}>
//           <div className={styles.modal__block}>
//             <form className={styles.modal__form}> */}
//       <a href="/music/main">
//         <div className={styles.modal__logo}>
//           <img src="/img/logo_modal.png" alt="logo" />
//         </div>
//       </a>
//       <input
//         className={classNames(styles.modal__input, styles.login)}
//         type="text"
//         name="login"
//         placeholder="Почта"
//         onChange={onChangeEmail}
//       />
//       <input
//         className={classNames(styles.modal__input)}
//         type="password"
//         name="password"
//         placeholder="Пароль"
//         onChange={onChangePassword}
//       />
//       <div className={styles.errorContainer}>
//         {/*Блок для ошибок*/}
//         {errorMessage}
//       </div>
//       <button
//         disabled={isLoading}
//         onClick={onSubmit}
//         className={styles.modal__btnEnter}
//       >
//         Войти
//       </button>
//       <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
//         Зарегистрироваться
//       </Link>
//       {/* </form>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// }

// export default function Signin() {
//     return <h1>Авторизация!</h1>
// }
