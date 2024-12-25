export default function SinglePokemon({ pokemon, onPokemonClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-300 hover:shadow-lg cursor-pointer"
      onClick={() => onPokemonClick(pokemon)} // Appelle la fonction avec les données du Pokémon
    >
      <p className="text-sm text-gray-500">#{pokemon.id}</p>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto my-2"
      />
      <p className="text-slate-800 capitalize font-bold text-lg">
        {pokemon.name}
      </p>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((type, idx) => (
          <span
            key={idx}
            className="text-xs font-semibold py-1 px-2 rounded-full bg-gray-200 text-gray-700"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
