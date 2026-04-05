function LoadingState({ message = "Cargando información..." }) {
  return (
    <div className="card flex min-h-[220px] flex-col items-center justify-center p-8 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-brand-blue" />
      <p className="mt-4 text-sm font-medium text-brand-muted">{message}</p>
    </div>
  );
}

export default LoadingState;
