function EmptyState({ title, description, action }) {
  return (
    <div className="card p-8 text-center">
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-brand-blue">
          Sin resultados
        </span>
        <h3 className="mt-4 text-xl font-semibold text-brand-dark">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </div>
  );
}

export default EmptyState;
