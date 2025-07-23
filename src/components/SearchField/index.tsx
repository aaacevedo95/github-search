import type { KeyboardEvent, ChangeEvent } from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { Search } from 'lucide-react';

import './SearchField.css';
import { useTranslation } from 'react-i18next';

type SearchFieldProps = {
  fetchResults: (pageToFetch: number) => Promise<void>;
};

function SearchField({ fetchResults }: SearchFieldProps) {
  const { t } = useTranslation();
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
      <Search size={16} color="#888" className="search-icon" />
      <input
        type="text"
        placeholder={t('searchPlaceholder')}
        className="search-input"
        value={searchText}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchField;
