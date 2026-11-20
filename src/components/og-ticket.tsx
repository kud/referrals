import { talon } from "@/lib/tints"

export const OG_SIZE = { width: 1200, height: 630 }

interface OgTicketProps {
  eyebrow: string
  title: string
  subtitle?: string | null
  label?: string | null
  body?: string | null
  stubLabel: string
  stubValue: string
  tint: string
}

// A Talon ticket for Open Graph images: main half on the left, stub on the
// right behind a dashed perforation with punched notches.
export const OgTicket = ({
  eyebrow,
  title,
  subtitle,
  label,
  body,
  stubLabel,
  stubValue,
  tint,
}: OgTicketProps) => {
  const stub = 320
  const notch = 22

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: talon.bg,
        color: talon.ink,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: 1080,
          height: 470,
          background: tint,
          borderRadius: 18,
          border: `2px solid ${talon.line}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "52px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: talon.muted }}>{eyebrow}</div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.05,
                marginTop: 18,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 28, color: talon.muted, marginTop: 12 }}>
                {subtitle}
              </div>
            )}
          </div>
          {body && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {label && (
                <div style={{ fontSize: 24, color: talon.muted }}>{label}</div>
              )}
              <div style={{ fontSize: 38, lineHeight: 1.25, marginTop: 6 }}>
                {body}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: stub,
            padding: "0 44px",
            borderLeft: `3px dashed ${talon.perforation}`,
          }}
        >
          <div style={{ fontSize: 24, color: talon.muted }}>{stubLabel}</div>
          <div style={{ fontSize: 40, fontWeight: 700, marginTop: 8 }}>
            {stubValue}
          </div>
          <div style={{ fontSize: 22, color: talon.muted, marginTop: 40 }}>
            referrals.kud.io
          </div>
        </div>

        {[-notch - 2, 470 - notch - 2].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              top,
              right: stub - notch - 2,
              width: notch * 2,
              height: notch * 2,
              borderRadius: notch,
              background: talon.bg,
              border: `2px solid ${talon.line}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
