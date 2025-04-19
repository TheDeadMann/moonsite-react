import { NavLink } from 'react-router-dom'
import styles from '../../assets/css/saved-gadget.module.scss'

export const SavedGadget = () => {
  return (
    <NavLink to="/saved" className={styles.savedGadget}>
        6
    </NavLink>
  )
}
