import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Outfit } from '../../types/outfit'

export interface SavedOutfitsState {
    outfits: Outfit[]
}

const initialState: SavedOutfitsState = {
    outfits: []
}

const savedOutfitsSlice = createSlice({
    name: 'savedOutfits',
    initialState,
    reducers: {
        addOutfit: (state, action: PayloadAction<Outfit>) => {
            state.outfits.push(action.payload)
        },
        removeOutfit: (state, action: PayloadAction<Outfit['id']>) => {
            state.outfits = state.outfits.filter(outfit => outfit.id !== action.payload)
        }
    }
})

export const { addOutfit, removeOutfit } = savedOutfitsSlice.actions

export default savedOutfitsSlice.reducer