import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ImageGallery = ({ images, onImageDelete, onImageSelect }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((image) => (
      <div key={image.id} className="relative group ">
        <IoCloseCircleOutline
          className="absolute top-0 right-0 text-xl text-black cursor-pointer opacity-0 group-hover:opacity-100"
          onClick={() => onImageDelete(image.id)}
        />
        <img
          src={image.image_url}
          alt={image.alt || "Hotel Image"}
          className="w-full h-40 object-cover rounded cursor-pointer"
          onClick={() => onImageSelect(image.image_url)}
        />
      </div>
    ))}
  </div>
);

export default ImageGallery;
