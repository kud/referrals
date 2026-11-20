"use client"

import type { CSSProperties } from "react"
import { ALL, useFilter } from "@/components/filter"
import { PixelRects, spriteSize } from "@/components/pixel-sprite"
import {
  body,
  head,
  lids,
  objectFor,
  plant,
  till,
} from "@/components/shop-sprites"

// Logical canvas: 320×180, scaled by a whole number (--s) in CSS.
const SHELF_Y = 48
const ZONE_TOP = 16
const COUNTER_Y = 128
const K = 2 // sprite pixels are drawn at 2×2 logical pixels
const SHELF_LEFT = 20
const SHELF_WIDTH = 280

const at = (x: number, y: number, w?: number, h?: number) =>
  ({
    "--x": x,
    "--y": y,
    ...(w === undefined ? {} : { "--bw": w }),
    ...(h === undefined ? {} : { "--bh": h }),
  }) as CSSProperties

export const ShopScene = () => {
  const { categories, selected, select } = useFilter()
  const slot = Math.floor(SHELF_WIDTH / Math.max(categories.length, 1))
  const start = SHELF_LEFT + (SHELF_WIDTH - slot * categories.length) / 2

  return (
    <div className="scene-frame">
      <div
        className="scene"
        role="group"
        aria-label="Shop counter: choose a shelf object to filter the offers"
      >
        <svg
          className="scene-backdrop"
          viewBox="0 0 320 180"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <rect className="px-A" x={0} y={0} width={320} height={COUNTER_Y} />
          <rect className="px-B" x={0} y={100} width={320} height={28} />
          <rect className="px-o" x={0} y={100} width={320} height={1} />

          <rect className="px-K" x={14} y={SHELF_Y} width={292} height={3} />
          <rect
            className="px-J"
            x={14}
            y={SHELF_Y + 3}
            width={292}
            height={1}
          />
          <rect className="px-J" x={24} y={SHELF_Y + 4} width={2} height={5} />
          <rect className="px-J" x={294} y={SHELF_Y + 4} width={2} height={5} />

          <g className="erwann" transform={`translate(136 66) scale(${K})`}>
            <PixelRects rows={body} x={0} y={17} />
            <rect className="px-C" x={0} y={27} width={24} height={4} />
            <g className="erwann-head">
              <PixelRects rows={head} x={3} y={0} />
              <g className="erwann-lids">
                <PixelRects rows={lids} x={3} y={0} />
              </g>
            </g>
          </g>

          <g
            transform={`translate(28 ${COUNTER_Y - K * spriteSize(till).height}) scale(${K})`}
          >
            <PixelRects rows={till} />
          </g>
          <g
            transform={`translate(262 ${COUNTER_Y - K * spriteSize(plant).height}) scale(${K})`}
          >
            <PixelRects rows={plant} />
          </g>

          <rect className="px-G" x={0} y={COUNTER_Y} width={320} height={4} />
          <rect
            className="px-o"
            x={0}
            y={COUNTER_Y + 4}
            width={320}
            height={1}
          />
          <rect
            className="px-F"
            x={0}
            y={COUNTER_Y + 5}
            width={320}
            height={47}
          />
          {[40, 120, 200, 280].map((x) => (
            <rect
              key={x}
              className="px-I"
              x={x - 30}
              y={COUNTER_Y + 12}
              width={60}
              height={32}
            />
          ))}
        </svg>

        <button
          type="button"
          className="scene-sign"
          style={at(136, 2, 48, 12)}
          aria-pressed={selected === ALL}
          onClick={() => select(ALL)}
        >
          All
        </button>

        {categories.map((category, index) => {
          const rows = objectFor(category)
          const { width, height } = spriteSize(rows)
          const left = Math.round(start + index * slot)

          return (
            <button
              key={category}
              type="button"
              className="scene-object"
              style={at(left, ZONE_TOP, slot, 46)}
              aria-pressed={selected === category}
              onClick={() => select(category)}
            >
              <svg
                className="scene-sprite"
                viewBox={`0 0 ${width} ${height}`}
                shapeRendering="crispEdges"
                aria-hidden="true"
                style={at(
                  Math.round((slot - K * width) / 2),
                  SHELF_Y - ZONE_TOP - K * height,
                  K * width,
                  K * height,
                )}
              >
                <PixelRects rows={rows} />
              </svg>
              <span
                className="scene-label"
                style={at(0, SHELF_Y - ZONE_TOP + 6, slot, 10)}
              >
                {category}
              </span>
            </button>
          )
        })}

        <span className="scene-mockup">Mock-up scene</span>
      </div>
    </div>
  )
}

export const FilterStatus = () => {
  const { selected, select } = useFilter()

  return (
    <p className="filter-status" aria-live="polite">
      {selected === ALL ? (
        "Showing every shelf."
      ) : (
        <>
          Showing {selected.toLowerCase()}.{" "}
          <button type="button" onClick={() => select(ALL)}>
            Show everything
          </button>
        </>
      )}
    </p>
  )
}
