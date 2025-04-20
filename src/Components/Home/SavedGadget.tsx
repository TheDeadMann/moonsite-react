import { NavLink } from 'react-router-dom'
import styles from '../../assets/css/saved-gadget.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const SavedGadget = () => {
  const savedOutfits = useSelector((state: RootState) => state.savedOutfits)

  return (
    <NavLink to="/saved" className={styles.savedGadget}>
        <div>
          Saved Outfits
        </div>
        <div className={styles.outfitCount}>
          {savedOutfits.outfits.length}
        </div>
    </NavLink>
  )
}