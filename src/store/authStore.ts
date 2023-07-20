import { proxy, useSnapshot } from "valtio";

export const authState = proxy({
  isAuthenticated: false,
});

export function useAuthState() {
  return useSnapshot(authState);
}
