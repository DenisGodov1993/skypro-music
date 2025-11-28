'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}

// "use client";

// import { useRef } from "react";
// import { Provider } from "react-redux";
// import { makeStore, AppStore } from "./store";

// export default function ReduxProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) { 
//   const storeRef = useRef<AppStore>(null);
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>;
// }

// "use client";

// import { Provider } from "react-redux";
// import { makeStore } from "./store";

// const store = makeStore(); // создаётся один раз на уровне модуля

// export default function ReduxProvider({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }