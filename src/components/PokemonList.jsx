import SinglePokemon from "./SinglePokemon";

export default function PokemonList({ data, error, onPokemonClick }) {
  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="p-6 bg-red-500 my-5 min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((pokemon) => (
          <SinglePokemon
            key={pokemon.id}
            pokemon={pokemon}
            onPokemonClick={onPokemonClick} // Passe la fonction ici
          />
        ))}
      </div>
    </div>
  );
}
