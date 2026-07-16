import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Duas entries: "/" = Atualização de Cartão (index.html), "/pagamento.html" = Pagamento direto.
// Sem router — cada fluxo é a sua própria página Vite (ver CLAUDE.md: "single-page, no-router").
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        pagamento: resolve(import.meta.dirname, 'pagamento.html'),
      },
    },
  },
})
