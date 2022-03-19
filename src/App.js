import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/dark.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
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

function App() {
    const { darkMode } = useContext(DarkModeContext)

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div className={darkMode ? 'app dark' : 'app'}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<Home />} />
                            <Route path="login" element={<Login />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default App
