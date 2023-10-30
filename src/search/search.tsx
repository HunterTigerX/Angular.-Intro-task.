import { useRef, useEffect, useState, SetStateAction } from 'react';

const Search = () => {
  const lastSearchStorage = localStorage.getItem('searchedItems');
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

  function submitSearchText(e: { preventDefault: () => void }) {
    e.preventDefault();
    const refCurrent = inputRef.current;
    if (refCurrent) localStorage.setItem('searchedItems', refCurrent.value);
  }

  return (
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
  );
};

export default Search;
