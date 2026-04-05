const stylesByPriority = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  low: "bg-slate-100 text-slate-700 border-slate-200"
};

const labelByPriority = {
  high: "Alta",
  medium: "Media",
  low: "Baja"
};

function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        stylesByPriority[priority] || stylesByPriority.low
      }`}
    >
      Prioridad {labelByPriority[priority] || "Baja"}
    </span>
  );
}

export default PriorityBadge;
