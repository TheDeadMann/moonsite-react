import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavBar } from "./Components/NavBar/NavBar"
import { HomePage } from "./Pages/HomePage"
import { SavedPage } from "./Pages/SavedPage"
import { WardrobePage } from "./Pages/WardrobePage"
import styles from './assets/css/main.module.scss'
import { useDispatch } from "react-redux"
import { AppDispatch } from "./redux/store"
import { useEffect } from "react"
import { getWardrobe } from "./redux/wardrobe/wardrobe.slice"

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        dispatch(getWardrobe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <NavBar />
            <div className={styles.page}>
                <Routes>
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/wardrobe" element={<WardrobePage />} />
                    <Route path="/saved" element={<SavedPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}