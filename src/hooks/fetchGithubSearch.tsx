import { useEffect, useState } from 'react';
import type { Endpoints } from '@octokit/types';

import customOctokit from '../api/OctoKit';

type EndpointOptions =
    | 'repositories'
    | 'users'
    | 'issues'
    | 'commits'
    | 'topics'
    | 'labels'
    | 'code';

// types for response and params:
// https://www.npmjs.com/package/@octokit/types
type SearchReposParams = Endpoints['GET /search/repositories']['parameters'];
type SearchReposResponse =
    Endpoints['GET /search/repositories']['response']['data'];

type FetchProps = {
    endpoint: EndpointOptions;
    params: SearchReposParams;
    headers?: Record<string, string>;
};

/**
 * Searches through various github /search/ endpoint types.
 *
 * @param endpoint - One of the following:
  'repositories', 'users', 'issues', 'commits', 'topics', 'labels', 'code',  
 * @param params - The params
 * @param headers -  OPTIONAL, any extra headers you'd like to add.
 */
function useGithubSearch({ endpoint, params, headers = {} }: FetchProps) {
    const [data, setData] = useState<SearchReposResponse | null>(null);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        (async () => {
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
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [endpoint, params, headers]);

    return { data, loading, error };
}

export default useGithubSearch;
export type { EndpointOptions };
