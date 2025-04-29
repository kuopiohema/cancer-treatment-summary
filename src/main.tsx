import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from '@mantine/core'
import {ModalsProvider} from '@mantine/modals'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <ModalsProvider>
                <App />
            </ModalsProvider>
        </MantineProvider>
    </StrictMode>
)
