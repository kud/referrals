export type Theme = "system" | "light" | "dark"

export const THEME_KEY = "theme"

// Runs in <head> before paint, so a pinned theme never flashes. "system"
// leaves data-theme unset and the CSS follows prefers-color-scheme.
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`
