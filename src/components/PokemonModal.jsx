export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-slate-800"
      onClick={onClose} // Ferme la modal quand on clique en dehors de la carte
    >
      <div
        className="bg-white p-6 rounded-lg w-80 max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Empêche de fermer la modal si on clique à l'intérieur de la carte
      >
        <button className="absolute top-2 right-2 p-2" onClick={onClose}>
          ❌
        </button>
        <img src={pokemon.image} alt={pokemon.name} className="w-full" />
        <h2 className="text-xl font-bold text-center mb-4">{pokemon.name}</h2>
        <div className="flex justify-between">
          <p className="bg-slate-100 text-center p-2 rounded-sm">
            <strong>Taille</strong> <br />
            <span>{pokemon.size || "Non spécifiée"}</span>
          </p>
          <p className="bg-slate-100 text-center p-2 rounded-sm">
            <strong>Poids</strong> <br />
            <span>{pokemon.weight || "Non spécifié"}</span>
          </p>
        </div>

        <div className="mt-4">
          {pokemon.stats.map((stat) => {
            const barColor = stat.value <= 50 ? "bg-red-500" : "bg-green-500";
            const barWidth = `${stat.value}%`;

            return (
              <div key={stat.name} className="mb-2">
                <p className="text-sm uppercase">
                  <span className="font-semibold">{stat.name}</span> : {""}
                  {stat.value}
                </p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 ${barColor} rounded-full`}
                        style={{ width: barWidth }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
