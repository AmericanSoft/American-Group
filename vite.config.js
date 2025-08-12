// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // أي طلب يبدأ بـ /gas هيتحوّل لـ Google Apps Script
      '/gas': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: true,
        // حط هنا الpath الكامل بتاع Web App بتاعك
        // المسار التالي هيستبدل "/gas" بالمصّار الفعلي لـ /macros/s/.../exec
        rewrite: (path) =>
          path.replace(
            /^\/gas/,
            '/macros/s/AKfycbyUdYoLleNVQ6ame6GJzkOs6GW8vJjBR7xIMXj7uDgrEfpKJi5wcFTHc5gSYQZ68Wbm/exec'
          ),
      },
    },
  },
})
