import { useDispatch, useSelector } from 'react-redux'
import styles from '../../assets/css/submit-outfit-button.module.scss'
import { RootState } from '../../redux/store'
import { addOutfit } from '../../redux/outfits/saved-outfits.slice'
import { v4 as uuidv4 } from 'uuid'
import { Outfit } from '../../types/outfit'
import { removeItems } from '../../redux/wardrobe/wardrobe.slice'
import { clearOutfitBuilder } from '../../redux/outfits/outfit-builder.slice'
import { useNavigate } from 'react-router-dom';

const isCompleteOutfitItems = (items: RootState['outfitBuilder']['items']): items is Outfit['outfitItems'] => {
    return (
        items.shirt !== null &&
        items.pants !== null &&
        items.shoes !== null
      )
}

export const SubmitOutfitButton = () => {
    const dispatch = useDispatch()
    const outfitBuilder = useSelector((state: RootState) => state.outfitBuilder)
    const navigate = useNavigate()

    // TODO - maybe a better name for the submit function
    const handleSubmit = (outfitBuilder: RootState['outfitBuilder']) => {
        if (!isCompleteOutfitItems(outfitBuilder.items)) {
            alert('Please select an item for each category (shirt, pants, shoes).')
            return
        }

        const outfitItems = Object.values(outfitBuilder.items)

        // TODO - maybe write an outfitCreate function
        const outfit: Outfit = {
            id: uuidv4(),
            outfitItems: outfitBuilder.items,
            duration: outfitBuilder.endedAt! - outfitBuilder.startedAt!, // TODO - avoid this !
            createdAt: new Date().getTime()
        }

        dispatch(addOutfit(outfit))
        dispatch(removeItems(outfitItems))
        dispatch(clearOutfitBuilder())

        alert('Outfit submitted!')
    }

    return (
        <button onClick={() => { handleSubmit(outfitBuilder); navigate('/') }} className={styles.submitOutfitButton}>
            Submit
        </button>
    )
}
