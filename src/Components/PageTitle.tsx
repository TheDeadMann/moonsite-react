import styles from '../assets/css/title.module.scss'

type PageTitleProps = {
  title: string
}

export const PageTitle = ({title}: PageTitleProps) => {
  return (
    <div className={styles.title}>{title}</div>
  )
}
