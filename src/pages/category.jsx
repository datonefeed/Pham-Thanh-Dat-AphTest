import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Slider,
  Spin,
} from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { categoryService, productService } from "../services/apiService";
import apiService from "../services/apiService";
import { setProductCategory } from "../redux/category";

function Category() {
  // Bỏ cmt nếu bạn sử dụng phần này
  const { productCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { url } = useParams();

  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // const [filterList, setFilterList] = useState([]);
  const [filterData, setFilterData] = useState();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch category details và lưu vào Redux
        const categoryData = await categoryService.getCategoryByUrl(url, "en");
        dispatch(setProductCategory(categoryData));
        const categoryIds = apiService.helpers.getAllChildIds(categoryData);
        const productsData = await productService.getProductByCategory(
          "en",
          currentPage,
          categoryIds
        );
        
        setProducts(productsData.items);
        setTotalProducts(productsData.totalCount);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, currentPage, dispatch]);

  // Xử lý phân trang
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);
  };

  /*  Hàm nối children và filterList được trả về từ API GetCategoryByUrl phục vụ cho chức năng lọc.
      Hãy bỏ comment nếu bạn sử dụng.
  */
  // const mergeFilterLists = (tree) => {
  //   // Lấy FilterList của node hiện tại
  //   let mergedList = [...(tree.filterList || [])];

  //   // Duyệt qua từng Children và hợp nhất FilterList
  //   if (tree.children && tree.children.length > 0) {
  //     tree.children.forEach((child) => {
  //       mergedList = mergedList.concat(mergeFilterLists(child));
  //     });
  //   }

  //   return mergedList;
  // };

  const onFilter = async (values) => {
    const hasValue = Object.values(values).some((value) => value);
    if (!hasValue) {
      return;
    }

    let filters;
    Object.keys(values).forEach((key) => {
      if (
        values[key] &&
        values[key].length > 0 &&
        key !== "categories" &&
        key !== "textSearch"
      ) {
        filters = { ...filters, [key]: values[key] };
      }
    });

    /* VIẾT CODE CỦA BẠN VÀO ĐÂY */
    try {
      setLoading(true);
      setFilterData(filters);
      const categoryIds = apiService.helpers.getAllChildIds(productCategory);
      
      const productsData = await productService.getProductByCategory(
        "en",
        1,
        categoryIds
      );
      
      setProducts(productsData.items);
      setTotalProducts(productsData.totalCount);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering products:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    form.resetFields();
    setFilterData();
    setSubmitDisabled(true);
    try {
      setLoading(true);
      const categoryIds = apiService.helpers.getAllChildIds(productCategory);
      const productsData = await productService.getProductByCategory(
        "en",
        1,
        categoryIds
      );
      setProducts(productsData.items);
      setTotalProducts(productsData.totalCount);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error clearing filters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <div className="video-overlay no-click fill"></div>
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_category_product.mp4"
              type="video/mp4"
            />
          </video>
          <div className="section-bg-overlay absolute fill"></div>
        </div>
        <div className="section-content relative">
          <div className="_4csl">
            <Row gutter={30}>
              <Col span={12} className="_9trw RemovePaddingBottom">
                <div className="_4yvp">
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
                        title: <span className="active-bread">{productCategory?.categoryName || "Loading..."}</span>,
                      },
                    ]}
                    id="breadcrumb"
                  />

                  <h2 className="_5xfq _1kly">{productCategory?.categoryName || "Loading..."}</h2>
                  <div className="_7vyg">
                    <p>
                      {productCategory?.description || "All our products are under absolute supervision, from raw materials to finished products."}
                    </p>
                    <p>
                      We apply an international quality management system to all
                      of our products.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="penury-gym section">
        <div className="section-content relative">
          <div className="category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    onFinish={onFilter}
                  >
                    <div className="_4get">
                      <div className="_4yee">
                        <div className="_5tyu">Filters</div>
                        <div className="_2wzq">
                          <Button
                            type="link"
                            size="small"
                            id="clear-filter"
                            onClick={clearFilters}
                            disabled={!filterData}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                      <Form.Item name="textSearch" className="_7pia">
                        <Input
                          placeholder="Search Products"
                          className="_8jji"
                          suffix={<SearchOutlined />}
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Categories"
                      name="categories"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        {/* Render động children categories từ API */}
                        {productCategory?.children && productCategory.children.length > 0 ? (
                          productCategory.children.map((child) => (
                            <Checkbox key={child.id} value={child.id}>
                              {child.categoryName}
                            </Checkbox>
                          ))
                        ) : (
                          <>
                            <Checkbox value={1}>Consumer Packaging</Checkbox>
                            <Checkbox value={2}>Industrial Packaging</Checkbox>
                          </>
                        )}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Type of"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value={3}>Food Storage</Checkbox>
                        <Checkbox value={4}>Trash Bags</Checkbox>
                        <Checkbox value={5}>
                          Knife – Case – Storage Box
                        </Checkbox>
                        <Checkbox value={6}>Containers</Checkbox>
                        <Checkbox value={7}>Gloves</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Width (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={10} max={60} range />
                    </Form.Item>

                    <Form.Item
                      label="Length (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={20} max={120} range />
                    </Form.Item>

                    <Form.Item
                      label="Recycle"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value="Yes">Yes</Checkbox>
                        <Checkbox value="No">No</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    {!isSubmitDisabled && (
                      <Button type="link" htmlType="submit" className="filter">
                        Filter
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>

              <Col span={18}>
                <div className="_7mkr">
                  <h2 className="_3rac">{productCategory?.categoryName || "Products"}</h2>
                </div>
                {loading ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <Spin size="large" />
                  </div>
                ) : products.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <p>No products found in this category.</p>
                  </div>
                ) : (
                  <>
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product.id} className="product-item">
                      <div className="product-image">
                        <Link to={`/product/${product.slug}`}>
                          <img
                            src={product.thumb}
                            alt={product.prodName}
                          />
                        </Link>
                      </div>
                      <div className="product-info">
                        <h4 className="product-name">
                          <Link to={`/product/${product.slug}`}>
                            {product.prodName}
                          </Link>
                        </h4>
                        <p className="product-sku">
                          SKU: <span>{product.sku}</span>
                        </p>
                      </div>
                    </div>
                  ))}                  
                </div>

                {/* Pagination*/}
                <Pagination
                  current={currentPage}
                  total={totalProducts}
                  pageSize={12}
                  onChange={handlePageChange}
                  className="pagination-cntt"
                  showSizeChanger={false}
                />
                </>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="lichen-gel section">
        <div className="section-content relative">
          <div className="_2gia">
            <Row gutter={60}>
              <Col span={12}>
                <div className="text-box_image">
                  <p className="_0kce">Our catalog</p>
                  <h3 className="_8mak">Explore Our Catalogs</h3>
                  <p className="_8fet">
                    Through a journey of establishment and continuous
                    development, An Phat Holdings has emerged as the leading
                    high-tech, environmentally friendly plastics group in
                    Southeast Asia. With over 20 years of experience, we are
                    dedicated to delivering high-quality, sustainable products
                    across a wide range of industries. As the region’s foremost
                    innovator in eco-friendly plastic solutions, we have built a
                    strong reputation and successfully expanded our presence
                    into key global markets, including Europe, the Americas, the
                    UAE, Japan, Korea, Singapore, Taiwan, and the Philippines.
                    Driven by ongoing research, innovation, and creativity, we
                    are committed to creating enduring value for our customers,
                    investors, and employees.
                  </p>
                  <div className="_3qdw">
                    <a className="button button-outline-green" href="/catalog">
                      <span>Our Catalogs</span>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="image-box_image">
                  <img src="/images/website/explore.png" className="_6ikc" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Category;
