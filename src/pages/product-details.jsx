import "swiper/css";
import "swiper/css/pagination";
import { Breadcrumb, Col, Image, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, Thumbs } from "swiper/modules";
import defaultImage from "../assets/images/defaultImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { productService } from "../services/apiService";
import Button from "../components/atoms/Button";
import LoadingSpinner from "../components/atoms/LoadingSpinner";

function ProductDetail() {
  const { url } = useParams();

  const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [direction, setDirection] = useState("vertical");
  
  // State
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateDirection = () => {
    setDirection(window.innerWidth < 768 ? "horizontal" : "vertical");
  };

  useEffect(() => {
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });

    /* VIẾT CODE CỦA BẠN VÀO ĐÂY */
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch product details
        const productData = await productService.getProductByUrl(url, "en");
        setProduct(productData);
        try {
          const relatedData = await productService.getRelatedProducts("en", productData.id);
          setRelatedProducts(relatedData);
        } catch (error) {
          console.log("Related products not available:", error);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchProductData();
    }
  }, [url]);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div id="content" className="content-area">
      <section className="coach-pug section">
        <div className="section-content relative">
          <div className="_0vqs">
            <Row gutter={30}>
              <Col span={24}>
                <Breadcrumb
                  items={[
                    {
                      title: (
                        <a href="/" className="item-bread">
                          Home
                        </a>
                      ),
                    },
                    {
                      title: (
                        <Link to="/all-product" className="item-bread">
                          All Products
                        </Link>
                      ),
                    },
                    {
                      title: "Products",
                    },
                    {
                      title: <span className="active-bread">{product?.prodName || "Loading..."}</span>,
                    },
                  ]}
                  id="breadcrumb"
                />
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="snouting-daw section">
        <div className="section-content relative">
          {loading ? (
            <LoadingSpinner />
          ) : !product ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <p>Product not found</p>
            </div>
          ) : (
          <div className="_1ghu">
            <Row gutter={60}>
              <Col span={12}>
            <div className="_6tdv">
              <div className="product-vertical-thumbnails">
                <Swiper
                  modules={[Mousewheel, Pagination, Thumbs]}
                  direction={direction}
                  slidesPerView="auto"
                  spaceBetween={20}
                  mousewheel={true}
                  pagination={{
                    clickable: true,
                  }}
                  watchSlidesProgress={true}
                  onSwiper={setThumbsSwiper}
                  className="ThumbGallery GalleryArea"
                >
                  {/* Render động gallery từ product.media */}
                  {product.media && product.media.length > 0 ? (
                    product.media.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={image}
                          alt={`${product.prodName} ${index + 1}`}
                          fallback={defaultImage}
                          preview={false}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <>
                      <SwiperSlide>
                        <Image
                          src={product.thumb || "/images/website/product_1.png"}
                          alt="Product Thumb"
                          fallback={defaultImage}
                          preview={false}
                        />
                      </SwiperSlide>
                    </>
                  )}
                </Swiper>
                <Image.PreviewGroup>
                  <Swiper
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="ProductGallery GalleryArea"
                  >

                    {product.media && product.media.length > 0 ? (
                      product.media.map((image, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            src={image}
                            alt={`${product.prodName} ${index + 1}`}
                            fallback={defaultImage}
                            preview={false}
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <Image
                          src={product.thumb || "/images/website/product_1.png"}
                          alt={product.prodName}
                          fallback={defaultImage}
                          preview={false}
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                </Image.PreviewGroup>
              </div>

              <div className="_6hoq">
                {product.dataSheet && (
                  <Button
                    style={{ textTransform: "none" }}
                    type="link"
                    className="_7lpb"
                    href={product.dataSheet}
                    target="_blank"
                  >
                    <span>Download data sheet</span>
                    <i className="fa-regular fa-arrow-right"></i>
                  </Button>
                )}
              </div>
            </div>
              </Col>
              <Col span={12}>
            <div className="_5enz">
              <div className="product-info">
                <h1 className="product-title">
                  {product.prodName}
                </h1>
                <div className="sku-line">
                  <strong>SKU:</strong> <span>{product.sku}</span>
                </div>
                <div className="product-description">
                  {product.shortDesc || product.description}
                </div>
                <div className="action-buttons">
                  <Button variant="gradient" to="/contact-us">
                    REQUEST QUOTE
                  </Button>
                  <Button variant="outline-green" href="#">
                    ADD TO BASKET
                  </Button>
                </div>

              </div>
            </div>
              </Col>
            </Row>
          </div>
          )}
        </div>
      </section>

      <section className="xylomas-goad section">
        <div className="section-content relative">
          <div className="_0qkm">
            <Row gutter={30}>
              <Col span={24}>
                <div className="blocks_title_nav">
                  <h2 className="title_prj">Frequently Bought Together</h2>
                  <div className="nav_swpier_prj">
                    <div className="swpier_prj-prev" onClick={handlePrev}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </div>
                    <div className="swpier_prj-next" onClick={handleNext}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="_8sxd">
            <Row gutter={20}>
              <Col span={24} className="_0lfn">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  modules={[Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={relatedProducts.length > 4}
                  className="SliderProduct"
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {/* Render products*/}
                  {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct) => (
                      <SwiperSlide key={relatedProduct.id}>
                        <Link className="box_project block has-hover" to={`/product/${relatedProduct.slug}`}>
                          <div className="media_prj image-zoom">
                            <Image
                              src={relatedProduct.thumb}
                              alt={relatedProduct.prodName}
                              fallback={defaultImage}
                              preview={false}
                              className="_7omy"
                            />
                          </div>
                          <div className="text_prj">
                            <h4 className="textLine-2">{relatedProduct.prodName}</h4>
                            <div className="_7yax">
                              <strong>SKU&nbsp;</strong>
                              <span>{relatedProduct.sku}</span>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))
                  ) : null}
                </Swiper>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
