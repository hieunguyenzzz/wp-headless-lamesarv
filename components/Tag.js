import Link from './Link';

const Tag = ({ label, href }) => {
    return (
        <span className="mt-3 py-1 rounded px-3 inline-block text-sm text-black bg-[#ffdabc] hover:text-white hover:bg-[#d85726]">
            <Link href={href} rel="tag">
                {label}
            </Link>
        </span>
    );
};

export default Tag;
