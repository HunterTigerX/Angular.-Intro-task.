import { useRef, useEffect, useState, SetStateAction } from 'react';

const Search = () => {
  const lastSearchStorage = localStorage.getItem('searchedItems');
  const resultsDataArray: JSX.Element[] = [];
  const [savedResults, setSavedResults] = useState(resultsDataArray);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lastSearchStorage) {
      setValue(lastSearchStorage);
    }
  }, [lastSearchStorage]);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  async function searchData(value: string) {
    await fetch(`https://swapi.dev/api/people/?search=${value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.count !== 0) {
          resultsDataArray.push(
            <div>There were {data.count} characters found!</div>
          );
          for (let i = 0; i < data.count; i += 1) {
            resultsDataArray.push(
              <div key={`key${i}`}>
                <span>
                  {data.results[i].name} and his or her hair color is{' '}
                  {data.results[i].hair_color}
                </span>
              </div>
            );
          }
          setSavedResults(resultsDataArray);
        } else {
          resultsDataArray.push(<span>No results found</span>);
          setSavedResults(resultsDataArray);
        }
        const submitButton = document.getElementById(
          'search-button'
        ) as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
        }
      })
      .catch((error) => console.error(error));
  }

  async function callError() {
    await fetch('https://notexistingurl').catch((error) =>
      console.error('This is logged error -> ', error)
    );
  }

  function submitSearchText(e: { preventDefault: () => void }) {
    const submitButton = document.getElementById(
      'search-button'
    ) as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = true;
    }

    e.preventDefault();
    const refCurrent = inputRef.current;
    if (refCurrent) {
      localStorage.setItem('searchedItems', refCurrent.value);
      searchData(inputRef.current.value);
    }
  }

  return (
    <>
      <div>
        <form>
          <label>
            Name:
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              name="search-input"
              value={value}
              onChange={handleChange}
            />
          </label>
          <button
            id="search-button"
            type="submit"
            value="Submit"
            onClick={submitSearchText}
          >
            Search
          </button>
        </form>
      </div>
      <div>{savedResults}</div>
      <button onClick={callError}>Call Error</button>
    </>
  );
};

export default Search;
