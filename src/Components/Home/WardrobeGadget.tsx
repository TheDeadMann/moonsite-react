import { useSelector } from 'react-redux'
import styles from '../../assets/css/wardrobe-gadget.module.scss'
import { RootState } from '../../redux/store'

export const WardrobeGadget = () => {
  const wardrobe = useSelector((state: RootState) => state.wardrobe)
  
  return (
    <div className={styles.wardrobeGadget}>
        <div>{ wardrobe.shoes ? wardrobe.shoes.length : 0 } 👞</div>
        <div>{ wardrobe.pants ? wardrobe.pants.length : 0 } 👖</div>
        <div>{ wardrobe.shirts ? wardrobe.shirts.length : 0 } 👕</div>
    </div>
  )
}