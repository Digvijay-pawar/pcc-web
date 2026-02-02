import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface IAuthAtom {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  role: string | null;
}

const defaultAuthState: IAuthAtom = {
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  role: null,
};

export const authAtom = atomWithStorage<IAuthAtom>(
  'auth',
  defaultAuthState,
  undefined,
  { getOnInit: true }
);

export const setAuthAtom = atom(
  null,
  (_get, set, update: Partial<IAuthAtom>) => {
    const current = _get(authAtom);
    set(authAtom, { ...current, ...update });
  }
);

export const clearAuthAtom = atom(null, (_get, set) => {
  set(authAtom, defaultAuthState);
});
