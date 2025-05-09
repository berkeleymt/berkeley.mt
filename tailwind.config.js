/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,md}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-hr": theme("colors.gray.300"),
            maxWidth: "none",
            h1: {
              fontWeight: "bold",
              marginTop: theme("spacing.16"),
              "&:first-child": { marginTop: 0 },
            },
            hr: {
              maxWidth: "50%",
              borderStyle: "dotted",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.8"),
            },
            th: {
              borderRightWidth: theme("borderWidth.DEFAULT"),
              "&:last-child": { borderRightWidth: 0 },
            },
            td: {
              borderRightWidth: theme("borderWidth.DEFAULT"),
              "&:last-child": { borderRightWidth: 0 },
            },
            a: {
              textDecoration: "none",
              fontWeight: "medium",
              color: theme("colors.blue.500"),
              transitionProperty: theme("transitionProperty.shadow"),
              transitionTimingFunction: theme(
                "transitionTimingFunction.in-out"
              ),
              transitionDuration: theme("transitionDuration.150"),
              boxShadow: `inset 0 -0.4em ${theme("colors.blue.100")}`,
              "&:hover": {
                boxShadow: `inset 0 -0.6em ${theme("colors.blue.200")}`,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
