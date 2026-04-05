function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-brand-dark">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">
          {description}
        </p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default PageHeader;
