/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'Nunito': ["Nunito","sans-serif"]
      },
      colors :{
        'nav': '#d1dadb',
        'yel' : '#fdc046'
      }
    },
  },
  plugins: [],
}

// .nunito-100 {
 
//   font-optical-sizing: auto;
//   font-weight: 400;
//   font-style: normal;
// }