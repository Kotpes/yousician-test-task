import React, { ChangeEvent, FunctionComponent } from 'react'

import styles from './Search.module.css'

interface Props {
  searchValue: string;
  updateSearchValue: (event: ChangeEvent<HTMLInputElement>) => void
}

const Search: FunctionComponent<Props> = (props: Props) => {
  const { searchValue, updateSearchValue } = props
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

