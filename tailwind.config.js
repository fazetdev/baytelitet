/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Bayt Elite Custom Color Palette ---
        'bayt-dark': '#141A23',       // Deep Blue/Indigo (Primary Base)
        'bayt-light': '#E6E8EB',      // Off-White/Light Gray (Primary Content)
        'bayt-warm': '#D0AC7A',       // Subtle Warm Gold/Bronze (Primary Accent/CTAs)
        'bayt-cool': '#99AAB5',       // Subtle Gray/Cool (Secondary Accent)
        'bayt-cultural': '#529B7F',   // Desert Sage Green (Cultural Features)
      }
    },
  },
  plugins: [],
}
