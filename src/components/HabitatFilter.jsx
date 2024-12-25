export default function HabitatFilter({ onHabitatSelect }) {
  return (
    <select
      className="rounded-full py-2 px-4 bg-gray-200 border-2 border-slate-800 text-slate-800 cursor-pointer"
      onChange={(e) => onHabitatSelect(e.target.value)}
    >
      <option value="">Tous les habitats</option>
      <option value="forest">Forêt</option>
      <option value="mountain">Montagne</option>
      <option value="ocean">Océan</option>
      <option value="urban">Urbain</option>
    </select>
  );
}
