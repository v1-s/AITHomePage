import { color } from "chart.js/helpers";
import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Match all files in the pages directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Match all files in the components directory
    "./src/styles/**/*.{js,ts,jsx,tsx,css}", // Match styles (if applicable)
    "./src/utils/**/*.{js,ts,jsx,tsx}", // Match utilities
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Match any remaining files in src
    "./layout.tsx",
  ],
  theme: {
    extend: {
      scrollbar: {
        thin: 'thin',
        thumb: 'transparent',
        track: 'transparent',
      },
      clipPath: {
        hexAgon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      },
      screens: {
        small: { max: "526px" },
        "xl-1376": "1273px",
        "1024-1200": { min: "1024px", max: "1200px" }, // Custom breakpoint at 1376px
        "400-600": { min: "400px", max: "600px" },
        "400-768": { min: "400px", max: "768px" },
      },
      scrollbarWidth: {
        none: 'none',  // Add a value for scrollbar width
      },
      colors: {
        loader: "#1C212E",
        maincolor_1: "#fc5417",
        mainBlue: "#0f82df",
        mainBlack: "#000000",
        shinywhite: "#FAFAFA",
        darkBlue: "#070e3d",
        lzRed: "#ED3C3F",
        ntrlclr: "rgba(0, 0, 0, 0.15)",
        bgRed: "#fb3059",
        transBlue: "rgb(28 133 218 / 77%)",
        SoftBlueBG: "#E3F2FD",
        SoftBlueBorder: "#2196F3",
        transmedium: "rgb(255 255 255 / 81%)",

        MutedGreenBG: "#E8F5E9",
        MutedGreenBorder: "#4CAF50",

        WarmYellowBg: "#FFF8E1",
        WarmYellowBorder: "#FFB300",

        LightCoralBg: "#FFEBEE",
        LightCoralBorder: "#E53935",

        SubtlePurpleBg: "#F3E5F5",
        SubtlePurpleBorder: "#9C27B0",

        ElegantGrayBg: "#F5F5F5",
        ElegantGrayBorder: "#9E9E9E",

        BrightCyanBg: "#E0F7FA",
        BrightCyanBorder: "#00ACC1",

        RichOrangeBg: "#FFF3E0",
        RichOrangeBorder: "#FB8C00",

        ClassicTealBg: "#E0F2F1",
        ClassicTealBorder: "#00796B",

        SoftPinkBg: "#FCE4EC",
        SoftPinkBorder: "#D81B60",
      },
      backgroundImage: {

        flowGradientBottom: "linear-gradient(180deg, #fff 31%, #f0f6ff 100%)",
        flowGradientTop:
          "linear-gradient(rgba(189, 233, 255, 0.3), rgba(255, 255, 255, 0))",
        heroSecBg:
          "linear-gradient(to right, rgba(98, 110, 163, 0.72), hsl(339, 90%, 88%))",
        gradentBlue: "linear-gradient(to right, #0b82da, #1488CC)",
        gradientBlue: "radial-gradient(73.81% 78.2% at 82.32% 85.58%, #0b82da,0%, #1e2d3e 100%)",
        gradientGrayToBeige:
          "linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)",
        gradientWhiteOverlay:
          "linear-gradient(181.98deg, rgba(245, 245, 245, 0.9) 1.36%, rgba(255, 255, 255, 0.9) 99.56%)",
        gradientWipe:
          "linear-gradient(to left, #ef4646 20%, rgba(255, 223, 0, 0.8) 40%, rgba(156, 140, 251, 0.6) 60%, #fb3059 80%)",
        gradientRed:
          "radial-gradient(73.81% 78.2% at 82.32% 85.58%, #ee2c3c 0%, #1e2d3e 100%)",
        gradientPurple:
          "radial-gradient(73.81% 78.2% at 82.32% 85.58%, #7b6efc 0%, #1e2d3e 100%)",
        gradientGreen:
          "radial-gradient(73.81% 78.2% at 82.32% 85.58%, #0dae6b 0%, #1e2d3e 100%)",
        gardientCertificate:
          "linear-gradient(to left, #24243e, #302b63, #0f0c29)",
        Bg1: "url('/assets/images/Bg1.jpg')",
        Bg2: "url('/assets/images/Bg2.jpg')",
        BgWorldmap: "url('/assets/images/world-map2.png')",
        bannerBg: "url('/assets/images/banner.jpg')",
        bannerBg3: "url('/assets/images/office.jpg')",
        bannerBg4: "url('/assets/images/contact.jpg')",
        gradientStatsBg:"linear-gradient(to right,rgb(157, 147, 199), #7bc6cc)",
        bannerBg5: "url('/assets/images/hirebg4.jpg')",
        contactBg:"url('/assets/images/contctusbg.jpg')",
        contactBg2:"url('/assets/images/contactusBg4.jpg')"
      },

      // Custom fonts
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Adding Poppins with serif as fallback
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "900",
      },
      fontSize: {
        20: "20px",
        45: "45px",
        11: "2.75rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        hero: "45px",
        subheading: "21px",
        50: "50px",
        72: "18rem", // Custom font size
        40: "40px",
        35: "35px",
      },
      lineHeight: {
        tight: "1.2",
        custom: "1.8",
      },
      boxShadow: {
        none: "none",
        soft: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        card: "0px 4px 7px rgba(0, 0, 0, 0.2)",
        hard: "0px 5px 15px rgba(0, 0, 0, 0.35)",
       
        glassShadow: "rgba(182, 190, 252, 0.511) 0px 0px 13px",
        inside:
          "inset 0px 10px 20px rgba(0, 0, 0, 0.3), inset 0px -10px 20px rgba(0, 0, 0, 0.3)",
        insideSoft:
          "inset 0px 6px 8px rgba(0, 0, 0, 0.1), inset 0px -6px 8px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "20px": "20px",
        "16px": "16px",
        "br-40": "40px", // Custom radius for bottom-right corner
        "tl-40": "40px", // Custom radius for top-left corner
        "tr-40": "40px",
        "bl-40": "40px",
      },
      spacing: {
        N15: "-15px",
        N20: "-20px",
        N25: "-25px",
        N26p: "-26%",
        N30: "-30px",
        "36p": "36%",
        15: "15rem",
        75: "4.688rem",
        96: "24rem",
        128: "32rem",
        45: "45px",
        30: "30px",
        70: "76px",
        0.5: "0.12rem",
        0.1: "0.1rem",
        80: "20rem",
        60: "15rem",
      },
      animation: {
        "fade-in-left": "fade-in-left 1s ease-out forwards",
        "fade-in-right": "fade-in-right 1s ease-out forwards",
        fadeOutLeft: 'fadeOutLeft 1s ease-in-out',
        fadeInRight: 'fadeInRight 1s ease-in-out',
        fadeUp: "fadeUp 0.8s ease-out", //for global
        typewriter: 'typewriter 4s steps(40) forwards',
        blink: 'blink 1s step-end infinite',
        shimmer: "shimmer 2s infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        bounceLight: "bounceLight 1.5s infinite",
        expandWidth: "expandWidth 0.7s linear forwards",
        expandHeight: "expandHeight 0.7s linear forwards",
        slide: "slide 20s linear infinite",
        slideReverse: "slideReverse 20s linear infinite",
        cardSlide: "cardSlide 20s linear infinite",
        carouselSlideReverse: "carouselSlideReverse 20s linear infinite",
        infiniteScroll: "infiniteScroll 80s linear infinite",
        circularMotion: "circularMotion 20s linear infinite",
        slideIn: "slideInLeft 0.8s ease-in-out forwards",
        imageSlideIn: "slideInLeft 0.8s ease-in-out forwards",
        textSlideIn: "slideInLeft 0.8s ease-in-out forwards",
        Marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        fadeOutLeft: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        typewriter: {
          '0%': { width: '0', left: '50%' },
          '50%': { width: '0', left: '50%' },
          '100%': { width: '100%', left: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          "0%": {
            transform: " rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },

        slideInLeft: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0%)", opacity: "1" },
        },
        slide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-calc(100% + 260px))" },
        },
        slideReverse: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(calc(100% + 260px))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        expandHeight: {
          from: { height: "0" },
          to: { height: "90px" },
        },
        expandWidth: {
          "0%": { width: "0" },
          "100%": { width: "3rem" },
        },
        shimmerMove: {
          "0%": { left: "-15%", opacity: "0" },
          "50%": { left: "50%", opacity: "1" },
          "100%": { left: "115%", opacity: "0" },
        },
        bounceLight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
        cardSlide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        carouselSlideReverse: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        infiniteScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        circularMotion: {
          "0%": {
            transform: " translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addBase }: PluginAPI) {
      addBase({
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      });
    },
    function ({ addUtilities }:PluginAPI) {
      addUtilities({
        '.hide-scrollbar': {
          'scrollbar-width': 'none',  // Firefox
          '-ms-overflow-style': 'none',  // IE 10+
          '&::-webkit-scrollbar': {
            display: 'none',  // Webkit-based browsers
          },
          
        },
      });
    },
    function ({ addComponents }: PluginAPI) {
      addComponents({
        
        ".btn-primary": {
          "--tw-bg-opacity": "1",
          backgroundColor: "rgb(239 68 68 / var(--tw-bg-opacity))",
          color: "#FAFAFA", // text-shinywhite
          height: "2.5rem", // h-10
          marginTop: "1rem", // mt-4
          letterSpacing: "0.05em", // tracking-wide
          position: "relative", // relative
          overflow: "hidden", // overflow-hidden
          display: "inline-flex", // text-center aligns well with flexbox
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0.5rem", // rounded-lg
          paddingLeft: "0.75rem", // px-3
          paddingRight: "0.75rem",
          animation: "fadeIn 0.5s ease-in-out, shimmer 2s infinite", // animation-fadeIn and animation-shimmer
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "", // hover:bg-red-700
            color: "#fff",
          },
          "&:focus": {
            outline: "none", // focus:outline-none
            boxShadow: "0 0 0 2px rgba(255, 69, 0, 0.5)", // focus:ring-red-500
          },
        },

        // Transparent Buttons
        ".btn-hover-bg-transition": {
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.75rem 1.5rem",
          fontWeight: "700",
          fontSize: "1rem",
          border: "2px solid #fff", // Border for transparent buttons
          color: "#fff", // Default text color
          backgroundColor: "transparent", // Transparent background by default
          borderRadius: "0.375rem",
          overflow: "hidden",
          transition:
            "color 0.15s cubic-bezier(.4, 0, .2, 1), border-color 0.6s ease",
        },

        ".btn-hover-bg-transition::before": {
          content: '""',
          position: "absolute",
          top: "0",
          left: "-100%",
          width: "100%",
          height: "100%",
          backgroundColor: "var(--bg-color)", // Dynamic background color
          zIndex: "0",
          transition: "left 0.6s ease", // Smooth sliding effect
        },

        ".btn-hover-bg-transition:hover::before": {
          left: "0", // Slide background in from the left
        },

        ".btn-hover-bg-transition:hover": {
          color: "var(--hover-text-color, #fff)", // Hover text color
          borderColor: "var(--bg-color)", // Match border color with the background
        },

        ".btn-hover-bg-transition span": {
          position: "relative",
          zIndex: "1", // Keep text on top of the pseudo-element
        },

        // Transparent Variations
        ".btn-hover-bg-transition-og": {
          "--bg-color": "#FF4500", // Orangered background
        },

        ".btn-hover-bg-transition-white": {
          "--bg-color": "#ffffff", // White background
          color: "black", // Black text
        },

        ".btn-hover-bg-transition-black": {
          "--bg-color": "#000000", // Black background
        },

        // Solid Buttons
        ".btn-solid-bg-transition": {
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.75rem 1.5rem",
          fontWeight: "700",
          fontSize: "1rem",
          border: "2px solid transparent", // No visible border for solid buttons
          color: "var(--text-color, #fff)", // Default text color
          backgroundColor: "var(--bg-color)", // Dynamic background color
          borderRadius: "0.375rem",
          overflow: "hidden",
          transition: "background-color 0.6s ease, color 0.6s ease",
        },

        ".btn-solid-bg-transition::before": {
          content: '""',
          position: "absolute",
          top: "0",
          left: "-100%", // Start off-screen
          width: "100%",
          height: "100%",
          backgroundColor: "var(--hover-bg-color)", // Hover background color
          zIndex: "0",
          transition: "left 0.6s ease", // Smooth sliding effect
        },

        ".btn-solid-bg-transition:hover::before": {
          left: "0", // Bring background into view
        },

        ".btn-solid-bg-transition:hover": {
          backgroundColor: "var(--hover-bg-color)", // Background color changes on hover
          color: "var(--hover-text-color, #fff)", // Text color on hover
        },

        ".btn-solid-bg-transition span": {
          position: "relative",
          zIndex: "1", // Keep text above the pseudo-element
        },

        // Solid Variations
        ".btn-solid-bg-transition-orange": {
          "--bg-color": "#FF4500", // Orangered background
          "--hover-bg-color": "#000000", // Black on hover
          "--text-color": "#fff",
          "--hover-text-color": "#fff",
        },

        ".btn-solid-bg-transition-black": {
          "--bg-color": "#000000", // Black background
          "--hover-bg-color": "#FF4500", // Orangered on hover
          "--text-color": "#fff",
          "--hover-text-color": "#fff",
        },
        
      });
    },
  ],
};

export default config;

