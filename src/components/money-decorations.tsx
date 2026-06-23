const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed) * 43758.5453
  return value - Math.floor(value)
}

export const FloatingMoney = () => (
  <div
    aria-hidden
    className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
  >
    {Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className="money-floating"
        style={{
          top: `${pseudoRandom(i + 1) * 80 + 10}vh`,
          left: `${pseudoRandom(i + 11) * 80 + 10}vw`,
          animationDelay: `${i}s`,
          animationDuration: `${5 + pseudoRandom(i + 21) * 3}s`,
        }}
      >
        💸
      </div>
    ))}
  </div>
)

export const HeroAmbience = () => (
  <div aria-hidden className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="absolute animate-pulse opacity-10"
          style={{
            left: `${pseudoRandom(i + 1) * 100}%`,
            top: `${pseudoRandom(i + 31) * 100}%`,
            animationDelay: `${pseudoRandom(i + 61) * 3}s`,
            animationDuration: `${3 + pseudoRandom(i + 91) * 2}s`,
          }}
        >
          <div className="text-green-400 text-4xl transform rotate-12">💵</div>
        </div>
      ))}

      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i + 12}
          className="absolute animate-bounce opacity-5"
          style={{
            left: `${pseudoRandom(i + 121) * 100}%`,
            top: `${pseudoRandom(i + 151) * 100}%`,
            animationDelay: `${pseudoRandom(i + 181) * 4}s`,
            animationDuration: `${2 + pseudoRandom(i + 211) * 3}s`,
          }}
        >
          <div className="text-yellow-400 text-6xl transform -rotate-12">
            💰
          </div>
        </div>
      ))}
    </div>

    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>

    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
    <div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-2xl animate-pulse"
      style={{ animationDelay: "1s" }}
    />
  </div>
)
