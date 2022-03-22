import { createTheme, ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
    typography: {
        fontFamily: ['IRANSans', 'sans-serif'].join(','),
    },
})
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
    
})

const MuiProvider = ({ children }) => {
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
    )
}

export default MuiProvider
