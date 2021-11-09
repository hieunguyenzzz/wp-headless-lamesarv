import NextImage from 'next/image';
import authorImage from '../public/author.png';
function Avartar({ author, size = 28 }) {
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
            <NextImage
                className="rounded-full"
                layout="intrinsic"
                src={author?.avatar?.url || authorImage.src}
                width={`${size}px`}
                height={`${size}px`}></NextImage>
        </span>
    );
}

export default Avartar;
