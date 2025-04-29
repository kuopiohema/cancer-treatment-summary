import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { DatesProvider } from '@mantine/dates'
import 'dayjs/locale/fi'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <DatesProvider settings={{ locale: 'fi', timezone: 'UTC' }}>
                <ModalsProvider>
                    <App />
                </ModalsProvider>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>
)
