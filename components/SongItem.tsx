import React from 'react'
import {Song} from '../hooks/useFetch'

import styles from './SongItem.module.css'

interface Props extends Song {
    index: number
}



const SongItem = (props: Props) => {
    const {images, title, artist, index} = props
    const isEven = index % 2 == 0
    const containerBackgroundStyle = isEven ? styles.even : ''

    return (
        <section className={`${styles.container} ${containerBackgroundStyle}`}>
            <img src={images} alt={title} className={styles.coverArt}/>
            <div className={styles.songInfo}>
                <h3 className={styles.title}>{title}</h3>
                <h4 className={styles.artist}>{artist}</h4>
            </div>            
        </section>
    )
}

export default SongItem