import { parseAsString, useQueryState } from 'nuqs';

import SearchField from './components/SearchField';
import useGithubSearch from './hooks/fetchGithubSearch';

import './style/App.css';
import SelectField from './components/SelectField';

function App() {
    // const [searchText] = useQueryState('searchText', parseAsString);
    // const { loading, data, error } = useGithubSearch({
    //     endpoint: 'repositories',
    //     params: { q: searchText },
    // });

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    gap: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SearchField />
                <SelectField />
            </div>
            Please make a small app to search GitHub repositories
            <br />
            - Implement a design in CSS. It can be as simple as you want.
            <br />
            - Implement pagination.
            <br />
            - Implement any feature or use any library that you consider.
            <br />
            Once completed, please post the app to GitHub and send us the URL.
            <br />* Refrain from adding our company name anywhere in your code
            or comments.
        </>
    );
}

export default App;
