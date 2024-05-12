import { Link } from "react-router-dom";

const Marquee = () => {
  return (
    <div className="maylike-products-wrapper">
      <h2>You may also like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          <div>
            <Link to={"/product"}>
              <div className="product-card">
                <img
                  src="	https://i.imgur.com/qrs9QBg.jpeg"
                  alt="product-image"
                  width={250}
                  height={250}
                  className="product-image"
                />
                <p className="product-name">Product Name</p>{" "}
                <p className="product-price">$XX.XX</p>{" "}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
