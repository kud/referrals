const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed) * 43758.5453
  return value - Math.floor(value)
}

export const HeroAmbience = () => (
  <div aria-hidden className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

    {Array.from({ length: 4 }, (_, i) => (
      <div
        key={`float-${i}`}
        className="money-floating"
        style={{
          top: `${pseudoRandom(i + 1) * 70 + 15}%`,
          left: `${pseudoRandom(i + 11) * 70 + 15}%`,
          animationDelay: `${i * 1.5}s`,
          animationDuration: `${7 + pseudoRandom(i + 21) * 3}s`,
        }}
      >
        💸
      </div>
    ))}

    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={`bill-${i}`}
        className="absolute animate-pulse opacity-[0.05]"
        style={{
          left: `${pseudoRandom(i + 1) * 100}%`,
          top: `${pseudoRandom(i + 31) * 100}%`,
          animationDelay: `${pseudoRandom(i + 61) * 3}s`,
          animationDuration: `${4 + pseudoRandom(i + 91) * 2}s`,
        }}
      >
        <div className="text-green-400 text-4xl rotate-12">💵</div>
      </div>
    ))}

    <div className="absolute inset-0 opacity-[0.04]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>

    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-2xl animate-pulse" />
    <div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/15 to-yellow-500/15 rounded-full blur-2xl animate-pulse"
      style={{ animationDelay: "1s" }}
    />
  </div>
)
