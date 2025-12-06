import axiosClient from "./interceptor";
import { mockCategories, mockProducts, mockFilterList } from "../data/mockData";

const USE_MOCK_DATA = true;

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const paginate = (array, page = 1, pageSize = 12) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    items: array.slice(startIndex, endIndex),
    totalCount: array.length,
    currentPage: page,
    totalPages: Math.ceil(array.length / pageSize),
  };
}

const getAllChildIds = (category) => {
  let ids = [category.id];
  if (category.children && category.children.length > 0) {
    category.children.forEach((child) => {
      ids = [...ids, ...getAllChildIds(child)];
    });
  }
  return ids;
};

// CATEGORY SERVICE

export const categoryService = {
  // API: GET /Category/GetListCategory
  async getListCategory(lang = "en") {
    if (USE_MOCK_DATA) {
      await delay(); 
      return mockCategories;
    }
    return axiosClient.get("/Category/GetListCategory", {
      params: { lang },
    });
  },

  // API: GET /Category/GetCategoryByUrl
  async getCategoryByUrl(url, lang = "en") {
    if (USE_MOCK_DATA) {
      await delay();

      const findCategoryByUrl = (categories) => {
        for (const category of categories) {
          if (category.link === url) {
            return {
              ...category,
              filterList: mockFilterList,
            };
          }
          if (category.children && category.children.length > 0) {
            const found = findCategoryByUrl(category.children);
            if (found) return found;
          }
        }
        return null;
      };

      const category = findCategoryByUrl(mockCategories);

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    }

    return axiosClient.get("/Category/GetCategoryByUrl", {
      params: { lang, url },
    });
  },
};

// PRODUCT SERVICE

export const productService = {
  // API: GET /Product/GetProductByCategory
  async getProductByCategory(lang = "en", page = 1, ids = []) {
    if (USE_MOCK_DATA) {
      await delay();

      const filteredProducts = mockProducts.filter((product) =>
        ids.includes(product.categoryId)
      );

      return paginate(filteredProducts, page, 12);
    }

    return axiosClient.get("/Product/GetProductByCategory", {
      params: {
        lang,
        page,
        ids: JSON.stringify(ids),
      },
    });
  },

  // API: GET /Product/GetProductByUrl
  async getProductByUrl(url, lang = "en") {
    if (USE_MOCK_DATA) {
      await delay();

      const product = mockProducts.find((p) => p.slug === url);

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    }

    return axiosClient.get("/Product/GetProductByUrl", {
      params: { lang, url },
    });
  },

  // API: GET /Product/GetRelatedProducts
  async getRelatedProducts(lang = "en", id) {
    if (USE_MOCK_DATA) {
      await delay();

      const currentProduct = mockProducts.find((p) => p.id === id);

      if (!currentProduct) {
        return [];
      }

      const relatedProducts = mockProducts
        .filter(
          (p) => p.categoryId === currentProduct.categoryId && p.id !== id
        )
        .slice(0, 4)
        .map(({ id, thumb, prodName, slug, sku }) => ({
          id,
          thumb,
          prodName,
          slug,
          sku,
        }));

      return relatedProducts;
    }

    return axiosClient.get("/Product/GetRelatedProducts", {
      params: { lang, id },
    });
  },

  // API: GET /Product/SearchProducts
  async searchProducts(lang = "en", query = "") {
    if (USE_MOCK_DATA) {
      await delay();

      const lowerQuery = query.toLowerCase();

      const products = mockProducts
        .filter(
          (p) =>
            p.prodName.toLowerCase().includes(lowerQuery) ||
            p.sku.toLowerCase().includes(lowerQuery) ||
            p.shortDesc.toLowerCase().includes(lowerQuery)
        )
        .map(({ id, thumb, prodName, slug, sku }) => ({
          id,
          thumb,
          prodName,
          slug,
          sku,
        }));

      const categoryIds = [
        ...new Set(
          products.map((p) => {
            const fullProduct = mockProducts.find((mp) => mp.id === p.id);
            return fullProduct?.categoryId;
          })
        ),
      ];

      const findCategoryById = (categories, id) => {
        for (const category of categories) {
          if (category.id === id) {
            return { id: category.id, categoryName: category.categoryName };
          }
          if (category.children && category.children.length > 0) {
            const found = findCategoryById(category.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const categories = categoryIds
        .map((id) => findCategoryById(mockCategories, id))
        .filter(Boolean);

      return {
        products,
        categories,
        filters: mockFilterList,
      };
    }

    return axiosClient.get("/Product/SearchProducts", {
      params: { lang, query },
    });
  },

  // API: POST /Product/FilterSearchProduct
  async filterSearchProduct(body) {
    if (USE_MOCK_DATA) {
      await delay();

      const { textSearch = "", categories = [], page = 1 } = body;
      const lowerQuery = textSearch.toLowerCase();

      let filteredProducts = mockProducts.filter((p) => {
        const matchesKeyword =
          !textSearch ||
          p.prodName.toLowerCase().includes(lowerQuery) ||
          p.sku.toLowerCase().includes(lowerQuery) ||
          p.shortDesc.toLowerCase().includes(lowerQuery);

        const matchesCategory =
          categories.length === 0 || categories.includes(p.categoryId);

        return matchesKeyword && matchesCategory;
      });

      return paginate(filteredProducts, page, 12);
    }

    return axiosClient.post("/Product/FilterSearchProduct", body);
  },
};

// EXPORT DEFAULT

export default {
  category: categoryService,
  product: productService,
  helpers: {
    getAllChildIds,
  },
};
