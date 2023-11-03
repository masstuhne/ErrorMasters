/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {

  content: [
      "./node_modules/flowbite/**/*.js"
  ]

}

module.exports = {

  plugins: [
      require('flowbite/plugin')
  ]

}

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    // ...
    "./node_modules/flowbite-react/**/*.js",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  // ...
};