import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import { useFetch } from '../hooks/useFetch';
import Search from '../components/Search';
import SongItem from '../components/SongItem';

import { Song } from '../hooks/useFetch';
import styles from '../styles/Home.module.css';

const API_SONGS_ENDPOINT = 'http://localhost:3004';
interface Favorite {
  id: string;
  songId: string;
}
interface Props {
  songs: Song[];
  favorites: Array<Favorite>;
  totalSongsCount: string;
}

const Home = ({ songs, favorites, totalSongsCount }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [nextStart, setNextStart] = useState(0);
  const [foundSongs, setFoundSongs] = useState(songs);

  const { songs: fetchedSongs } = useFetch(
    `${API_SONGS_ENDPOINT}/songs?_start=${nextStart}&_limit=20&search_like=${searchValue}`
  );

  console.log('data', fetchedSongs);

  useEffect(() => {
    setFoundSongs(fetchedSongs);
  }, [fetchedSongs]);

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
          {foundSongs &&
            foundSongs.length > 0 &&
            foundSongs.map((item, index) => {
              const isLiked = favorites.some((fav) => fav.songId === item.id);
              return (
                <SongItem
                  key={item.id}
                  {...item}
                  isLiked={isLiked}
                  index={index}
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

  const responses = await Promise.all([songsResponse, favoritesResponse]);
  const [songs, favorites] = await Promise.all(responses.map((r) => r.json()));
  const totalSongsCount = songsResponse.headers.get('X-Total-Count');

  return {
    props: {
      songs,
      favorites,
      totalSongsCount,
    },
  };
}

export default Home;
