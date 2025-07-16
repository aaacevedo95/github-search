import { useState } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import SelectField from './components/SelectField';
import SearchField from './components/SearchField';
import DataTable from './components/DataTable';

import useGithubSearch from './hooks/useGithubSearch';
import { parseAsSearchType } from './utils/queryParsers';

import './style/App.css';

function App() {
    const [searchText] = useQueryState(
        'searchText',
        parseAsString.withDefault('')
    );
    const [searchType] = useQueryState('searchType', parseAsSearchType);

    const [{ page, perPage }, setPagination] = useState({
        page: 1,
        perPage: 30,
    });

    const { data, error, lastPage, loading, executeSearch } = useGithubSearch();

    const handleClick = () => {
        executeSearch({
            endpoint: searchType,
            params: { q: searchText, per_page: perPage, page },
        });
    };

    const handlePageChange = (pageChange: number) => {
        const newPage = Math.max(1, (page || 1) + pageChange);

        executeSearch({
            endpoint: searchType,
            params: { q: searchText, per_page: perPage, page: newPage },
        });
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    console.log('data', loading);

    return (
        <>
            <div
                style={{
                    gap: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SearchField />
                <SelectField />

                <button className="fetchButton" onClick={handleClick}>
                    Fetch
                </button>
            </div>

            <DataTable
                data={data}
                loading={loading}
                error={error}
                lastPage={lastPage}
                page={page}
                perPage={perPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
}

export default App;
