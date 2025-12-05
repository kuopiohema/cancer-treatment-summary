import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'
import customParseFormat from 'dayjs/plugin/customParseFormat'

//import { configure } from 'mobx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import NavProvider from './nav/NavProvider.tsx'
import StoreProvider from './store/StoreProvider.tsx'
import { theme } from './theme.ts'

dayjs.extend(customParseFormat)

/*configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
})*/

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
            <DatesProvider settings={{ locale: 'fi' }}>
                <ModalsProvider>
                    <NavProvider>
                        <StoreProvider>
                            <Notifications position="bottom-center" />
                            <App />
                        </StoreProvider>
                    </NavProvider>
                </ModalsProvider>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>
)
