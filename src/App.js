import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MuiProvider from './components/provider/MuiProvider'

function App() {
    return (
        <MuiProvider>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route Login path="login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </MuiProvider>
    )
}

export default App
