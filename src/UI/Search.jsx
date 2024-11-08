import RemoveSearched from "/public/Icons/removeSeach.svg";
import SearchIcon from "/public/Icons/search_icon.svg";
function Search({ search, setSearch, placeholder, className }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={`flex ${className}`}>
      <div className={`flex w-full gap-5 rounded-lg border-2 bg-white p-3`}>
        <SearchIcon />
        <input type="text" placeholder={placeholder} className="w-full text-gray-600 focus:outline-0" value={search} onChange={handleSearch} />
        {search && <RemoveSearched onClick={() => setSearch("")} />}
      </div>
    </div>
  );
}

export default Search;
