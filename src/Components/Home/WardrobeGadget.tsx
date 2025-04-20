import { useSelector } from 'react-redux'
import styles from '../../assets/css/wardrobe-gadget.module.scss'
import { RootState } from '../../redux/store'

export const WardrobeGadget = () => {
  const wardrobe = useSelector((state: RootState) => state.wardrobe)
  
  return (
    <div className={styles.wardrobeGadget}>
      {
        (Object.keys(wardrobe) as Array<keyof typeof wardrobe>).map((key) => {
          return (
            <div className={styles.itemCountObject}>
              <div className={styles.itemCountDigit}>
                {
                  wardrobe[key] ?
                  <div>
                    {wardrobe[key].length}
                  </div> :
                  0
                }
              </div>
              <div>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}