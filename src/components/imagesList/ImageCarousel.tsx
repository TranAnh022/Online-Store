import { Carousel } from "react-responsive-carousel";
import { formattingURL } from "../../utils";

type Props = {
  images: string[];
};
function ImageCarousel({ images }: Props) {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      {images.map((img) => (
        <img
          key={img}
          src={formattingURL(img)}
          alt={img}
          style={{ width: "100%" }}
        />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
