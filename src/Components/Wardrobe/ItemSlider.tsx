import { useDispatch, useSelector } from 'react-redux'
import styles from '../../assets/css/item-slider.module.scss'
import { WardrobeItem } from '../../types/wardrobe'
import { AppDispatch, RootState } from '../../redux/store'
import { postWardrobeChoice } from '../../redux/wardrobe/wardrobe.slice'
import { setItem } from '../../redux/outfits/outfit-builder.slice'

interface Props {
    items: WardrobeItem[]
}

export const ItemSlider = ({items}: Props) => {
    const outfitBuilder = useSelector((state: RootState) => state.outfitBuilder)
    const dispatch = useDispatch<AppDispatch>()

    const handleItemClick = (item: WardrobeItem) => {
        dispatch(setItem(item))

        // TODO - think of a better name
        const outfitBuilderItems = Object.values(outfitBuilder.items).filter(item => item !== null).concat(item) // concating because the state updates after the function is completed

        dispatch(postWardrobeChoice(outfitBuilderItems))
    }

    // TODO - think of a better name, conflicts with outfitBuilderItems
    const itemFromOutfitBuilder = Object.values(outfitBuilder.items).filter(item => item && item.type === items[0].type)[0]

    return (
        <div className={styles.slider}>
            {
                // TODO - should i check only for null? or is this fine?
                itemFromOutfitBuilder
                ? <div>{itemFromOutfitBuilder.id}</div>
                : items
                    .slice()
                    .sort((a, b) => {
                        const relevanceA = a.relevance ?? Infinity
                        const relevanceB = b.relevance ?? Infinity
                        return relevanceA - relevanceB
                    })
                    .map((item) => {
                        return (
                            <button onClick={() => handleItemClick(item)} className={styles.itemButton} key={item.id}>
                                {item.id}
                            </button>
                        )
                    })
            }
        </div>
    )
}
