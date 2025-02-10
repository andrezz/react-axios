import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [dts({include: 'lib', rollupTypes: true, tsconfigPath: './tsconfig.app.json' }), react()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: "./lib/index.ts",
      name: "reactAxios",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["axios", "react", "react-dom", 'react/jsx-runtime'],
      output: {
        globals: {
          axios: "axios",
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime"
        },
      },
    },
  },
});
