import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavBar } from "./Components/NavBar/NavBar"
import { HomePage } from "./Pages/HomePage"
import { SavedPage } from "./Pages/SavedPage"
import { WardrobePage } from "./Pages/WardrobePage"
import styles from './assets/css/main.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./redux/store"
import { useEffect } from "react"
import { getWardrobe, removeItems } from "./redux/wardrobe/wardrobe.slice"
import { WardrobeItem } from "./types/wardrobe"

export const App = () => {
    const savedOutfits = useSelector((state: RootState) => state.savedOutfits)
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        dispatch(getWardrobe())
    }, [dispatch])

    // TODO - ugliest bit of code i have seen in my entire life, make it better ASAP
    useEffect(() => {
        dispatch(getWardrobe()).unwrap().then(wardrobeData => {
            const itemsToRemove: WardrobeItem[] = []

            savedOutfits.outfits.forEach(outfit => {
                const outfitItems = Object.values(outfit.outfitItems)
                outfitItems.forEach(outfitItem => {
                    const itemInWardrobeData = wardrobeData.some(item => item.type === outfitItem.type && item.brand === outfitItem.brand)
                    if (itemInWardrobeData) {
                        itemsToRemove.push(outfitItem)
                    }
                })
            })

            dispatch(removeItems(itemsToRemove))
        })
    }, [savedOutfits, dispatch])

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