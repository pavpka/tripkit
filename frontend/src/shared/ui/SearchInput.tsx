import styles from './SearchInput.module.scss';

export default function SearchInput({ placeholder }: { placeholder: string }) {
    return (
        <div className={styles.searchContainer}>
            <label htmlFor="search" className={styles.searchLabel}>
                {placeholder}
            </label>
            <img
                src="/icons/shared/search.svg"
                alt="search"
                className={styles.searchIcon}
            />
            <input
                type="text"
                id="search"
                placeholder={placeholder}
                className={styles.searchInput}
            />
        </div>
    );
}
