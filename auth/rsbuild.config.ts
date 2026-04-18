import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { withZephyr } from "zephyr-rsbuild-plugin";

const plugins = [
  pluginReact(),
  pluginModuleFederation({
    name: "federation_auth",
    filename: "remoteEntry.js",
    exposes: {
      "./components": "./src/exports.ts",
    },
    shared: ["react", "react-dom"],
  }),
];

if (process.env.CI) {
  plugins.push(withZephyr());
}

export default defineConfig({
  output: {
    assetPrefix: "auto",
  },
  plugins,
  server: {
    port: 3000,
  },
});
