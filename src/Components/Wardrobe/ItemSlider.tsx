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
        dispatch(postWardrobeChoice(item))
    }

    // TODO - think of a better name
    const itemFromOutfitBuilder = Object.values(outfitBuilder.items).filter(item => item && item.type === items[0].type)[0]

    return (
        <div className={styles.slider}>
            {
                // TODO - should i check only for null? or is this fine?
                itemFromOutfitBuilder
                ? <div>{itemFromOutfitBuilder.id}</div>
                : items
                    .slice()
                    .sort((a, b) => (a.relevance && b.relevance ? a.relevance - b.relevance : 0))
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
