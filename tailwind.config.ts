import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: "#20C997",
                primary: {
                    DEFAULT: "#1A73E8",
                    dark: "#1558B0",
                }
            }
        },
    },
} satisfies Config;
