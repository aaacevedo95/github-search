import SelectField from './components/SelectField';
import SearchField from './components/SearchField';
import DataTable from './components/DataTable';

import useGithubSearch from './hooks/useGithubSearch';
import { parseAsPerPage, parseAsSearchType } from './utils/queryParsers';

import './App.css';
import { parseAsString, useQueryState } from 'nuqs';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const endpointOptions = [
  { label: 'endpoint.repositories', value: 'repositories' },
  { label: 'endpoint.users', value: 'users' },
  { label: 'endpoint.issues', value: 'issues' },
  { label: 'endpoint.commits', value: 'commits' },
  { label: 'endpoint.topics', value: 'topics' },
  { label: 'endpoint.labels', value: 'labels' },
  { label: 'endpoint.code', value: 'code' },
];

const perPageOptions = [
  { label: 'perPage.20perPage', value: '20' },
  { label: 'perPage.40perPage', value: '40' },
  { label: 'perPage.60perPage', value: '60' },
  { label: 'perPage.80perPage', value: '80' },
  { label: 'perPage.100perPage', value: '100' },
];

function App() {
  const { t } = useTranslation();
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LanguageSwitcher />
      </div>

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

        <button disabled={searchText === ''} onClick={handleClick}>
          {t('fetch')}
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
