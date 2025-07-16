import type { ChangeEvent } from 'react';
import { parseAsString, useQueryState } from 'nuqs';

function SearchField() {
    // searchText value is not needed here so setter is only used
    const [, setSearchText] = useQueryState('searchText', parseAsString);

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <input style={{ width: 180, height: 30 }} onChange={handleTextChange} />
    );
}

export default SearchField;
