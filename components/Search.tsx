import React from 'react'

import styles from './Search.module.css'

function Search(props) {
    const { searchValue, updateSearchValue} = props
    return (
        <section className={styles.searchContainer}>
          <input
            value={searchValue}
            type='text'
            name='songs-search'
            id='songsSearch'
            placeholder='Search for songs by artist or title'
            className={styles.searchInput}
            onChange={updateSearchValue}
          />
          <img
            src='/icons/search.svg'
            alt='search icon'
            className={styles.searchIcon}
          />
        </section>
    )
}


export default Search

