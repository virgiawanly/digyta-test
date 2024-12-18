import apiConfig from '@/config/api';
import { FormattedApiError } from '@/types/errors';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { deleteCookie } from 'cookies-next';

const httpClient = axios.create({
  baseURL: apiConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request to add the auth token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(apiConfig.apiTokenIdentifier);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response to format errors and handle unauthorized responses
httpClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<FormattedApiError> => {
    // Check if error is a cancel error and ignore it
    if (axios.isCancel(error)) {
      return new Promise(() => {}); // Return a pending promise to avoid triggering catch blocks
    }

    let formattedError: FormattedApiError = {
      error: true,
      message: 'An unexpected error occurred',
      errors: [],
    };

    if ((error as AxiosError).response) {
      const { data, status } = (error as AxiosError).response as AxiosResponse;

      formattedError = {
        error: true,
        message: data.message ?? 'An error occurred in our server',
        errors: data.errors ?? undefined,
        status: status,
      };

      // Log out the user if the token has expired
      if (status === 401) {
        deleteCookie(apiConfig.apiTokenIdentifier);
        deleteCookie(apiConfig.userProfileIdentifier);
      }
    }

    return Promise.reject(formattedError);
  }
);

export default httpClient;
