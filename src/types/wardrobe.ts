type PossibleWardrobeItemType = 'shoes' | 'pants' | 'shirt'

export type WardrobeItem = {
    id: number
    type: PossibleWardrobeItemType
    color: string
    size: number
    brand: string
    relevance?: number
}

export type ShoeItem = WardrobeItem & {
    type: 'shoes'
}

export type PantsItem = WardrobeItem & {
    type: 'pants'
}

export type ShirtItem = WardrobeItem & {
    type: 'shirt'
}

export type PostWardrobeChoiceResponse = {
    items: WardrobeItem[]
}