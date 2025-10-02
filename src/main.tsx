import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import NavProvider from './context/navProvider.tsx'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { theme } from './theme.ts'

dayjs.extend(customParseFormat)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
            <DatesProvider settings={{ locale: 'fi' }}>
                <ModalsProvider>
                    <NavProvider>
                        <App />
                    </NavProvider>
                </ModalsProvider>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>
)
