import { useDispatch } from "react-redux"
import { removeOutfit } from "../../redux/outfits/saved-outfits.slice"
import { Outfit } from "../../types/outfit"

interface DeleteSavedOutfitButtonProps {
    outfit: Outfit
}

export const DeleteSavedOutfitButton = ({ outfit }: DeleteSavedOutfitButtonProps) => {
    const dispatch = useDispatch()
    
    const handleDelete = () => {
        dispatch(removeOutfit(outfit.id))
        
    }
  
    return (
        <button onClick={handleDelete}>❌</button>
    )
}
