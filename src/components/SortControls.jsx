function SortControls({ value, onChange }) {
  return (
    <div className="card p-4">
      <label htmlFor="task-sort" className="label">
        Ordenar tareas
      </label>
      <select
        id="task-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-control"
      >
        <option value="newest">Fecha: más recientes</option>
        <option value="oldest">Fecha: más antiguas</option>
        <option value="az">Alfabético: A - Z</option>
        <option value="za">Alfabético: Z - A</option>
      </select>
    </div>
  );
}

export default SortControls;
