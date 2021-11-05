import classNames from 'classnames';
import Link from './Link';

const Tag = ({ label, href, className }) => {
    return (
        <span
            className={classNames(
                'transition',
                className ||
                    'mt-3 py-1 rounded px-3 inline-block text-sm text-black bg-[#d85726] bg-opacity-30 hover:text-white hover:bg-opacity-100'
            )}>
            <Link href={href} rel="tag">
                {label}
            </Link>
        </span>
    );
};

export default Tag;
