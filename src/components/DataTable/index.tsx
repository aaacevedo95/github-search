import type { Endpoints } from '@octokit/types';

import './DataTable.css';

type DataTableProps = {
    data: null | Endpoints['GET /search/repositories']['response']['data'];
    loading: boolean;
    error: Error | null;
    page: number;
    lastPage: number;
    perPage: number;
    handlePageChange: (newPage: number) => void;
};

function DataTable({
    data,
    loading,
    error,
    page,
    lastPage,
    perPage,
    handlePageChange,
}: DataTableProps) {
    return (
        <div>
            {/* Table Component */}

            <div className="table">
                {data?.items && (
                    <table
                        style={{ width: '100%', borderCollapse: 'collapse' }}
                    >
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
                                    {Object.entries(item).map(
                                        ([key, value]) => (
                                            <td
                                                key={key}
                                                className="tableLine"
                                                style={{ verticalAlign: 'top' }}
                                            >
                                                {typeof value === 'object'
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                            </td>
                                        )
                                    )}
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
                <button onClick={() => handlePageChange(-1)}>Last</button>
                <span>
                    currentPage: {page} - {lastPage}
                </span>
                <button onClick={() => handlePageChange(1)}>Next</button>
            </div>
        </div>
    );
}

export default DataTable;
