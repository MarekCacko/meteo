import React from 'react'

import ImageHeader from '../../components/ImageHeader/ImageHeader'
import { ApiData } from '../../types'

interface Props {
  openLocation: () => void
  city: ApiData | null
}

const Weather = (props: Props) => {
  const { city, openLocation } = props

  return (
    <>
      <ImageHeader />
      <section>
        <div>date time</div>
        <div role="link" tabIndex={0} onClick={openLocation} onKeyDown={openLocation}>
          {city?.name}
        </div>
        <div>grid</div>
      </section>
    </>
  )
}

export default Weather
