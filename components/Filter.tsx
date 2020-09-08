import { useState, useRef } from 'react'
import range from 'lodash.range'

import FilterIcon from './icons/FilterIcon'
import styles from './Filter.module.css'

const initialValues = { firstValue: 0, secondValue: 0 }
interface Props {
    // eslint-disable-next-line no-unused-vars
    onRangeSelect: (selectedRange: number[]) => void;
}

const Filter = ({ onRangeSelect }: Props) => {
    const [selectedRange, setSelectedRange] = useState([])
    const [filtersVisible, setFiltersVisibility] = useState(false)
    const [selectedValuesLabel, setSelectedValuesLabel] = useState('')
    const values = useRef(initialValues)
    const labelText = filtersVisible ? 'Hide filter' : 'Filter by level'
    const selectedFiltersClass = selectedValuesLabel ? styles.filtersSelected : ''
    const filterIconFill = filtersVisible ? '#fff' : '#000'
    const filterIconBackground = filtersVisible ? '' : styles.active

    const toggleFilters = () => {
        setFiltersVisibility(!filtersVisible)
    }

    const handleSelectedRange = () => {
        const { firstValue, secondValue } = values.current
        const edges = firstValue > secondValue ? { start: secondValue, end: firstValue } : { start: firstValue, end: secondValue }
        const selectedRange = range(edges.start, edges.end + 1)
        const selectedValueLabel = `${selectedRange[0]} - ${selectedRange[selectedRange.length - 1]}`

        setSelectedRange(selectedRange)
        onRangeSelect(selectedRange)
        setSelectedValuesLabel(selectedValueLabel)
    }

    const handleFilterSelection = (value: number) => {
        const { firstValue, secondValue } = values.current

        if (firstValue > 0 && secondValue > 0) {
            setSelectedRange([value])
            values.current.firstValue = value
            values.current.secondValue = 0
        } else if (!firstValue) {
            const selected = [...selectedRange, value]
            setSelectedRange(selected)
            values.current.firstValue = value
        } else if (!secondValue) {
            values.current.secondValue = value
            handleSelectedRange()
        }
    }


    return (
        <section className={styles.filterContainer}>
            <span className={styles.filterLabel}>{labelText}</span>
            <div className={`${styles.selectedFilters} ${selectedFiltersClass}`}>
                {selectedValuesLabel &&
                    <span className={styles.selectedValues}>{selectedValuesLabel}</span>
                }
                <FilterIcon fill={filterIconFill} onClick={toggleFilters} className={`${styles.filterButton} ${filterIconBackground}`} />
            </div>
            {filtersVisible &&
                <section className={styles.filters}>
                    {Array.from({ length: 15 }, (v, k) => {
                        const value = k + 1;
                        const isInRange = selectedRange.includes(value)
                        const backgroundStyle = isInRange ? styles.selected : ''
                        return (
                            <span
                                className={`${styles.filter} ${backgroundStyle}`}
                                onClick={() => handleFilterSelection(value)}
                                onKeyPress={() => handleFilterSelection(value)}
                                role="button"
                                tabIndex={0}
                                key={k}
                            >
                                {value}
                            </span>
                        )
                    })}
                </section>
            }

        </section>
    )
}

export default Filter