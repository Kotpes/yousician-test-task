import React, { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import { useFetch } from '../hooks/useFetch';
import Search from '../components/Search';
import SongItem from '../components/SongItem';

import { Song, Favorite } from '../hooks/useFetch';
import styles from '../styles/Home.module.css';

export const API_SONGS_ENDPOINT = 'http://localhost:3004';

interface Props {
  initialSongs: Song[];
  initialFavorites: Favorite[];
  totalSongsCount: Array<any>;
}

const Home = ({ initialSongs, initialFavorites, totalSongsCount }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [nextStart, setNextStart] = useState(0);
  const [foundSongs, setFoundSongs] = useState(initialSongs);
  const [favorites, setFavorites] = useState(initialFavorites)
  const [timestamp, setTimestamp] = useState(new Date())

  console.log('favorites', favorites)

  const { state: { data: fetchedSongs }, } = useFetch(
    `${API_SONGS_ENDPOINT}/songs?_start=${nextStart}&_limit=20&search_like=${searchValue}`
  );
  const { state: { data: fetchedFavorites } } = useFetch(`${API_SONGS_ENDPOINT}/favorites?${timestamp}`)

  useEffect(() => {
    setFoundSongs(fetchedSongs);
  }, [fetchedSongs]);

  useEffect(() => {
    if (fetchedFavorites.length > 0)
      setFavorites(fetchedFavorites);
  }, [fetchedFavorites]);

  const reFetchFavourite = () => {
    setTimestamp(new Date())
  }

  const updateSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const searchProps = { searchValue, updateSearchValue };

  return (
    <div className={styles.container}>
      <Head>
        <title>Yousician search app</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;800&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>New songs delivered every week</h1>
        <h2 className={styles.subtitle}>
          Here are the most recent additions to the Yousician App. Start playing
          today!
        </h2>
        <Search {...searchProps} />
      </header>

      <main className={styles.gridContainer}>
        <section className={styles.filterContainer}>
          <span className={styles.filterLabel}>Filter by level</span>
          <div className={styles.selectedFilters}>5-10</div>
        </section>
        <section className={styles.searchResults}>
          {foundSongs.length > 0 &&
            foundSongs.map((item, index) => {
              const isLiked = favorites.some((fav) => fav.songId === item.id);
              const favorite = favorites.find((fav) => fav.songId === item.id)
              return (
                <SongItem
                  key={item.id}
                  {...item}
                  isLiked={isLiked}
                  favorite={favorite}
                  index={index}
                  reFetchFavourites={reFetchFavourite}
                />
              );
            })}
        </section>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const initialSongsFilter = `${API_SONGS_ENDPOINT}/songs?_start=0&_limit=20`;
  const songsResponse = await fetch(initialSongsFilter);
  const favoritesResponse = await fetch(`${API_SONGS_ENDPOINT}/favorites`);
  const totalSongsCount = songsResponse.headers.get('X-Total-Count');

  const responses = await Promise.all([songsResponse, favoritesResponse]);
  const [songs, favorites] = await Promise.all(responses.map((r) => r.json()));

  return {
    props: {
      initialSongs: songs,
      initialFavorites: favorites,
      totalSongsCount,
    },
  };
}

export default Home;
