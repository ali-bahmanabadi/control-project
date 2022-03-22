import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/dark.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import MuiProvider from './components/provider/MuiProvider'

function App() {
    const { darkMode } = useContext(DarkModeContext)

    return (
        <MuiProvider>
            <div className={darkMode ? 'app dark' : 'app'}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </MuiProvider>
    )
}

export default App
