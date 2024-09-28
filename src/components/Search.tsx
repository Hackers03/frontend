import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
        className="bg-gray-100 text-black py-2 px-4 rounded-full w-full border border-transparent focus:border-blue-500 focus:ring-0 transition-all duration-300"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
      >
        <AiOutlineSearch size={20} />
      </button>
    </form>
  );
};

export default Search;
