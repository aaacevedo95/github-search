import { useState, useCallback, useEffect } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import type { Endpoints } from '@octokit/types';

import customOctokit from '../api/OctoKit';
import {
  parseAsPage,
  parseAsPerPage,
  parseAsSearchType,
} from '../utils/queryParsers';

type SearchReposResponse =
  Endpoints['GET /search/repositories']['response']['data'];

function useGithubSearch() {
  const [searchText] = useQueryState(
    'searchText',
    parseAsString.withDefault('')
  );
  const [searchType] = useQueryState('searchType', parseAsSearchType);
  const [perPage] = useQueryState('perPage', parseAsPerPage);
  const [page, setPage] = useQueryState('page', parseAsPage);

  const [lastPage, setLastPage] = useState<number>(1);
  const [data, setData] = useState<SearchReposResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchResults = useCallback(
    async (pageToFetch: number) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      if (pageToFetch === 1) setPage(1);

      try {
        const response = await customOctokit.request(
          `GET /search/${searchType}`,
          {
            headers: { 'X-GitHub-Api-Version': '2022-11-28' },
            q: searchText,
            per_page: perPage,
            page: pageToFetch,
          }
        );

        const linkHeader = response.headers.link || '';
        const last = Number(
          linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || 1
        );

        setData(response.data);
        setLastPage(last);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchText, searchType, perPage, setPage]
  );

  // Fetch results on first load
  useEffect(() => {
    const hasQueryParams = searchText !== '';

    if (hasQueryParams) {
      fetchResults(page);
    }
    // Not needed as we leave dep array empty SO that it will load only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    lastPage,
    isLoading,
    error,
    fetchResults,
  };
}

export default useGithubSearch;
