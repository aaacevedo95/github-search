import type { KeyboardEvent, ChangeEvent } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { Search } from 'lucide-react';
type SearchFieldProps = {
  fetchResults: (pageToFetch: number) => Promise<void>;
};

function SearchField({ fetchResults }: SearchFieldProps) {
  const [searchText, setSearchText] = useQueryState(
    'searchText',
    parseAsString.withDefault('')
  );

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') fetchResults(1);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Search
        size={16}
        color="#888"
        style={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        placeholder="Search..."
        style={{
          borderWidth: 1,
          borderRadius: 4,
          width: 180,
          paddingLeft: 30,
          height: 30,
          fontSize: 16,
        }}
        value={searchText}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchField;
