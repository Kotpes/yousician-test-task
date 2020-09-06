import React from 'react'
import {Song} from '../hooks/useFetch'

import styles from './SongItem.module.css'

interface Props extends Song {
    index: number
}

const SongItem = (props: Props) => {
    const {images, title, artist, index} = props
    console.log(index)
    const isEven = index % 2 == 0
    const containerBackgroundStyle = isEven ? styles.even : ''

    return (
        <section className={`${styles.container} ${containerBackgroundStyle}`}>
            <img src={images} alt={title} className={styles.coverArt}/>
            <div>
                <h3>{title}</h3>
                <h4>{artist}</h4>
            </div>            
        </section>
    )
}

export default SongItem