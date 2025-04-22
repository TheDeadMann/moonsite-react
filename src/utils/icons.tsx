import Shirt from '../assets/icons/shirt.svg?react'
import Pants from '../assets/icons/pants.svg?react'
import Shoes from '../assets/icons/shoes.svg?react'

export const generateItemTypeToIcon = (styles: CSSModuleClasses) => ({
    'shirt': <Shirt className={styles.shirtIcon} />,
    'shirts': <Shirt className={styles.shirtIcon} />,
    'pants': <Pants className={styles.pantsIcon} />,
    'shoes': <Shoes className={styles.shoesIcon} />
})