// Draws a pixel sprite from rows of characters. Each character is a palette
// key styled as `.px-<key>`; "." is transparent. Horizontal runs are merged.
export const PixelRects = ({
  rows,
  x = 0,
  y = 0,
}: {
  rows: string[]
  x?: number
  y?: number
}) => (
  <>
    {rows.flatMap((row, rowIndex) => {
      const runs: Array<{ start: number; length: number; key: string }> = []
      for (let col = 0; col < row.length; col += 1) {
        const key = row[col]
        if (key === "." || key === " ") continue
        const last = runs.at(-1)
        if (last && last.key === key && last.start + last.length === col) {
          last.length += 1
        } else {
          runs.push({ start: col, length: 1, key })
        }
      }
      return runs.map((run) => (
        <rect
          key={`${rowIndex}-${run.start}`}
          className={`px-${run.key}`}
          x={x + run.start}
          y={y + rowIndex}
          width={run.length}
          height={1}
        />
      ))
    })}
  </>
)

export const spriteSize = (rows: string[]) => ({
  width: Math.max(...rows.map((row) => row.length)),
  height: rows.length,
})

export const Sprite = ({ rows, label }: { rows: string[]; label?: string }) => {
  const { width, height } = spriteSize(rows)
  return (
    <svg
      className="sprite"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ ["--w" as string]: width, ["--h" as string]: height }}
      shapeRendering="crispEdges"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <PixelRects rows={rows} />
    </svg>
  )
}
