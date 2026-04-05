function StatusBadge({ completed }) {
  const styles = completed
    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : "bg-amber-100 text-amber-700 border-amber-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {completed ? "Completada" : "Pendiente"}
    </span>
  );
}

export default StatusBadge;
