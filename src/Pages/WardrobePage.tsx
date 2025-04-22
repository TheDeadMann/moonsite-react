import { useDispatch, useSelector, useStore } from "react-redux"
import { PageTitle } from "../Components/PageTitle"
import { RootState } from "../redux/store"
import { SubmitOutfitButton } from "../Components/Wardrobe/SubmitOutfitButton"
import { SegmentedControl, SegmentedControlItem } from "@mantine/core"
import styles from '../assets/css/wardrobe-page.module.scss'
import { OutfitItemsPreview } from "../Components/Wardrobe/OutfitItemsPreview"
import { setItemTypeListed } from '../redux/outfits/outfit-builder.slice'
import { OutfitItems } from "../types/outfit"
import { OutfitItemSelectors } from "../Components/Wardrobe/OutfitItemSelectors"
import { generateItemTypeToIcon } from "../utils/icons"

export const WardrobePage = () => {
  // 👇🏿 not importing the whole outfitBuilder state so that the component wont rerender instantly when SegmentedControl's onChange is called and cancel the transition
  const items = useSelector((state: RootState) => state.outfitBuilder.items)
  // 👇🏿 importing itemTypeListed using getState for the same reason as the import above
  const itemTypeListed = (useStore().getState() as RootState).outfitBuilder.itemTypeListed

  const dispatch = useDispatch()

  const itemTypeToIcon = generateItemTypeToIcon(styles)
  const segmentedControlValues: SegmentedControlItem[] = [
    {
      value: 'shirt',
      label: (
        <div className={styles.label}>
          {itemTypeToIcon['shirt']}
          <div className={styles.labelText}>Shirts</div>
        </div>
      )
    },
    {
      value: 'pants',
      label: (
        <div className={styles.label}>
          {itemTypeToIcon['pants']}
          <div className={styles.labelText}>Pants</div>
        </div>
      )
    },
    {
      value: 'shoes',
      label: (
        <div className={styles.label}>
          {itemTypeToIcon['shoes']}
          <div className={styles.labelText}>Shoes</div>
        </div>
      )
    }
  ]

  return (
    <>
      <PageTitle title='Wardrobe' />
      <div className={styles.wardrobePageContent}>
        <OutfitItemsPreview items={items} />
        <SubmitOutfitButton />
        <div className={styles.segmentedControl}>
          <SegmentedControl
            data={segmentedControlValues}
            defaultValue={itemTypeListed}
            onChange={(value) => dispatch(setItemTypeListed(value as keyof OutfitItems))}
            transitionDuration={500}
            classNames={{
              root: styles.root,
              label: styles.label,
              indicator: styles.indicator          
            }}
          />
        </div>
        <OutfitItemSelectors />
      </div>
    </>
  )
}
