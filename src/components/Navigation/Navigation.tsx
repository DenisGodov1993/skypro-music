'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './navigation.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { access } = useAppSelector((state) => state.auth);
  const isAuth = Boolean(access);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
          // priority
        />
      </div>
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      <div
        className={`${styles.nav__menu} ${
          menuOpen ? styles.nav__menu_show : ''
        }`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главная
            </Link>
          </li>
          {isAuth && (
            <li className={styles.menu__item}>
              <Link href="/music/playlist" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          )}

          <li className={styles.menu__item}>
            <p
              onClick={() => {
                if (isAuth) {
                  logout();
                } else {
                  router.push('/auth/signin');
                }
              }}
              className={styles.menu__link}
            >
              {isAuth ? 'Выйти' : 'Войти'}
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

//рабочий вариант
// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import styles from './navigation.module.css';
// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { clearUser } from '@/store/features/authSlice';
// import { useRouter } from 'next/navigation';

// export default function Navigation() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { access } = useAppSelector((state) => state.auth);
//   const isAuth = Boolean(access);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const logout = () => {
//     dispatch(clearUser());
//     router.push('/auth/signin');
//   };

//   return (
//     <nav className={styles.main__nav}>
//       <div className={styles.nav__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.png"
//           alt={'logo'}
//         />
//       </div>
//       <div className={styles.nav__burger} onClick={toggleMenu}>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//       </div>

//       <div
//         className={`${styles.nav__menu} ${
//           menuOpen ? styles.nav__menu_show : ''
//         }`}
//       >
//         <ul className={styles.menu__list}>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Главное
//             </Link>
//           </li>
//           {/* <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Мой плейлист
//             </Link>
//           </li> */}
//           <li className={styles.menu__item}>
//             <Link href="/music/playlist" className={styles.menu__link}>
//               Мой плейлист
//             </Link>
//           </li>

//           <li className={styles.menu__item}>
//             <p
//               onClick={() => {
//                 if (isAuth) {
//                   logout();
//                 } else {
//                   router.push('/auth/signin');
//                 }
//               }}
//               className={styles.menu__link}
//             >
//               {isAuth ? 'Выйти' : 'Войти'}
//             </p>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';

// import styles from './navigation.module.css';
// import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { clearUser } from '@/store/features/authSlice';
// import { useRouter } from 'next/navigation';

// export default function Navigation() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Получаем состояние пользователя из Redux
//   const username = useAppSelector((state) => state.auth.username);
//   const isAuth = !!username; // true если есть username, false если нет

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const handleAuthClick = () => {
//     if (isAuth) {
//       // Если авторизован — выход
//       dispatch(clearUser());
//       router.push('/auth/signin');
//     } else {
//       // Если не авторизован — переход на страницу входа
//       router.push('/auth/signin');
//     }
//   };

//   // const logout = () => {
//   //   dispatch(clearUser());
//   //   router.push('/auth/signin');
//   // };

//   return (
//     <nav className={styles.main__nav}>
//       <div className={styles.nav__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.png"
//           alt={'logo'}
//         />
//       </div>
//       <div className={styles.nav__burger} onClick={toggleMenu}>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//       </div>

//       <div
//         className={`${styles.nav__menu} ${
//           menuOpen ? styles.nav__menu_show : ''
//         }`}
//       >
//         <ul className={styles.menu__list}>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Главное
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Мой плейлист
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             {/* <p onClick={logout} className={styles.menu__link}> */}
//             <p onClick={handleAuthClick} className={styles.menu__link}>
//               {isAuth ? 'Выйти' : 'Войти'}
//             </p>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';

// import styles from './navigation.module.css';
// import { useState } from 'react';
// import { useAppDispatch } from '@/store/store';
// import { clearUser } from '@/store/features/authSlice';
// import { useRouter } from 'next/navigation';

// export default function Navigation() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const logout = () => {
//     dispatch(clearUser());
//     router.push('/auth/signin');
//   };

//   return (
//     <nav className={styles.main__nav}>
//       <div className={styles.nav__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.png"
//           alt={'logo'}
//         />
//       </div>
//       <div className={styles.nav__burger} onClick={toggleMenu}>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//       </div>
//       {/* <div className={styles.nav__menu}> */}
//       <div
//         className={`${styles.nav__menu} ${
//           menuOpen ? styles.nav__menu_show : ''
//         }`}
//       >
//         <ul className={styles.menu__list}>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Главное
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Мой плейлист
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             {/* <Link href="../signin.html" className={styles.menu__link}> */}
//             {/* <Link href="../auth/signin" className={styles.menu__link}>
//               Войти
//             </Link> */}
//             <p onClick={logout} className={styles.menu__link}>
//               Войти
//             </p>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import styles from './navigation.module.css';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function Navigation() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <nav className={styles.main__nav}>
//       <div className={styles.nav__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.png"
//           alt={'logo'}
//         />
//       </div>
//       <div className={styles.nav__burger} onClick={toggleMenu}>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//       </div>
//       {/* <div className={styles.nav__menu}> */}
//       <div
//         className={`${styles.nav__menu} ${
//           menuOpen ? styles.nav__menu_show : ''
//         }`}
//       >
//         <ul className={styles.menu__list}>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Главное
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Мой плейлист
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             {/* <Link href="../signin.html" className={styles.menu__link}> */}
//             <Link href="../auth/signin" className={styles.menu__link}>
//               Войти
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
