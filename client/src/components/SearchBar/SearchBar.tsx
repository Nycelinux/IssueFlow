import './SearchBar.scss';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search tickets..."
      value={value}
      onChange={onChange}
    />
  );
}
export default SearchBar;
