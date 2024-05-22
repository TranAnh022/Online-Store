import { Carousel } from "react-responsive-carousel";

import { ProductImageType } from "../../types/type";

type Props = {
  images: ProductImageType[] | null;
};
function ImageCarousel({ images }: Props) {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      {images?.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.url}
          style={{ width: "100%" }}
        />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
