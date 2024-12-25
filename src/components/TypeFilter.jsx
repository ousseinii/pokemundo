export default function TypeFilter({ types, onSelect }) {
  const handleChange = (event) => {
    const selectedType = event.target.value;
    onSelect(selectedType); // Appeler la fonction de filtrage
  };

  return (
    <select
      className="rounded-full py-2 px-4 bg-gray-200 border-2 border-slate-800 text-slate-800 cursor-pointer"
      onChange={handleChange}
    >
      <option value="">Tous les types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
          {/* Mettre en majuscule la première lettre */}
        </option>
      ))}
    </select>
  );
}
