import { parseAsString, useQueryState } from 'nuqs';

import type { EndpointOptions } from '../hooks/fetchGithubSearch';

const endpointOptions = [
    'repositories',
    'users',
    'issues',
    'commits',
    'topics',
    'labels',
    'code',
];

function SelectField() {
    const [searchType, setSearchType] = useQueryState(
        'searchType',
        parseAsString.withDefault('repositories')
    );

    return (
        <select
            style={{ width: 100, height: 36 }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as EndpointOptions)}
        >
            {endpointOptions.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}

export default SelectField;
