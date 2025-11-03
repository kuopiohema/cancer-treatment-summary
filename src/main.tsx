import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import { theme } from './theme.ts'
import StoreProvider from './store/StoreProvider.tsx'
import { Notifications } from '@mantine/notifications'

dayjs.extend(customParseFormat)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
            <DatesProvider settings={{ locale: 'fi' }}>
                <ModalsProvider>
                    <StoreProvider>
                        <Notifications position="bottom-center" />
                        <App />
                    </StoreProvider>
                </ModalsProvider>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>
)
