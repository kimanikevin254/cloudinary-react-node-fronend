import { Image } from 'cloudinary-react';
import { useEffect, useState } from 'react'

function Gallery() {
    const [imageIds, setImageIds] = useState();

    const loadImages = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/images');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName='YOUR_CLOUDINARY_CLOUD_NAME'
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    )
}

export default Gallery
