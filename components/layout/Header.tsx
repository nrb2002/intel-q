export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-slate-800">
        Intel-Q
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">Welcome</span>
      </div>
    </header>
  );
}