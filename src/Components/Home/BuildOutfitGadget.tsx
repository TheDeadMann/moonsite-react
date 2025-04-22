import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { generateItemTypeToIcon } from "../../utils/icons"
import styles from '../../assets/css/build-outfit-gadget.module.scss'
import { firstLetterUppercase } from "../../utils/strings"
import { NavLink } from "react-router-dom"
import { setItemTypeListed } from "../../redux/outfits/outfit-builder.slice"
import classNames from "classnames"

export const BuildOutfitGadget = () => {
    const outfitBuilder = useSelector((state: RootState) => state.outfitBuilder)
    const dispatch = useDispatch()

    const outfitItemTypes = Object.keys(outfitBuilder.items)
    const itemToIcon = generateItemTypeToIcon(styles)

    return (
        <div className={styles.buildOutfitGadget}>
            <div className={styles.gadgetDesciption}>Create New Outfit</div>
            {
                outfitItemTypes.map(outfitItemType => {
                    const icon = itemToIcon[outfitItemType as keyof typeof itemToIcon]
                    const itemExists = outfitBuilder.items[outfitItemType as keyof typeof outfitBuilder.items]

                    const handleButtonClick = (outfitItemType: keyof typeof outfitBuilder.items) => { 
                        dispatch(setItemTypeListed(outfitItemType))
                    }

                    return (
                        <NavLink onClick={() => handleButtonClick(outfitItemType as keyof typeof outfitBuilder.items)}
                        to='/wardrobe'
                        className={classNames(styles.itemTypeButton, itemExists && styles.itemTypeButtonActive)}>
                            <div className={styles.itemIconContainer}>
                                {icon}
                            </div>
                            <div>
                                <div>Select {firstLetterUppercase(outfitItemType)}</div>
                                <div className={styles.secondaryText}>
                                    {
                                        !itemExists ?
                                        'Choose from your collection' :
                                        `${firstLetterUppercase(itemExists.type)} ${itemExists.id}`
                                    }
                                </div>
                            </div>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
