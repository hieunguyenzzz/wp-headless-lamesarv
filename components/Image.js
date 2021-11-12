import { Image as CloudinaryImage, Transformation } from 'cloudinary-react';


const Image = ({ src, alt }) => {
    return (
        <CloudinaryImage cloudName="la-mesa-rv" publicId={"rec-van-assets/" + src.replace(
            process.env.NEXT_PUBLIC_HOST_URL +
            '/wp-content/uploads/',
            ''
        )} secure="true" upload_preset="rec-van-assets"
            className="w-full object-contain bg-gray-100 transform transition-transform duration-1000 ease-in-out group-hover:scale-105 z-[-1]"
            alt={alt}
            loading="lazy" >
            <Transformation width="auto" crop="scale" />
            <Transformation fetchFormat="auto" />
        </CloudinaryImage>
    );
};

export default Image;
