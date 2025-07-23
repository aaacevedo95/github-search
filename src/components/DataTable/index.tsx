import type { Endpoints } from '@octokit/types';
import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  LoaderPinwheel,
  SearchX,
} from 'lucide-react';
import { useQueryState } from 'nuqs';

import { parseAsPage } from '../../utils/queryParsers';

import './DataTable.css';

type DataTableProps = {
  data: null | Endpoints['GET /search/repositories']['response']['data'];
  isLoading: boolean;
  error: Error | null;
  lastPage: number;
  fetchResults: (pageToFetch: number) => Promise<void>;
};

function renderCell(value: any) {
  if (value === null || value === undefined) return '';

  if (typeof value === 'object' && 'login' in value && 'html_url' in value) {
    return (
      <a
        href={value.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <img
          src={value.avatar_url}
          alt={value.login}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
          }}
        />
        {value.login}
      </a>
    );
  }

  if (Array.isArray(value)) {
    return value.map((v, i) => (
      <span key={i}>
        {String(v)}
        {i < value.length - 1 ? ', ' : ''}
      </span>
    ));
  }

  if (typeof value === 'object') {
    return <span>{Object.keys(value).slice(0, 3).join(', ')}...</span>;
  }

  return String(value);
}

function DataTable({
  data,
  isLoading,
  error,
  lastPage,
  fetchResults,
}: DataTableProps) {
  const [page, setPage] = useQueryState('page', parseAsPage);

  const goToPage = (targetPage: number) => {
    const newPage = Math.max(1, Math.min(targetPage, lastPage));
    setPage(newPage);
    fetchResults(newPage);
  };

  return (
    <div className="table-wrapper">
      {isLoading && <LoaderPinwheel className="loader" size={64} />}
      {error && <div className="error-messages">Error: {error.message}</div>}
      {!isLoading && !data?.items?.length && !error && (
        <div className="error-messages">
          <SearchX size={64} color="#fa6060" />
          No results found.
        </div>
      )}

      <div className="table-scroll-area">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {/* Header */}
          <thead>
            <tr>
              {data?.items?.[0] &&
                Object.keys(data.items[0]).map((key) => (
                  <th key={key} className="table-header">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index} className="table-line">
                {Object.entries(item).map(([key, value]) => (
                  <td
                    key={key}
                    className="table-line"
                    style={{ verticalAlign: 'top' }}
                  >
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {(data?.items || isLoading || error) && (
        <div className="table-sticky-footer">
          <div>Total: {data?.total_count?.toLocaleString() || 0}</div>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => goToPage(1)}>
              <ArrowLeftToLine />
            </button>
            <button disabled={page === 1} onClick={() => goToPage(page - 1)}>
              <ArrowLeft />
            </button>
            <span>
              {page} - {lastPage}
            </span>
            <button
              disabled={page === lastPage}
              onClick={() => goToPage(page + 1)}
            >
              <ArrowRight />
            </button>
            <button
              disabled={page === lastPage}
              onClick={() => goToPage(lastPage)}
            >
              <ArrowRightToLine />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
