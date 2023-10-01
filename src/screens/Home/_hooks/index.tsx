import { useState, useCallback } from 'react';
import { useRequest } from '../../../utils/services/';
import { debounce } from 'lodash';

import 'moment/locale/id';

export const SurahHooksScreen = () => {
  const request = useRequest();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [listSurah, setListSurah] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(1);
  const [searchSurah, setSearchSurah] = useState('');
  const sizeListSurah = 15;

  const handleStatusRenderGuest = useCallback((): string => {
    if (isLoading && listSurah.length === 0) {
      return 'loading';
    } else if (isError) {
      return 'error';
    } else if (listSurah.length === 0) {
      return 'empty';
    } else if (listSurah.length >= 0) {
      return 'show';
    } else {
      return 'show';
    }
  }, [isError, isLoading, listSurah.length]);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const body = {
      search: '',
      limit: sizeListSurah,
      offset: offset,
      order_column: 'id',
      order_direction: 'asc',
    };

    try {
      const res = await request({
        method: 'post',
        endpoint: '/surah/all/',
        body: body,
      });
      if (res.meta.code === 200) {
        setIsError(false);
        if (res.data.length !== 0) {
          setListSurah(prevListSurah => [...prevListSurah, ...res.data]);
          setOffset(offset + 1);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [offset, request]);
  const statusRenderGuest = handleStatusRenderGuest();
  const handleLoadMore = debounce(() => {
    if (!isLoading) {
      if (searchSurah.length === 0) {
        if (offset !== 1 && listSurah.length >= sizeListSurah) {
          fetchData();
        }
      }
    }
  }, 300);

  const handleTryAgain = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await request({
        method: 'post',
        endpoint: '/surah/all/',
        body: {
          search: '',
          limit: sizeListSurah,
          offset: 1,
          order_column: 'id',
          order_direction: 'asc',
        },
      });

      if (res.meta.code === 200) {
        setIsError(false);
        if (res.data.length !== 0) {
          setListSurah(res.data);
          setOffset(2);
        } else {
          setListSurah([]);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  const handleSearch = useCallback(async () => {
    console.log('disini bukan ? 3');

    setIsLoading(true);
    const body = {
      search: searchSurah,
      limit: sizeListSurah,
      offset: offset,
      order_column: 'id',
      order_direction: 'desc',
    };

    try {
      const response = await request({
        method: 'post',
        endpoint: '/surah/all/',
        body: body,
      });

      if (response.meta.code === 200) {
        setIsError(false);
        if (response.data.length !== 0) {
          setListSurah(response.data);
          setOffset(1);
        } else {
          setListSurah([]);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [offset, request, searchSurah]);
  return {
    handleSearch,
    setSearchSurah,
    searchSurah,
    handleStatusRenderGuest,
    statusRenderGuest,
    listSurah,
    handleLoadMore,
    isLoading,
    handleTryAgain,
  };
};
