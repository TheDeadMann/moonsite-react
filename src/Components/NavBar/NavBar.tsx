import { useState } from 'react'
import styles from '../../assets/css/navbar.module.scss'
import { NavBarButton } from './NavBarButton'
import menuIcon from '../../assets/icons/menu.png'

export const NavBar = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  const pages = ['Home', 'Wardrobe', 'Saved']

  return (
    <>
      {isOpen ? (
        <div className={styles.openNavbar}>
          <div className={styles.logo} onClick={toggleMenu}>
              Moonsite React
          </div>
          <div className={styles.links}>
            {pages.map((page) => (
              <NavBarButton key={page} page={page} />
            ))}
          </div>
        </div>
      )
      : (
        <div className={styles.closedNavbar}>
          <div className={styles.logoImageContainer} onClick={toggleMenu}>
            <img src={menuIcon} alt="menu" className={styles.logoImage} />
          </div>
        </div>
      )
    }
    </>
  )
}
