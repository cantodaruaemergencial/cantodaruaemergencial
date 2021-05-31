import { useRouter } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getUserProfile, validateUser, makeLogout } from '../api/strapi';
import { UserProfile } from '../entities/types';

interface AuthMethods {
  readonly logout: () => void;
  readonly login: (email: string, password: string) => Promise<void>;
}

interface AuthState {
  readonly isLogged: boolean;
  readonly isLoading: boolean;
  readonly userProfile: UserProfile | null;
}

interface Props {
  readonly children: ReactNode;
}

const publicRoutes = ['/', '/login'];

const AuthStateCtx = createContext<AuthState>({
  isLogged: false,
  isLoading: false,
  userProfile: null,
});

AuthStateCtx.displayName = 'AuthStateCtx';

function missingProviderError() {
  throw TypeError('Missing AuthProvider upwards in the tree');
}

const AuthMethodsCtx = createContext<AuthMethods>({
  login: () => new Promise(missingProviderError),
  logout: missingProviderError,
});
AuthMethodsCtx.displayName = 'AuthMethodsCtx';

type Status = 'idle' | 'loading' | 'fetched';

const AuthProvider = ({ children }: Props): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [fetchStatus, setFetchStatus] = useState<Status>('idle');

  const router = useRouter();

  const methods: AuthMethods = {
    login: async (email: string, password: string) => {
      setFetchStatus('loading');
      try {
        await validateUser(email, password);
        const userProfileFetched = getUserProfile();
        setUserProfile(userProfileFetched);
        setFetchStatus('fetched');
      } catch (error) {
        setFetchStatus('fetched');
        const message = error?.message || 'Ocorreu um erro ao realizar login.';
        enqueueSnackbar(message, { variant: 'error' });
      }
    },
    logout: () => {
      setUserProfile(null);
      makeLogout();
      router.replace('/login');
    },
  };

  const states: AuthState = useMemo(
    () => ({
      isLogged: userProfile != null,
      isLoading: fetchStatus === 'loading',
      userProfile,
    }),
    [fetchStatus, userProfile],
  );

  useEffect(() => {
    const user = getUserProfile();
    setUserProfile(user);

    if (!publicRoutes.includes(router.pathname) && user == null)
      router.replace('/login');
  }, []);

  return (
    <AuthStateCtx.Provider value={states}>
      <AuthMethodsCtx.Provider value={methods}>
        {children}
      </AuthMethodsCtx.Provider>
    </AuthStateCtx.Provider>
  );
};

export function useAuthState(): AuthState {
  return useContext(AuthStateCtx);
}

export function useAuthMethods(): AuthMethods {
  return useContext(AuthMethodsCtx);
}

export default AuthProvider;
