export default function Header() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
        Pokémundo
        <img
          src="/src/assets/images/pokemon.svg"
          alt="Pokemon logo"
          width="56"
        />
      </h1>
    </div>
  );
}
