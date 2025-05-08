import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from '@mantine/core'
import {ModalsProvider} from '@mantine/modals'
import {DatesProvider} from '@mantine/dates'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/fi'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import {theme} from './theme.ts'

dayjs.extend(customParseFormat)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
            <DatesProvider settings={{locale: 'fi'}}>
                <ModalsProvider>
                    <App />
                </ModalsProvider>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>
)
