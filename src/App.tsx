import SelectField from './components/SelectField';
import SearchField from './components/SearchField';
import DataTable from './components/DataTable';

import useGithubSearch from './hooks/useGithubSearch';
import { parseAsPerPage, parseAsSearchType } from './utils/queryParsers';

import './App.css';
import { parseAsString, useQueryState } from 'nuqs';

const endpointOptions = [
  { label: 'repositories', value: 'repositories' },
  { label: 'users', value: 'users' },
  { label: 'issues', value: 'issues' },
  { label: 'commits', value: 'commits' },
  { label: 'topics', value: 'topics' },
  { label: 'labels', value: 'labels' },
  { label: 'code', value: 'code' },
];

const perPageOptions = [
  { label: '20 per page', value: '20' },
  { label: '40 per page', value: '40' },
  { label: '60 per page', value: '60' },
  { label: '80 per page', value: '80' },
  { label: '100 per page', value: '100' },
];

function App() {
  const [searchText] = useQueryState(
    'searchText',
    parseAsString.withDefault('')
  );
  const { data, error, lastPage, isLoading, fetchResults } = useGithubSearch();

  const handleClick = () => {
    fetchResults(1);
  };

  return (
    <>
      <div className="filter-row">
        <SearchField fetchResults={fetchResults} />
        <SelectField
          name="searchType"
          options={endpointOptions}
          parseType={parseAsSearchType}
        />
        <SelectField
          name="perPage"
          options={perPageOptions}
          parseType={parseAsPerPage}
        />

        <button
          disabled={searchText === ''}
          className="fetch-button"
          onClick={handleClick}
        >
          Fetch
        </button>
      </div>

      <DataTable
        data={data}
        isLoading={isLoading}
        error={error}
        lastPage={lastPage}
        fetchResults={fetchResults}
      />
    </>
  );
}

export default App;
