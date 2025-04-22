import { useDispatch } from 'react-redux'
import styles from '../../assets/css/saved-outfit.module.scss'
import { Outfit } from '../../types/outfit'
import { OutfitItemsPreview } from '../Wardrobe/OutfitItemsPreview'
import { removeOutfit } from '../../redux/outfits/saved-outfits.slice'
import { Trash2 } from 'lucide-react'

interface SavedOutfitProps {
    outfit: Outfit
}

export const SavedOutfit = ({ outfit }: SavedOutfitProps) => {
  const dispatch = useDispatch()
  
  const handleDelete = () => {
    dispatch(removeOutfit(outfit.id))
  }

  return (
    <div className={styles.savedOutfit}>
      <div className={styles.outfitDetails}>
        <div className={styles.outfitDetailsText}>
          <div className={styles.outfitId}>{outfit.id}</div>
          <div>Created At: {new Date(outfit.createdAt).toDateString()}</div>
            <div>Creation Time: {outfit.duration / 100} seconds</div>
        </div>
        <button onClick={handleDelete}><Trash2 color='red' /></button>
      </div>
      <OutfitItemsPreview items={outfit.outfitItems} isOutfitSaved />
    </div>
  )
}
