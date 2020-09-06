import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
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
        <section className={styles.searchContainer}>
          <input
            type='text'
            name='songs-search'
            id='songsSearch'
            placeholder='Search for songs by artist or title'
            className={styles.searchInput}
          />
          <img
            src='/icons/search.svg'
            alt='search icon'
            className={styles.searchIcon}
          />
        </section>
      </header>

      <main className={styles.gridContainer}>
        <section className={styles.filterContainer}>
          <span className={styles.filterLabel}>Filter by level</span>
          <div className={styles.selectedFilters}>5-10</div>
        </section>
        <section className={styles.searchResults}></section>
      </main>
    </div>
  );
}
