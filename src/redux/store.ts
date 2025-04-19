import { configureStore } from '@reduxjs/toolkit'
import wardrobeSlice from './wardrobe/wardrobe.slice'
import outfitBuilderSlice from './outfits/outfit-builder.slice'
import savedOutfitsSlice from './outfits/saved-outfits.slice'

const store = configureStore({
    reducer: {
        wardrobe: wardrobeSlice,
        outfitBuilder: outfitBuilderSlice,
        savedOutfits: savedOutfitsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store