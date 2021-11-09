import { useRouter } from 'next/router';
import authorImage from '../public/author.png';
function Avartar({ author, size = 28 }) {
    const { basePath } = useRouter();
    return (
        <span
            style={
                size
                    ? {
                          width: `${size}px`,
                          height: `${size}px`
                      }
                    : null
            }
            className="inline-block mr-1  w-[28px] h-[28px] absolute ">
            <img
                className="absolute inset-0 object-cover w-full h-full rounded-full"
                src={basePath + author?.avatar?.url || authorImage.src}
            />
        </span>
    );
}

export default Avartar;
