import { useQueryState } from 'nuqs';

import { parseAsSearchType } from '../utils/queryParsers';

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
    parseAsSearchType
  );

  return (
    <select
      style={{ width: 100, height: 36, borderWidth: 1, borderRadius: 4 }}
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
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
