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
import DataProvider from './context/DataProvider.tsx'
import { theme } from './theme.ts'
import StoreProvider from './store/StoreProvider.tsx'
import { Notifications } from '@mantine/notifications'

import { configure } from 'mobx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

dayjs.extend(customParseFormat)

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider defaultColorScheme="auto" theme={theme}>
                <DatesProvider settings={{ locale: 'fi' }}>
                    <ModalsProvider>
                        <StoreProvider>
                            <DataProvider>
                                <Notifications position="bottom-center" />
                                <App />
                            </DataProvider>
                        </StoreProvider>
                    </ModalsProvider>
                </DatesProvider>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>
)
