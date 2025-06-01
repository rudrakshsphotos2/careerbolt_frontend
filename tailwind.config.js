module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // This prevents Tailwind from resetting WordPress styles
  },
  important: '#resume-builder', // This makes all Tailwind styles more specific
};