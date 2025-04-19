import { useSelector } from "react-redux"
import { PageTitle } from "../Components/PageTitle"
import { ItemSlider } from "../Components/Wardrobe/ItemSlider"
import { RootState } from "../redux/store"
import { SubmitOutfitButton } from "../Components/Wardrobe/SubmitOutfitButton"

export const WardrobePage = () => {
    const wardrobe = useSelector((state: RootState) => state.wardrobe)

    return (
      <>
        <PageTitle title='Wardrobe' />
        <ItemSlider items={wardrobe.shirts} />
        <ItemSlider items={wardrobe.pants} />
        <ItemSlider items={wardrobe.shoes} />
        <SubmitOutfitButton />
      </>
    )
}
