import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { withZephyr } from "zephyr-rsbuild-plugin";

const plugins = [
  pluginReact(),
  pluginModuleFederation({
    name: "federation_shell",
    remotes: {
      federation_auth:
        "federation_auth@http://localhost:3000/mf-manifest.json",
    },
    shared: ["react", "react-dom", "react-router-dom"],
  }),
];

if (process.env.CI) {
  plugins.push(withZephyr());
}

export default defineConfig({
  plugins,
  server: {
    port: 2000,
  },
});
