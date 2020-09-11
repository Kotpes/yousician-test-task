import React, { useState, useEffect, ChangeEvent, FunctionComponent } from 'react';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFetch } from '../hooks/useFetch';
import Search from '../components/Search';
import SongItem from '../components/SongItem';
import Filter from '../components/Filter'

import { Song, Favorite } from '../hooks/useFetch';
import styles from '../styles/Home.module.css';

export const API_SONGS_ENDPOINT = 'http://localhost:3004';

interface Props {
  initialSongs: Song[];
  initialFavorites: Favorite[];
  totalSongsCount: number;
}

const Home: FunctionComponent<Props> = ({ initialSongs, initialFavorites, totalSongsCount }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [nextPage, setNextPage] = useState(0);
  const [foundSongs, setFoundSongs] = useState(initialSongs);
  const [favorites, setFavorites] = useState(initialFavorites)
  const [timestamp, setTimestamp] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState([])

  const noFiltersSelected = selectedRange.length === 0
  const hasMoreSongs = totalSongsCount >= nextPage && !searchValue && noFiltersSelected
  const levelRanges = selectedRange.length > 0 && selectedRange.reduce((acc, cur, index) => {
    if (index === 0) {
      return `&level=${acc}`
    }
    return `${acc}&level=${cur}`
  }, selectedRange[0])

  const levelFilter = levelRanges ? levelRanges : ''

  const { state: { data: fetchedSongs }, } = useFetch(
    `${API_SONGS_ENDPOINT}/songs?_start=${nextPage}&_limit=21&search_like=${searchValue}${levelFilter}`
  );
  const { state: { data: fetchedFavorites } } = useFetch(`${API_SONGS_ENDPOINT}/favorites?${timestamp}`)


  useEffect(() => {
    // Making sure there are no duplicated on first fetch from a client
    const newSongs = [...foundSongs, ...fetchedSongs].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    if (!searchValue && noFiltersSelected) {
      setFoundSongs(newSongs);
    } else {
      setFoundSongs([...fetchedSongs])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedSongs]);


  useEffect(() => {
    const favorites = [...fetchedFavorites]
    if (favorites.length > 0)
      setFavorites([...fetchedFavorites]);
  }, [fetchedFavorites]);

  const reFetchFavourite = () => {
    setTimestamp(new Date())
  }

  const updateSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const onRangeSelect = (range: number[]) => {
    setSelectedRange(range)
  }

  const fetchMoreSongs = () => {
    const next = nextPage + 20
    setNextPage(next)
  }

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
        <Filter onRangeSelect={onRangeSelect} />
        <section className={styles.searchResults}>
          <InfiniteScroll
            dataLength={foundSongs.length}
            next={fetchMoreSongs}
            hasMore={hasMoreSongs}
            loader={<h4>Loading...</h4>}
          >
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
          </InfiniteScroll>
        </section>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const initialSongsFilter = `${API_SONGS_ENDPOINT}/songs?_start=0&_limit=21`;
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
