import { PantsItem, ShirtItem, ShoeItem } from "./wardrobe"

export type OutfitItems = {
    shirt: ShirtItem
    pants: PantsItem
    shoes: ShoeItem
}

export type Outfit = {
    id: string
    createdAt: number // using timestamp because of redux serialization
    duration: number
    outfitItems: OutfitItems
}