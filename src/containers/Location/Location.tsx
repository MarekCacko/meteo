import React from 'react'

import styles from './Location.module.css'

const Location = () => {
  return (
    <section className={styles.locationContainer}>
      <header>Location</header>
      <div>
        <input type="text" placeholder="Search city..." />
      </div>
      <div>
        <div>City</div>
        <div>Temperature</div>
      </div>
    </section>
  )
}

export default Location
