import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            tsDecorators: true,
        })
    ],
    base: '/cancer-treatment-summary/',
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        /*if (id.includes('react')) {
                            if (id.includes('tabler'))
                                return 'icons-react'
                            return 'react'
                        }*/
                        if (id.includes('mantine'))
                            return 'mantine'
                        if (id.includes('mobx'))
                            return 'mobx'
                        if (id.includes('tanstack'))
                            return 'tanstack'
                        if (id.includes('docx'))
                            return 'docx'
                        if (id.includes('dayjs'))
                            return 'dayjs'
                        return 'vendor'
                    }
                }
            }
        }
    }
})
