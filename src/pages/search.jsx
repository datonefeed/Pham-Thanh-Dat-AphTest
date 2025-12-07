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
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { productService } from "../services/apiService";
import ProductCard from "../components/atoms/ProductCard";
import LoadingSpinner from "../components/atoms/LoadingSpinner";

function SearchScreen() {
  const { productCategory } = useSelector((state) => state.category);

  const query = new URLSearchParams(useLocation().search);
  const textSearch = query.get("query");

  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  
  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });

    /* VIẾT CODE CỦA BẠN VÀO ĐÂY */

    const fetchSearchResults = async () => {
      if (!textSearch) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const searchResult = await productService.searchProducts("en", textSearch);
        
        setProducts(searchResult.products || []);
        setTotalProducts(searchResult.products?.length || 0);
      } catch (error) {
        console.error("Error searching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [textSearch]);

  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);
  };

  const onFilter = async (values) => {
    const hasValue = Object.values(values).some((value) => value);
    if (!hasValue) {
      return;
    }

    let filters = {};
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
      
      const filterBody = {
        lang: "en",
        textSearch: values.textSearch || textSearch,
        categories: values.categories || [],
        page: 1,
      };
      
      const filteredResult = await productService.filterSearchProduct(filterBody);
      
      setProducts(filteredResult.items || []);
      setTotalProducts(filteredResult.totalCount || 0);
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
      const searchResult = await productService.searchProducts("en", textSearch);
      
      setProducts(searchResult.products || []);
      setTotalProducts(searchResult.products?.length || 0);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error resetting search:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Implement pagination if needed
    const filterBody = {
      lang: "en",
      textSearch: form.getFieldValue("textSearch") || textSearch,
      categories: form.getFieldValue("categories") || [],
      page: page,
    };
    
    try {
      setLoading(true);
      const filteredResult = await productService.filterSearchProduct(filterBody);
      setProducts(filteredResult.items || []);
      setTotalProducts(filteredResult.totalCount || 0);
    } catch (error) {
      console.error("Error loading page:", error);
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
          <div className="_4csl row">
            <div className="_9trw col large-6 medium-6 small-12 RemovePaddingBottom">
              <div className="col-inner">
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
                        title: <span className="active-bread">Search</span>,
                      },
                    ]}
                    id="breadcrumb"
                  />
                  <h2 className="_5xfq _1kly">Search</h2>
                  <p className="_7vyg">
                    Results you search with keywords: &quot;{textSearch}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="penury-gym section">
        <div className="section-content relative">
          <div className=" category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <div className="show-for-small filter-icon">
                    <div className="group-filter">
                      <i className="fa-light fa-filter"></i>
                    </div>
                    <span className="label">Filter</span>
                  </div>
                  <div className="col-inner">
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
                          {productCategory?.map((cat) => (
                            <Checkbox key={cat.id} value={cat.id}>
                              {cat.categoryName}
                            </Checkbox>
                          ))}
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
                        <Button
                          type="link"
                          htmlType="submit"
                          className="filter"
                        >
                          Filter
                        </Button>
                      )}
                    </Form>
                  </div>
                </div>
              </Col>
              <Col span={18}>
                <div className="_7mkr">
                  <h2 className="_3rac">Keyword: &quot;{textSearch}&quot;</h2>
                </div>
                {loading ? (
                  <LoadingSpinner />
                ) : products.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <p>No products found for &quot;{textSearch}&quot;</p>
                  </div>
                ) : (
                  <>
                    <div className="products-grid">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination */}
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
                  <p className="_0kce uppercase">Our catalog</p>
                  <h3 className="_8mak">Explore Our Catalogs</h3>
                  <p className="_8fet">
                    An Phat Holdings produces compostable bags and products like
                    knives, spoons, and straws from AnBio materials, decomposing
                    into water, CO₂, and humus in 6-12 months. Their compostable
                    packaging is the first in Vietnam certified with the OK
                    compost HOME by TUV Austria, ensuring biodegradability in
                    natural conditions within a year.
                  </p>
                  <div className="_3qdw">
                    <a href="#" className="button button-outline-green">
                      <span>Our Catalogs</span>
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="_1mtz">
                  <div className="image-box_image">
                    <img src="/images/website/explore.png" className="_6ikc" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SearchScreen;
