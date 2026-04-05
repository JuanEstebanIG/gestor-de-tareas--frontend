function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="card p-4">
      <label htmlFor="task-search" className="label">
        Buscar por título
      </label>
      <input
        id="task-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="input-control"
      />
    </div>
  );
}

export default SearchBar;
