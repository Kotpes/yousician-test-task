import React, { useState, useEffect, FunctionComponent } from 'react';
import { Song, Favorite } from '../hooks/useFetch';
import HeartIcon from './icons/HeartIcon';
import LevelIcon from '../components/icons/LevelIcon'
import { API_SONGS_ENDPOINT } from '../pages/index';

import styles from './SongItem.module.css';

interface Props extends Song {
    index: number;
    isLiked: boolean;
    reFetchFavourites: () => void;
    favorite: Favorite
}

const removeFromFavorites = async (favoriteId: string): Promise<void> => {
    try {
        const response = await fetch(`${API_SONGS_ENDPOINT}/favorites/${favoriteId}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const addFavorite = async (body: string): Promise<Favorite> => {
    try {
        const response = await fetch(`${API_SONGS_ENDPOINT}/favorites`, {
            method: 'POST',
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

const SongItem: FunctionComponent<Props> = (props: Props) => {

    const {
        images,
        title,
        artist,
        level,
        isLiked,
        id: songId,
        reFetchFavourites,
        favorite,
        index,
    } = props;
    const [liked, setLiked] = useState(isLiked)

    const containerBackgroundStyle = index % 2 == 0 ? styles.even : '';
    const fill = liked ? '#dc001d' : 'none';
    const stroke = liked ? 'none' : '#fff';

    //adds fallback image for those images that return 403
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFallbackImage = (event: any) => {
        event.target.src = '/missing-cover.png';
    };

    const onClick = async () => {
        setLiked(!liked)
        const handleFavorite = liked ? removeFromFavorites(favorite.id) : addFavorite(JSON.stringify({ songId }))
        await handleFavorite;
        reFetchFavourites();
    };

    // using local state here, so that heart icon appearance is changed immidiately after onClick()
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
                <span className={styles.songLevel}>
                    <LevelIcon value={level} />
                </span>
                <span onClick={onClick} onKeyPress={onClick} role='button' tabIndex={0}>
                    <HeartIcon fill={fill} stroke={stroke} />
                </span>
            </div>
        </section>
    );
};

export default SongItem;
