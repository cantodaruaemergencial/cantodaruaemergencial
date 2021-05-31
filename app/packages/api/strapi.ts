import qs from 'qs';

import { UserProfile } from '#/packages/entities/types';
import { Auth } from '#/types/Auth';

const LOCAL_STORAGE_CREDENTIAL_KEY = 'strapi:credentials';

const { NEXT_PUBLIC_STRAPI_API_URL } = process.env;

export function getUserProfile(): UserProfile | null {
  if (!localStorage) return null;
  const credentialString = localStorage.getItem(LOCAL_STORAGE_CREDENTIAL_KEY);
  if (credentialString == null) return null;
  const userProfile: UserProfile = JSON.parse(credentialString);
  if (!userProfile) return null;
  return userProfile;
}

export function makeLogout() {
  localStorage.removeItem(LOCAL_STORAGE_CREDENTIAL_KEY);
}

export class Api {
  static getPublicHeaders = () => ({
    'Content-Type': 'application/json',
  });

  static getHeaders = () => {
    const userProfile = getUserProfile();

    return {
      ...Api.getPublicHeaders(),
      Authorization: userProfile?.token ? `Bearer ${userProfile.token}` : '',
    };
  };

  static publicGet = async <ResultType extends unknown>(
    url: string,
  ): Promise<{ status: number; data: ResultType }> => {
    const options = {
      method: 'GET',
      headers: Api.getPublicHeaders(),
    };

    const res = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/${url}`, options);

    return {
      status: res.status,
      data: res.json() as ResultType,
    };
  };

  static get = async <ResultType extends unknown>(
    url: string,
    params?: { [key: string]: any },
  ): Promise<{ status: number; data: ResultType }> => {
    const options = {
      method: 'GET',
      headers: Api.getHeaders(),
    };

    const queryString = params ? `?${qs.stringify(params)}` : '';
    const res = await fetch(
      `${NEXT_PUBLIC_STRAPI_API_URL}/${url}${queryString}`,
      options,
    );

    return {
      status: res.status,
      data: res.json() as ResultType,
    };
  };

  static post = async <ResultType extends unknown>(
    url: string,
    body = {},
  ): Promise<{ status: number; data: ResultType }> => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: Api.getHeaders(),
    };

    const res = await fetch(`${NEXT_PUBLIC_STRAPI_API_URL}/${url}`, options);

    const result = await res.json();

    return {
      status: res.status,
      data: result,
    };
  };
}

export async function validateUser(
  email: string,
  password: string,
): Promise<UserProfile> {
  try {
    const {
      status,
      data: { data },
    } = await Api.post<Auth>('admin/login', {
      email,
      password,
    });

    if (status !== 200) {
      throw new Error('Erro ao realizar login!');
    }

    const userProfile: UserProfile = {
      displayName:
        data?.user?.username ??
        `${data?.user?.firstname ?? ''} ${data?.user?.lastname ?? ''}`,
      token: data?.token,
      email: data?.user?.email,
    };

    localStorage.setItem(
      LOCAL_STORAGE_CREDENTIAL_KEY,
      JSON.stringify(userProfile),
    );

    return userProfile;
  } catch (error) {
    const message = error?.message || 'Falha ao conectar.';
    throw new Error(message);
  }
}
