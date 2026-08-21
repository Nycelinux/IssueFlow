import './SearchBar.scss';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
export default SearchBar;
