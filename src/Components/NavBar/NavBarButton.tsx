import { NavLink } from "react-router-dom"
import styles from '../../assets/css/navbar.module.scss'
import classNames from "classnames"

type NavBarButtonProps = {
  page: string
}

export const NavBarButton = ({page}: NavBarButtonProps) => {
  return (
    <NavLink className={({isActive}) => classNames(styles.navBarButton, isActive && styles.activeNavBarButton)}
      key={page} to={`/${page.toLowerCase()}`}>
        {page}
    </NavLink>
  )
}
