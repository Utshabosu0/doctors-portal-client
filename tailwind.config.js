module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: "#FFFFFF",
          secondary: "#DAE7FC",
          accent: "#3A4256",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
