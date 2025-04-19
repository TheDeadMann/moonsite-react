import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { WardrobeItem, ShoeItem, PantsItem, ShirtItem } from '../../types/wardrobe'
import { RootState } from '../store'

interface WardrobeState {
    shoes: ShoeItem[],
    pants: PantsItem[],
    shirts: ShirtItem[]
}

const initialState: WardrobeState = {
    shoes: [],
    pants: [],
    shirts: []
}

const wardrobeSlice = createSlice({
    name: 'wardrobe',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // reset: (state) => {
        //     state.value = 0
        // },
        // setValue: (state, action: PayloadAction<number>) => {
        //     state.value = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getWardrobe.fulfilled, (state, action) => {
            state.shoes = action.payload.filter((item: WardrobeItem) => item.type === 'shoes')
            state.pants = action.payload.filter((item: WardrobeItem) => item.type === 'pants')
            state.shirts = action.payload.filter((item: WardrobeItem) => item.type === 'shirt')
        })
        .addCase(getWardrobe.pending, () => {
            console.log('Loading wardrobe...')
        })
        .addCase(getWardrobe.rejected, (state, action) => {
            console.error('Error loading wardrobe:', action.error.message)
            Object.assign(state, initialState)
        })

        builder.addCase(postWardrobeChoice.fulfilled, (state, action) => {
            // TODO - fix the shitty types
            // TODO - move to function, repetetive code
            if (action.payload.items.some((item: WardrobeItem) => item.type === 'shoes'))
                state.shoes = action.payload.items.filter((item: WardrobeItem) => item.type === 'shoes')

            if (action.payload.items.some((item: WardrobeItem) => item.type === 'pants'))
                state.pants = action.payload.items.filter((item: WardrobeItem) => item.type === 'pants')

            if (action.payload.items.some((item: WardrobeItem) => item.type === 'shirt'))
                state.shirts = action.payload.items.filter((item: WardrobeItem) => item.type === 'shirt')
        })
        .addCase(postWardrobeChoice.pending, () => {
            console.log('Loading wardrobe...')
        })
        .addCase(postWardrobeChoice.rejected, (state, action) => {
            console.error('Error loading wardrobe:', action.error.message)
            Object.assign(state, initialState)
        })
    }
})

export const getWardrobe = createAsyncThunk(
    'wardrobe/getWardrobe',
    async () => {
        const response = await axios.get('/data.json')
        if (response.status !== 200) { // this will never happen because the file is local. doing it for best practice.
            throw new Error('Failed to fetch wardrobe')
        }
        return response.data
    }
)

export const postWardrobeChoice = createAsyncThunk(
    'wardrobe/postWardrobeChoice',
    async (selectedItem: WardrobeItem, { getState }) => {
        const algoApiUrl = import.meta.env.VITE_ALGO_API
        if (!algoApiUrl) {
            throw new Error('ALGO_API is not defined')
        }
        
        const state = getState() as RootState
        
        // TODO - better complexity handling
        const availableItems = [
            // TODO - fix the relevance handling, no way i need to deconstruct everything just to remove the relevance property

            // removing the relevance property before sending the avilable items to the AI (the disable comment 👇🏿 is necessary to avoid eslint errors)
            ...state.wardrobe.shoes.map(({ relevance, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
            ...state.wardrobe.pants.map(({ relevance, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
            ...state.wardrobe.shirts.map(({ relevance, ...item }) => item) // eslint-disable-line @typescript-eslint/no-unused-vars
        ].filter(item =>
            // TODO - better type handling maybe?
            !Object.values(state.outfitBuilder).some((outfitItem: WardrobeItem | null) => outfitItem && outfitItem.type === item.type)
        )

        // TODO - move this somewhere else
        // from backend perspective, this 👇🏿 is not best practice at all. only doing it because the project is supposed to asess my frontend skills and coding a dedicated backend server feels like cheating 🤔
        const requestBody = {
            system: "You are a fashion recommendation expert. Your job is to suggest clothing items that go well together in terms of size and color. You help users build a stylish outfit consisting of a shirt, pants, and shoes. Each clothing item has: - an id (which must be preserved in the output) - a type: shirt, pants, or shoes - a brand - a color - a size (shirts use sizes S–XXL; pants and shoes use numeric sizes). The user selects one item to start with. Based on this item, you evaluate the rest of the clothing items and assign each one a relevance score from 0 (best match) to 100 (worst match). Guidelines: 1. Size compatibility: Use rough mapping between clothing types (e.g., shoe size 45 likely means shirt size XL or XXL). 2. Color matching: Avoid clashing colors and favor complementary or neutral tones. Your response must be JSON like this: {\"items\": [{\"id\": \"item_123\", \"type\": \"pants\", \"brand\": \"Levi's\", \"color\": \"dark blue\", \"size\": 32, \"relevance\": 5}]}. Response without ```json and ```.",
            user: `The user has selected: ${JSON.stringify(selectedItem)}. Please evaluate the following available clothing items and assign a relevance score to each one: ${JSON.stringify(availableItems)}`
        }

        const response = await axios.post(algoApiUrl, requestBody)
        if (response.status !== 200) {
            throw new Error('Failed to post wardrobe choice')
        }
        
        console.log(response.data)
        return response.data
    }
)

// export const {  } = counterSlice.actions

export default wardrobeSlice.reducer