import { useDispatch, useSelector } from 'react-redux'
import styles from '../../assets/css/outfit-item-selector.module.scss'
import { WardrobeItem } from '../../types/wardrobe'
import { AppDispatch, RootState } from '../../redux/store'
import { postWardrobeChoice } from '../../redux/wardrobe/wardrobe.slice'
import { setItem } from '../../redux/outfits/outfit-builder.slice'
import { firstLetterUppercase } from '../../utils/strings'
import { generateItemTypeToIcon } from '../../utils/icons'
import classNames from 'classnames'

interface Props {
    items: WardrobeItem[]
}

// TODO - add loading until postWardrobeChoice fulfilled
export const OutfitItemSelector = ({items}: Props) => {
    const outfitBuilder = useSelector((state: RootState) => state.outfitBuilder)
    const dispatch = useDispatch<AppDispatch>()

    const handleItemClick = (item: WardrobeItem) => {
        dispatch(setItem(item))

        // TODO - think of a better name
        const outfitBuilderItems = Object.values(outfitBuilder.items).filter(item => item !== null).concat(item) // concating because the state updates after the function is completed

        dispatch(postWardrobeChoice(outfitBuilderItems))
    }

    const selectedItem = Object.values(outfitBuilder.items).filter(item => item && item.type === items[0].type)[0]
    const itemTypeToIcon = generateItemTypeToIcon(styles)

    return (
        <div className={styles.outfitItemSelector}>
            {
                items
                    .slice()
                    .sort((a, b) => {
                        const relevanceA = a.relevance ?? Infinity
                        const relevanceB = b.relevance ?? Infinity
                        return relevanceA - relevanceB
                    })
                    .map((item) => {
                        const isItemSelected = selectedItem && selectedItem.id === item.id

                        return (
                            <button onClick={() => handleItemClick(item)}
                            className={classNames(styles.itemButton, isItemSelected && styles.itemButtonSelected)}
                            key={item.id}>
                                {itemTypeToIcon[item.type]}
                                <div className={styles.itemDetails}>
                                    <div className={styles.shirtId}>{firstLetterUppercase(item.type)} {item.id}</div>
                                    <div className={styles.itemBrand}>{item.brand}</div>
                                    <div className={styles.colorAndSizeContainer}>
                                        <div>Size: {item.size}</div>
                                        <div>Color: {firstLetterUppercase(item.color)}</div>
                                    </div>
                                </div>
                            </button>
                        )
                    })
            }
        </div>
    )
}
