import { Carousel } from "react-responsive-carousel";
import { formattingURL } from "../../utils";

type Props = {
  images: string[];
};
function ImageCarousel({ images }: Props) {
  return (
    <Carousel>
      {images.map((img) => (
        <img
          key={img}
          src={formattingURL(img)}
          alt={img}
          style={{ width: "50%" }}
        />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
