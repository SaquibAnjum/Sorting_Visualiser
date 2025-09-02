/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'turquoise-dark': '#2B7A70',
                'carbon': '#2E2E2E',
                'carbon-light': '#393939',
                'white-light': '#ecf0f1',
                'slate': {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    safelist: [
        "bg-green-800", "bg-yellow-600", "bg-orange-700", "bg-red-800", "bg-lime-700",
        "text-cyan-300", "text-red-300", "text-slate-300", "text-cyan-400",
        "from-slate-900", "via-slate-800", "to-slate-900",
        "from-cyan-400", "to-blue-500",
        "from-slate-600", "to-slate-700",
        "hover:from-slate-500", "hover:to-slate-600",
        "bg-slate-800/50", "to-slate-900/50", "border-slate-700/50",
        "hover:bg-slate-700/30", "border-slate-600"
    ],
    plugins: [],
};
