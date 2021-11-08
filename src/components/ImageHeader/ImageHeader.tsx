import React from 'react'

import { ReactComponent as City } from './city.svg'
import { ReactComponent as Clouds } from './clouds.svg'
import styles from './ImageHeader.module.css'
import { ReactComponent as Sun } from './sun.svg'

const ImageHeader = () => {
  return (
    <header className={styles.header}>
      <Sun className={styles.sun} />
      <Clouds className={styles.clouds} />
      <City className={styles.city} />
    </header>
  )
}

export default ImageHeader
