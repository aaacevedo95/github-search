import SelectField from './components/SelectField';
import SearchField from './components/SearchField';
import DataTable from './components/DataTable';

import useGithubSearch from './hooks/useGithubSearch';

import './style/App.css';
import { parseAsPerPage, parseAsSearchType } from './utils/queryParsers';

const endpointOptions = [
  'repositories',
  'users',
  'issues',
  'commits',
  'topics',
  'labels',
  'code',
];

const perPageOptions = ['20', '40', '60', '100'];

function App() {
  const { data, error, lastPage, isLoading, fetchResults } = useGithubSearch();

  const handleClick = () => {
    fetchResults(1);
  };

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

        <button className="fetchButton" onClick={handleClick}>
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
