import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PantsItem, ShirtItem, ShoeItem, WardrobeItem } from '../../types/wardrobe'
import { OutfitItems } from '../../types/outfit'

// TODO - OutfitBuilder is still kind of a misguiding name, think of something better
// TODO - make the type readable
type OutfitBuilderState = {
    items: { [OutfitProperty in keyof OutfitItems]: (OutfitItems[OutfitProperty] | null) }
} & {
    startedAt: number | null // using timestamp because of redux serialization
    endedAt: number | null // using timestamp because of redux serialization
}

const initialState: OutfitBuilderState = {
    items : {
        shirt: null,
        pants: null,
        shoes: null
    },
    startedAt: null,
    endedAt: null
}

const outfitBuilderSlice = createSlice({
    name: 'outfitBuilder',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<WardrobeItem>) => {
            if (state.startedAt === null)
                state.startedAt = new Date().getTime()

            switch (action.payload.type) {
                case 'shirt':
                    state.items.shirt = action.payload as ShirtItem
                    break
                case 'pants':
                    state.items.pants = action.payload as PantsItem
                    break
                case 'shoes':
                    state.items.shoes = action.payload as ShoeItem
                    break
            }

            // TODO - is this readable enough?
            if (Object.values(state.items).every(item => item !== null)) {
                state.endedAt = new Date().getTime()
            }
        },
        clearOutfitBuilder: (state) => {
            state.items.shirt = null
            state.items.pants = null
            state.items.shoes = null
            state.startedAt = null
            state.endedAt = null
        }
    }
})

export const { setItem, clearOutfitBuilder } = outfitBuilderSlice.actions

export default outfitBuilderSlice.reducer