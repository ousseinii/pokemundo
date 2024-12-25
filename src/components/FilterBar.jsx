export default function FilterBar({ children }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-4 py-2 px-4 rounded-full bg-slate-100">
      {children}
    </div>
  );
}
