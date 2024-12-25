import { useState } from "preact/hooks";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-center">
      <input
        className="rounded-full py-2 px-4 bg-gray-200 border-2 border-slate-800 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600 w-full max-w-md"
        type="text"
        placeholder="Rechercher un Pokémon"
        value={query}
        onInput={handleInputChange}
      />
    </div>
  );
}
