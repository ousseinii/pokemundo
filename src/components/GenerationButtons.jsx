import { useState } from "preact/hooks";

export default function GenerationButtons({ onGenerationSelect }) {
  const [selectedGeneration, setSelectedGeneration] = useState(null);

  const handleGenerationClick = (generation) => {
    setSelectedGeneration(generation);
    onGenerationSelect(generation);
  };

  return (
    <div className="flex gap-4">
      <button
        className={`text-slate-800 border-2 py-2 px-4 rounded-full shadow-md ${
          selectedGeneration === 1
            ? "bg-green-500 border-black"
            : "bg-slate-100 border-slate-800 hover:bg-green-500"
        }`}
        onClick={() => handleGenerationClick(1)}
      >
        Génération 1
      </button>
      <button
        className={`text-slate-800 border-2 py-2 px-4 rounded-full shadow-md ${
          selectedGeneration === 2
            ? "bg-green-500 border-black"
            : "bg-slate-100 border-slate-800 hover:bg-green-500"
        }`}
        onClick={() => handleGenerationClick(2)}
      >
        Génération 2
      </button>
      <button
        className={`text-slate-800 border-2 py-2 px-4 rounded-full shadow-md ${
          selectedGeneration === 3
            ? "bg-green-500 border-black"
            : "bg-slate-100 border-slate-800 hover:bg-green-500"
        }`}
        onClick={() => handleGenerationClick(3)}
      >
        Génération 3
      </button>
    </div>
  );
}
