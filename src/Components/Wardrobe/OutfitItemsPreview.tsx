import { OutfitBuilderState } from "../../redux/outfits/outfit-builder.slice"
import styles from '../../assets/css/outfit-items-preview.module.scss'
import { firstLetterUppercase } from "../../utils/strings"
import classNames from "classnames"
import { generateItemTypeToIcon } from "../../utils/icons.tsx"

interface OutfitItemsPreviewProps {
    items: OutfitBuilderState['items'],
    isOutfitSaved?: boolean
}

export const OutfitItemsPreview = ({ items, isOutfitSaved = false }: OutfitItemsPreviewProps) => {
  // necessary casting 👇🏿
  const itemsKeys = Object.keys(items) as unknown as (keyof typeof items)[]

  const itemTypeToIcon = generateItemTypeToIcon(styles)

  return (
    <div className={styles.outfitItemsPreview}>
      {itemsKeys.map(itemKey => {
        // TODO - avoid casting
        const key = itemKey as keyof typeof itemTypeToIcon
        const itemIcon = itemTypeToIcon[key]
        const item = items[itemKey]
        const itemPreviewText = item !== null ? `${firstLetterUppercase(itemKey)} ${item.id}` : `No ${key}`

        return (
          <div className={classNames(styles.itemPreview, !isOutfitSaved && item && styles.selectedItemPreview)} key={itemKey}>
            {itemIcon}
            <div className={styles.itemPreviewText}>{itemPreviewText}</div>
          </div>
        )
      })}
    </div>
  )
}
