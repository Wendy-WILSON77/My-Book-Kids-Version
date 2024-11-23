/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx}",
  "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    customColor: '#E8311', 
    // ou bg-orange-400
  },
  plugins: [('flowbite/plugin')],
}

