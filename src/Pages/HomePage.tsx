import styles from '../assets/css/home-page.module.scss'
import { SavedGadget } from '../Components/Home/SavedGadget'
import { WardrobeGadget } from '../Components/Home/WardrobeGadget'
import { PageTitle } from '../Components/PageTitle'

export const HomePage = () => {
  return (<>
      <PageTitle title='Home' />

      <div className={styles.gadgetsContainer}>
        <SavedGadget />
        <WardrobeGadget />
      </div>
    </>
  )
}