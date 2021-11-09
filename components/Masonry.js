import classNames from 'classnames';
import MasonryLayout from 'react-masonry-css';
import styles from './Masonry.module.css';
function Masonry({ className, children }) {
    return (
        <MasonryLayout
            breakpointCols={{
                default: 2,
                800: 2,
                500: 1
            }}
            className={classNames(styles.root)}
            columnClassName={classNames(styles.column, className)}>
            {children}
        </MasonryLayout>
    );
}
export default Masonry;
