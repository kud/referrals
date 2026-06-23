const COINS = ["🪙", "💰", "💵", "🤑", "💸"]

export const CoinBurst = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {Array.from({ length: 10 }, (_, i) => (
      <span
        key={i}
        className="coin-burst"
        style={{
          left: `${10 + (i * 80) / 9}%`,
          animationDelay: `${(i % 5) * 40}ms`,
        }}
      >
        {COINS[i % COINS.length]}
      </span>
    ))}
  </div>
)
