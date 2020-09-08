import React, { useState, useEffect } from 'react';
import { Song, Favorite } from '../hooks/useFetch';
import HeartIcon from './HeartIcon';
import { API_SONGS_ENDPOINT } from '../pages/index';

import styles from './SongItem.module.css';

interface Props extends Song {
    index: number;
    isLiked: boolean;
    reFetchFavourites: Function;
    favorite?: Favorite,
}

const handleFavourite = async (body: string, method: string) => {
    try {
        const response = await fetch(`${API_SONGS_ENDPOINT}/favorites`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const SongItem = (props: Props) => {

    const {
        images,
        title,
        artist,
        level,
        isLiked,
        id,
        reFetchFavourites,
        favorite,
        index,
    } = props;
    const [liked, setLiked] = useState(isLiked)
    console.log('favorite', favorite)

    const containerBackgroundStyle = index % 2 == 0 ? styles.even : '';
    const fill = liked ? '#dc001d' : 'none';
    const stroke = liked ? 'none' : '#fff';

    //adds fallback image for those images that return 403
    const handleFallbackImage = (event: any) => {
        event.target.src = '/missing-cover.png';
    };

    const onClick = async () => {
        setLiked(!liked)
        const payload = liked ? favorite.id : id
        const body = JSON.stringify({ payload })
        const method = liked ? 'DELETE' : 'POST'
        await handleFavourite(body, method);
        reFetchFavourites();
    };

    useEffect(() => {
        setLiked(isLiked)
    }, [isLiked])

    return (
        <section className={`${styles.container} ${containerBackgroundStyle}`}>
            <img
                src={images}
                onError={handleFallbackImage}
                alt={title}
                className={styles.coverArt}
            />
            <div className={styles.songInfo}>
                <h3 className={styles.title}>{title}</h3>
                <h4 className={styles.artist}>{artist}</h4>
            </div>
            <div className={styles.songLevelAndAction}>
                <span className={styles.songLevel}>{level}</span>
                <span onClick={onClick} onKeyPress={onClick} role='button' tabIndex={0}>
                    <HeartIcon fill={fill} stroke={stroke} />
                </span>
            </div>
        </section>
    );
};

export default SongItem;
