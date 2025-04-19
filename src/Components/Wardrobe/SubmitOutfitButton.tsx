import { useDispatch, useSelector } from 'react-redux'
import styles from '../../assets/css/submit-outfit-button.module.scss'
import { RootState } from '../../redux/store'
import { addOutfit } from '../../redux/outfits/saved-outfits.slice'
import { v4 as uuidv4 } from 'uuid'
import { Outfit } from '../../types/outfit'

export const SubmitOutfitButton = () => {
    const dispatch = useDispatch()
    const outfitBuilder = useSelector((state: RootState) => state.outfitBuilder)

    // TODO - maybe a better name for the submit function
    const handleSubmit = (outfitBuilder: RootState['outfitBuilder']) => {
        const outfitItems = Object.values(outfitBuilder.items)

        // TODO - try to avoid this type assertion
        // null checking for type assertion later on
        if (outfitItems.some(item => item === null)) {
            alert('Please select an item for each category (shirt, pants, shoes).')
            return
        }

        // TODO - maybe write a outfitCreate function
        const outfit: Outfit = {
            id: uuidv4(),
            outfitItems: outfitBuilder.items as Outfit['outfitItems'], // type assertion because of the null check above
            duration: outfitBuilder.endedAt! - outfitBuilder.startedAt!, // TODO - avoid this !
            createdAt: new Date().getTime()
        }

        dispatch(addOutfit(outfit))
        alert('Outfit submitted!')
    }

    return (
        <button onClick={() => handleSubmit(outfitBuilder)} className={styles.submitOutfitButton}>
            Submit
        </button>
    )
}
