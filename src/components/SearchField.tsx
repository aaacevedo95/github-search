import type { ChangeEvent } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

function SearchField() {
    const [searchText, setSearchText] = useQueryState(
        'searchText',
        parseAsString.withDefault('')
    );

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <input
            style={{ width: 180, height: 30 }}
            placeholder="search query"
            value={searchText}
            onChange={handleTextChange}
        />
    );
}

export default SearchField;
