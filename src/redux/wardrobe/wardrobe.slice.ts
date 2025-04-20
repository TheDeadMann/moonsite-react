import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { WardrobeItem, ShoeItem, PantsItem, ShirtItem, PostWardrobeChoiceResponse } from '../../types/wardrobe'
import { RootState } from '../store'
import { generateAIRequestBody } from '../../utils/wardrobeAI'

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

// TODO - make this file actually readable
const wardrobeSlice = createSlice({
    name: 'wardrobe',
    initialState,
    reducers: {
        removeItems: (state, action: PayloadAction<WardrobeItem[]>) => {
            const itemsToRemove = action.payload

            state.shoes = state.shoes.filter(
                shoe => !itemsToRemove.some(item => item.type === 'shoes' && item.brand === shoe.brand)
            )
            state.pants = state.pants.filter(
                pant => !itemsToRemove.some(item => item.type === 'pants' && item.brand === pant.brand)
            )
            state.shirts = state.shirts.filter(
                shirt => !itemsToRemove.some(item => item.type === 'shirt' && item.brand === shirt.brand)
            )
        },
        clearRelevance: (state) => {
            state.shoes = state.shoes.map(item => ({ ...item, relevance: undefined }))
            state.pants = state.pants.map(item => ({ ...item, relevance: undefined }))
            state.shirts = state.shirts.map(item => ({ ...item, relevance: undefined }))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWardrobe.fulfilled, (state, action) => {
            state.shoes = action.payload.filter(item => item.type === 'shoes') as ShoeItem[]
            state.pants = action.payload.filter(item => item.type === 'pants') as PantsItem[]
            state.shirts = action.payload.filter(item => item.type === 'shirt') as ShirtItem[]
        })
        .addCase(getWardrobe.pending, () => {
            console.log('Loading wardrobe...')
        })
        .addCase(getWardrobe.rejected, (state, action) => {
            console.error('Error loading wardrobe:', action.error.message)
            Object.assign(state, initialState)
        })

        builder.addCase(postWardrobeChoice.fulfilled, (state, action: PayloadAction<PostWardrobeChoiceResponse>) => { 
            // TODO - large code, maybe move to a separate function?
            if (action.payload.items.some(item => item.type === 'shoes')) {
                state.shoes = state.shoes.map(item => {
                    const newItem = action.payload.items.find(newItem => newItem.id === item.id)
                    if (newItem) {
                        return { ...item, relevance: newItem.relevance }
                    }
                    return item
                })
            }

            if (action.payload.items.some(item => item.type === 'pants')) {
                state.pants = state.pants.map(item => {
                    const newItem = action.payload.items.find(newItem => newItem.id === item.id)
                    if (newItem) {
                        return { ...item, relevance: newItem.relevance }
                    }
                    return item
                })
            }

            if (action.payload.items.some(item => item.type === 'shirt')) {
                state.shirts = state.shirts.map(item => {
                    const newItem = action.payload.items.find(newItem => newItem.id === item.id)
                    if (newItem) {
                        return { ...item, relevance: newItem.relevance }
                    }
                    return item
                })
            }
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

export const getWardrobe = createAsyncThunk<WardrobeItem[]>(
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
    async (selectedItems: WardrobeItem[], { getState }) => {
        const algoApiUrl = import.meta.env.VITE_ALGO_API
        if (!algoApiUrl) {
            throw new Error('ALGO_API is not defined')
        }
        
        const state = getState() as RootState
        
        // TODO - better complexity
        const availableItems = [
            // TODO - fix the relevance handling, no way i need to deconstruct everything just to remove the relevance property

            // removing the relevance property before sending the avilable items to the AI (the disable comment 👇🏿 is necessary to avoid eslint errors)
            ...state.wardrobe.shoes.map(({ relevance, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
            ...state.wardrobe.pants.map(({ relevance, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
            ...state.wardrobe.shirts.map(({ relevance, ...item }) => item) // eslint-disable-line @typescript-eslint/no-unused-vars
        ].filter(item =>
            // TODO - better type handling maybe?
            // TODO - using state.outfitBuilder is not good practice, fix it
            !Object.values(state.outfitBuilder.items).some((outfitItem: WardrobeItem | null) => outfitItem && outfitItem.type === item.type)
        )

        const requestBody = generateAIRequestBody(selectedItems, availableItems)

        const response = await axios.post(algoApiUrl, requestBody)
        if (response.status !== 200) {
            throw new Error('Failed to post wardrobe choice')
        }
        
        return response.data
    }
)

export const { removeItems } = wardrobeSlice.actions

export default wardrobeSlice.reducer