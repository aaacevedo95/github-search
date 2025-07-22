import { useState, useCallback } from 'react';
import type { Endpoints } from '@octokit/types';

import customOctokit from '../api/OctoKit';

type SearchReposParams = Endpoints['GET /search/repositories']['parameters'];
type SearchReposResponse =
  Endpoints['GET /search/repositories']['response']['data'];

type SearchParams = {
  endpoint: string;
  params: SearchReposParams;
  headers?: Record<string, string>;
};

/**
 * Searches through various github /search/ endpoint types.
 *
 * @param endpoint - One of the following: 'repositories', 'users', 'issues', 'commits', 'topics', 'labels', 'code'.
 * @param initialParams - The initial parameters for the search.
 * @param initialHeaders - OPTIONAL, any extra headers you'd like to add.
 */
function useGithubSearch() {
  const [lastPage, setLastPage] = useState<number>(1);
  const [data, setData] = useState<SearchReposResponse | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const executeSearch = useCallback(
    async ({ endpoint, params, headers = {} }: SearchParams) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      console.log('params', params);
      try {
        const response = await customOctokit.request(
          `GET /search/${endpoint}`,
          {
            ...params,
            headers: {
              ...headers,
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );

        const linkHeader = response.headers.link || '';
        const lastPage = Number(
          linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || 1
        );

        setData(response.data);
        setLastPage(lastPage);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, lastPage, loading, error, executeSearch };
}

export default useGithubSearch;
