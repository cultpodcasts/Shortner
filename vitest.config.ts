import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          // Synthetic test value. Production sets `redirect` on the Worker (and in .dev.vars locally).
          bindings: { redirect: "https://cultpodcasts.example/podcast/" },
        },
      },
    },
    include: ["tests/**/*.tests.ts"]
  },
});
