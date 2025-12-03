import styles from './index.module.less'

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React后台管理系统</div>
        <div className={styles.desc}>React+React Router+Ant Design+TypeScript+Vite</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}

export default Welcome
