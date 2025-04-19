import styles from '../../assets/css/saved-outfit.module.scss'
import { Outfit } from '../../types/outfit'

interface SavedOutfitProps {
    outfit: Outfit
}

export const SavedOutfit = ({ outfit }: SavedOutfitProps) => {
  return (
    <div className={styles.savedOutfit}>
        {outfit.id}
    </div>
  )
}
