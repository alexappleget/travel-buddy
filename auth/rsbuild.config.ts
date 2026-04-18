import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { withZephyr } from "zephyr-rsbuild-plugin";

export default defineConfig({
  output: {
    assetPrefix: "auto",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "federation_auth",
      filename: "remoteEntry.js",
      exposes: {
        "./components": "./src/exports.ts",
      },
      shared: ["react", "react-dom"],
    }),
    withZephyr(),
  ],
  server: {
    port: 3000,
  },
});
