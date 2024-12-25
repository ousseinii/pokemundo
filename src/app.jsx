import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import Header from "./components/Header";
import Main from "./components/Main";
import PokemonList from "./components/PokemonList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import GenerationButtons from "./components/GenerationButtons";
import HabitatFilter from "./components/HabitatFilter";
import PokemonModal from "./components/PokemonModal";

export function App() {
  const [data, setData] = useState([]); // Pokémon list
  const [filteredData, setFilteredData] = useState([]); // Filtered Pokémon list
  const [types, setTypes] = useState([]); // Pokémon types
  const [generation, setGeneration] = useState(null); // Selected generation
  const [selectedHabitat, setSelectedHabitat] = useState("");
  const [loading, setLoading] = useState(false); // Initial loading state
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(0); // Current page
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading more Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon sélectionné pour la modal
  const [showModal, setShowModal] = useState(false);

  // Function to fetch Pokémon data
  // Fonction pour récupérer les données des Pokémon avec les habitats
  // Fonction pour récupérer les données des Pokémon avec les habitats
  async function fetchData(page) {
    const limit = 20; // Nombre de Pokémon par page
    const offset = page * limit;

    try {
      // Récupération des Pokémon basiques
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const results = response.data.results;

      // Récupérer les habitats
      const habitatResponse = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-habitat/"
      );
      const habitats = habitatResponse.data.results;

      // Créer une map pour associer chaque Pokémon à son habitat
      const habitatMap = {};
      for (const habitat of habitats) {
        const habitatDetails = await axios.get(habitat.url);
        habitatDetails.data.pokemon_species.forEach((species) => {
          habitatMap[species.name] = habitat.name;
        });
      }

      // Récupérer les détails des Pokémon
      const detailedPokemon = await Promise.all(
        results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: pokemon.name,
            types: details.data.types.map((typeInfo) => typeInfo.type.name),
            image: details.data.sprites.front_default,
            habitat: habitatMap[pokemon.name] || "unknown", // Ajoute l'habitat ou "unknown" si non trouvé
            stats: details.data.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
          };
        })
      );

      return detailedPokemon;
    } catch (err) {
      throw new Error(
        "Erreur lors de la récupération des Pokémon et habitats."
      );
    }
  }

  // Load the initial Pokémon data
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      setError(null);

      try {
        const initialData = await fetchData(0); // Fetch first page
        setData(initialData);
        setFilteredData(initialData); // Set the initial filtered data
        setPage(1); // Set next page
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Load more Pokémon on scroll
  useEffect(() => {
    async function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && // 200px from bottom
        !isLoadingMore &&
        !loading
      ) {
        setIsLoadingMore(true);

        try {
          const moreData = await fetchData(page); // Fetch next page

          // Ajouter uniquement les nouveaux Pokémon (éviter les doublons)
          setData((prevData) => [
            ...prevData,
            ...moreData.filter(
              (newPokemon) =>
                !prevData.some(
                  (existingPokemon) => existingPokemon.id === newPokemon.id
                )
            ),
          ]);

          setFilteredData((prevFilteredData) => [
            ...prevFilteredData,
            ...moreData.filter(
              (newPokemon) =>
                !prevFilteredData.some(
                  (existingPokemon) => existingPokemon.id === newPokemon.id
                )
            ),
          ]); // Ajouter aux données filtrées sans doublons

          setPage((prevPage) => prevPage + 1); // Increment page
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoadingMore(false);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up event
  }, [isLoadingMore, loading, page, data, filteredData]);

  // Function to handle search
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered); // Update filtered data
  };

  // Charger les types Pokémon
  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        setTypes(response.data.results.map((type) => type.name));
      } catch (err) {
        console.error("Erreur lors de la récupération des types :", err);
      }
    }

    fetchTypes();
  }, []);

  // Filtrer les Pokémon par type
  const handleTypeSelect = (type) => {
    if (!type) {
      setFilteredData(data); // Aucun filtre, afficher tout
    } else {
      const filtered = data.filter((pokemon) => pokemon.types.includes(type));
      setFilteredData(filtered);
    }
  };

  const handleHabitatSelect = (habitat) => {
    setSelectedHabitat(habitat);

    // Appliquer le filtre
    if (habitat === "") {
      setFilteredData(data); // Aucun filtre : afficher tout
    } else {
      const filtered = data.filter((pokemon) => pokemon.habitat === habitat);
      setFilteredData(filtered);
    }
  };

  // Filter Pokémon by generation
  const handleGenerationSelect = (gen) => {
    setGeneration(gen);

    let filtered = data;
    if (gen === 1) {
      filtered = data.filter((pokemon) => pokemon.id >= 1 && pokemon.id <= 151);
    } else if (gen === 2) {
      filtered = data.filter(
        (pokemon) => pokemon.id >= 152 && pokemon.id <= 251
      );
    } else if (gen === 3) {
      filtered = data.filter(
        (pokemon) => pokemon.id >= 252 && pokemon.id <= 386
      );
    }
    setFilteredData(filtered);
  };

  const onPokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon); // Définit le Pokémon sélectionné
    setShowModal(true); // Affiche la modal
  };

  const closeModal = () => {
    setShowModal(false); // Masque la modal
    setSelectedPokemon(null); // Réinitialise le Pokémon sélectionné
  };

  return (
    <div className="h-screen my-16">
      <Header />
      <Main>
        <FilterBar>
          <SearchBar onSearch={handleSearch} />
          <TypeFilter types={types} onSelect={handleTypeSelect} />
          <HabitatFilter onHabitatSelect={handleHabitatSelect} />
          <GenerationButtons onGenerationSelect={handleGenerationSelect} />
        </FilterBar>
        {loading && (
          <p className="mt-4 text-center text-white">
            Chargement des Pokémon...
          </p>
        )}
        {!loading && !error && (
          <PokemonList data={filteredData} onPokemonClick={onPokemonClick} />
        )}{" "}
        {/* Use filteredData */}
        {isLoadingMore && (
          <p className="mt-4 text-center text-white">
            Chargement de plus de Pokémon...
          </p>
        )}
      </Main>
      {/* Afficher la modal si un Pokémon est sélectionné */}
      {/* Modal */}
      {showModal && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  );
}
