function StatCard({ title, value, description }) {
  return (
    <article className="card p-6">
      <p className="text-sm font-medium text-brand-muted">{title}</p>
      <p className="mt-4 text-4xl font-semibold text-brand-dark">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

export default StatCard;
