import { defineConfig } from 'orval';

export default defineConfig({
  agora: {
    input: '../agora-backend-services/openapi-specs/agora-backend-service/openapi.yaml',
    output: {
      baseUrl: `$\{process.env.API_URL}`,
      client: 'fetch',
      mock: true,
      mode: 'split',
      target: './agora.ts',
      workspace: './app/modules/api/agora',
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write', 'eslint --fix'],
    },
  },
});
