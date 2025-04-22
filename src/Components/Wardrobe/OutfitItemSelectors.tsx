import { useSelector } from "react-redux"
import { OutfitItemSelector } from "./OutfitItemSelector"
import { RootState } from "../../redux/store"
import styles from '../../assets/css/outfit-item-selectors.module.scss'

export const OutfitItemSelectors = () => {
  const wardrobe = useSelector((state: RootState) => state.wardrobe)
  const itemTypeListed = useSelector((state: RootState) => state.outfitBuilder.itemTypeListed)

  return (
    <div className={styles.outfitItemSelectors}>
      {
        (() => {
          switch (itemTypeListed) {
            case 'shirt':
              return <OutfitItemSelector items={wardrobe.shirts} />
            case 'pants':
              return <OutfitItemSelector items={wardrobe.pants} />
            case 'shoes':
              return <OutfitItemSelector items={wardrobe.shoes} />
          }
        })()
      }
    </div>
  )
}
