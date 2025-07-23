import type { Endpoints } from '@octokit/types';
import { LoaderPinwheel } from 'lucide-react';
import { useQueryState } from 'nuqs';

import './DataTable.css';
import { parseAsPage } from '../../utils/queryParsers';

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

  // render array
  if (Array.isArray(value)) {
    return value.map((v, i) => (
      <span key={i}>
        {String(v)}
        {i < value.length - 1 ? ', ' : ''}
      </span>
    ));
  }

  // in case of objects, break it up
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

  const handlePageChange = (pageChange: number) => {
    const newPage = Math.max(1, (page || 1) + pageChange);

    setPage(newPage);
    fetchResults(newPage);
  };

  return (
    <div>
      {/* Table Component */}
      <div className="table">
        {isLoading && <LoaderPinwheel className="loader" size={64} />}
        {data?.items && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            {/* Header */}
            <thead>
              <tr>
                {data?.items?.[0] &&
                  Object.keys(data.items[0]).map((key) => (
                    <th key={key} className="tableHeader">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data?.items?.map((item, index) => (
                <tr key={index} className="tableLine">
                  {Object.entries(item).map(([key, value]) => (
                    <td
                      key={key}
                      className="tableLine"
                      style={{ verticalAlign: 'top' }}
                    >
                      {renderCell(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="tableFooter">
                <th>Totals</th>
                <td>{data?.total_count?.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Table Footer/ Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => handlePageChange(-1)}>
          Prev
        </button>
        <span>
          currentPage: {page} - {lastPage}
        </span>
        <button
          disabled={page === lastPage}
          onClick={() => handlePageChange(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
