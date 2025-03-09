import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { description, displayName, version } from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "postbuild-commands",
      closeBundle: () => {
        const path = "./manifest.json";
        const outputPath = "./dist/manifest.json";
        const manifest = JSON.parse(fs.readFileSync(path).toString());

        manifest.name = displayName;
        manifest.description = description;
        manifest.version = version;

        fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
      },
    },
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        injectBundle: path.resolve(__dirname, "src/inject-bundle.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "injectBundle") {
            return "inject/page.js";
          }
          return "[name].js";
        },
      },
    },
  },
});
