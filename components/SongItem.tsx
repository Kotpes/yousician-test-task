import React from 'react'
import {Song} from '../hooks/useFetch'
import HeartIcon from './HeartIcon'

import styles from './SongItem.module.css'

interface Props extends Song {
    index: number
    isLiked: boolean
}

const SongItem = (props: Props) => {
    const {images, title, artist, level, isLiked, id, index} = props
    const containerBackgroundStyle = index % 2 == 0 ? styles.even : ''

    //adds fallback image for those images that return 403
    const handleFallbackImage = (event: any) => {
        event.target.src = '/missing-cover.png'
    }

    const onClick = () => {
        console.log('Song to add to favourits', id)
    }

    return (
        <section className={`${styles.container} ${containerBackgroundStyle}`}>
            <img src={images} onError={handleFallbackImage} alt={title} className={styles.coverArt}/>
            <div className={styles.songInfo}>
                <h3 className={styles.title}>{title}</h3>
                <h4 className={styles.artist}>{artist}</h4>
            </div>
            <div className={styles.songLevelAndAction}>
                <span className={styles.songLevel}>{level}</span>
                <span onClick={onClick} onKeyPress={onClick} role='button' tabIndex={0} >
                    <HeartIcon fill={isLiked ? '#dc001d' : 'none'} stroke={isLiked ? 'none' : '#fff'} />
                </span>
                
            </div>
        </section>
    )
}

export default SongItem