import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple1: "#1A184E",
        blue1: "#0163FF",
        green1: "#96A630",
        bg1darkgradient: "#0f0330",
        bg1lightgradient: "#283471"
      }
    },
  },
  plugins: [],
}
export default config
