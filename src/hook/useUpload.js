import { useState } from "react";

const useUpload = (multiple = false) => {
    const [images, setImage] = useState([]);

    const handleImageChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const imagePreviews = files.map((file) => ({
                file, // Original file
                preview: URL.createObjectURL(file) // Preview URL
            }));

            setImage(multiple ? [...images, ...imagePreviews] : imagePreviews);
        }
    };

    return {
        images,
        setImage,
        handleImageChange,
    };
};

export default useUpload;
