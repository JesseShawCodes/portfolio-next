import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True after hydration on the client; false during SSR. */
export function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
