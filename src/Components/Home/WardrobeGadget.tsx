import { useSelector } from 'react-redux'
import styles from '../../assets/css/wardrobe-gadget.module.scss'
import { RootState } from '../../redux/store'
import { firstLetterUppercase } from '../../utils/strings'
import { generateItemTypeToIcon } from '../../utils/icons'

export const WardrobeGadget = () => {
  const wardrobe = useSelector((state: RootState) => state.wardrobe)

  const itemTypeToIcon = generateItemTypeToIcon(styles)
  
  return (
    <div className={styles.wardrobeGadget}>
      <div>
        Available Items
      </div>
      <div className={styles.itemCounts}>
        {
          (Object.keys(wardrobe) as Array<keyof typeof wardrobe>).map((key) => {
            return (
              <div className={styles.itemCount}>
                {
                  itemTypeToIcon[(key as keyof typeof itemTypeToIcon)]
                }
                <div className={styles.itemCountDigit}>
                  {
                    wardrobe[key] ?
                    <div>
                      {wardrobe[key].length}
                    </div> :
                    0
                  }
                </div>
                <div className={styles.itemCountType}>
                  {firstLetterUppercase(key)}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}