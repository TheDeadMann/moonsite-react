import { configureStore } from '@reduxjs/toolkit'
import wardrobeSlice, { WardrobeState } from './wardrobe/wardrobe.slice'
import outfitBuilderSlice, { OutfitBuilderState } from './outfits/outfit-builder.slice'
import savedOutfitsSlice, { SavedOutfitsState } from './outfits/saved-outfits.slice'

type localStorageStore = {
    wardrobe: WardrobeState
    outfitBuilder: OutfitBuilderState
    savedOutfits: SavedOutfitsState
}

const localStorageValue = localStorage.getItem('reduxState')
const preloadedState: localStorageStore = localStorageValue && JSON.parse(localStorageValue)

const store = configureStore({
    reducer: {
        wardrobe: wardrobeSlice,
        outfitBuilder: outfitBuilderSlice,
        savedOutfits: savedOutfitsSlice
    },
    preloadedState
})

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store