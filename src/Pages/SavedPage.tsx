import { useSelector } from 'react-redux'
import { PageTitle } from '../Components/PageTitle'
import { SavedOutfit } from '../Components/Saved/SavedOutfit'
import styles from '../assets/css/saved-page.module.scss'
import { RootState } from '../redux/store'

export const SavedPage = () => {
  const savedOutfits = useSelector((state: RootState) => state.savedOutfits)

  return (
    <>
      <PageTitle title='Saved' />
      <div className={styles.savedOutfits}>
        {savedOutfits.outfits.map((outfit) => (
          <SavedOutfit key={outfit.id} outfit={outfit} />
        ))}
      </div>
    </>
  )
}
