import axios, { AxiosError, AxiosResponse } from 'axios';
import { BaseRequest, ResultType } from '../types';
import { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTokens, setNewTokens } from '../../redux/_reducers/authSlice';
import * as Sentry from '@sentry/react-native';
import { useAlert } from '../../components';

const API = 'http://54.151.252.190/api/v1';

export const useRequest = () => {
  const { show } = useAlert();
  const dispatch = useDispatch();
  const isSignedIn = useSelector(({ authSlice }: any) => authSlice.isSignedIn);
  const accessToken = useSelector(
    ({ authSlice }: any) => authSlice.accessToken,
  );

  const [accessTokenNew, setAccessTokenNew] = useState(undefined);

  const refreshToken = useSelector(
    ({ authSlice }: any) => authSlice.refreshToken,
  );
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const requestHandler = useCallback(
    async (requestConfig: any, handleError?: Function) => {
      try {
        const res: AxiosResponse = await axios(requestConfig);
        const resParse = JSON.parse(res?.data);
        if (resParse?.meta?.message === 'New access token generated') {
          dispatch(
            setNewTokens({
              accessToken: resParse?.data?.token,
              refreshToken: resParse?.data?.refreshToken,
            }),
          );
        }
        return {
          status: resParse?.meta?.status,
          data: resParse?.data,
          meta: resParse?.meta,
        };
      } catch (error: any) {
        const isTimeout =
          error.code === 'ECONNABORTED' || axios.isCancel(error);
        if (isTimeout) {
          return {
            status: 'error',
            data: [{ error: 'timeout' }],
            meta: { message: 'Request timeout after 15 seconds' },
          };
        }

        const { response }: any = error as AxiosError;
        const resErrorParse = JSON.parse(response?.data);

        if (handleError) {
          handleError(resErrorParse, error);
        }

        Sentry.captureException(new Error(JSON.stringify(resErrorParse)));
        return {
          status: resErrorParse?.meta?.status,
          data: resErrorParse?.data,
          meta: resErrorParse?.meta,
        };
      }
    },
    [dispatch],
  );

  const refreshTokenRequest = useRef<Promise<any> | null>(null);

  const handleTokenRefresh = useCallback(async () => {
    if (isRefreshingToken) {
      // If a refresh token request is already in progress, return the existing promise
      if (refreshTokenRequest.current) {
        return refreshTokenRequest.current;
      }
      return null;
    }

    setIsRefreshingToken(true);

    try {
      refreshTokenRequest.current = requestHandler(
        {
          url: `${API}auth/refresh_token/`,
          method: 'post',
          data: { refresh_token: refreshToken },
          timeout: 15000,
          responseType: 'text',
        },
        (resParse: any) => {
          if (resParse?.meta?.code === 200) {
            return resParse?.data?.token;
          } else {
            dispatch(clearTokens());
            if (resParse?.meta?.code === 401) {
              show(resParse?.meta?.message);
            }
          }
        },
      );
      const result = await refreshTokenRequest.current;
      if (result?.data?.token) {
        setAccessTokenNew(result.data.token);
      }
      return result;
    } catch (error) {
      console.log('Token refresh failed:', error);
    } finally {
      setIsRefreshingToken(false);
      refreshTokenRequest.current = null; // Reset the promise after the request finishes
    }
  }, [isRefreshingToken, requestHandler, refreshToken, dispatch, show]);

  const request = useCallback(
    async ({
      params,
      headers,
      body,
      endpoint,
      method,
      responseType = 'text',
    }: BaseRequest): Promise<ResultType> => {
      let requestConfig = {
        url: `${API}${endpoint}`,
        method,
        data: body,
        headers: {
          ...headers,
          Authorization: isSignedIn
            ? `Bearer ${
                accessTokenNew !== undefined ? accessTokenNew : accessToken
              }`
            : undefined,
        },
        params,
        timeout: 15000,
        responseType,
      };

      console.log(requestConfig.url);

      return await requestHandler(requestConfig, async (resErrorParse: any) => {
        if (resErrorParse?.meta?.code === 401 && !isRefreshingToken) {
          const newAccessToken = await handleTokenRefresh();
          if (newAccessToken) {
            setAccessTokenNew(newAccessToken.data.token);
            requestConfig.headers.Authorization = `Bearer ${newAccessToken.data.token}`; // Update the request configuration with the new access token
            return await requestHandler(requestConfig); // Retry the request with the new access token
          } else {
            throw new Error('Failed to refresh access token');
          }
        } else {
          if (resErrorParse?.meta?.code !== 401) {
            show(resErrorParse?.meta?.message);
          }

          return {
            status: resErrorParse?.meta?.status,
            data: resErrorParse?.data,
            meta: resErrorParse?.meta,
          };
        }
      });
    },
    [
      isSignedIn,
      accessTokenNew,
      accessToken,
      requestHandler,
      isRefreshingToken,
      handleTokenRefresh,
      show,
    ],
  );

  return request;
};
