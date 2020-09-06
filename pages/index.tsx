import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import { useFetch } from '../hooks/useFetch';
import Search from '../components/Search';
import SongItem from '../components/SongItem';

import { Song } from '../hooks/useFetch';
import styles from '../styles/Home.module.css';

const API_SONGS_ENDPOINT = 'http://localhost:3004';
interface Props {
  songs: Song[];
  totalSongsCount: string;
}

const Home = ({ songs, totalSongsCount }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [foundSongs, setFoundSongs] = useState(songs);

  const { data } = useFetch(
    `${API_SONGS_ENDPOINT}/songs?_start=0&_limit=20&search_like=${searchValue}`
  );

  useEffect(() => {
    setFoundSongs(data);
  }, [data]);

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
              return <SongItem key={item.id} {...item} index={index} />;
            })}
        </section>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const initialSongsFilter = `${API_SONGS_ENDPOINT}/songs?_start=0&_limit=20`;
  const response = await fetch(initialSongsFilter);
  const data = await response.json();
  const totalSongsCount = response.headers.get('X-Total-Count');

  return {
    props: {
      songs: data,
      totalSongsCount,
    },
  };
}

export default Home;
