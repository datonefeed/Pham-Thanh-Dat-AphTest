// Mock data for categories and products

export const mockCategories = [
  {
    id: 1,
    thumb: "/images/website/market_1.png",
    categoryName: "Consumer Goods",
    link: "consumer-goods",
    shortDesc: "High-quality products for everyday consumer needs",
    description: "Comprehensive range of consumer goods including food packaging, household items, and eco-friendly solutions for modern living.",
    parentId: 0,
    children: [
      {
        id: 11,
        thumb: "/images/website/product-list_1.png",
        categoryName: "Food Packaging",
        link: "food-packaging",
        shortDesc: "Eco-friendly food packaging solutions",
        description: "Sustainable and compostable food packaging products",
        parentId: 1,
        children: []
      },
      {
        id: 12,
        thumb: "/images/website/product-list_2.png",
        categoryName: "Household Items",
        link: "household-items",
        shortDesc: "Quality household plastic products",
        description: "Durable and practical household items for daily use",
        parentId: 1,
        children: []
      }
    ]
  },
  {
    id: 2,
    thumb: "/images/website/market_3.png",
    categoryName: "Packaging",
    link: "packaging",
    shortDesc: "Advanced packaging solutions for all industries",
    description: "Professional packaging solutions including industrial bags, wraps, and protective materials for various applications.",
    parentId: 0,
    children: [
      {
        id: 21,
        thumb: "/images/website/product-list_3.png",
        categoryName: "Industrial Bags",
        link: "industrial-bags",
        shortDesc: "Heavy-duty industrial packaging bags",
        description: "Durable bags for industrial and commercial use",
        parentId: 2,
        children: []
      },
      {
        id: 22,
        thumb: "/images/website/product-list_4.png",
        categoryName: "Food Wrap & Films",
        link: "food-wrap-films",
        shortDesc: "Protective films and wraps",
        description: "High-quality wrapping solutions for food preservation",
        parentId: 2,
        children: []
      }
    ]
  },
  {
    id: 3,
    thumb: "/images/website/market_4.png",
    categoryName: "Engineering Plastics",
    link: "engineering-plastics",
    shortDesc: "High-performance engineering plastic materials",
    description: "Advanced plastic materials and compounds for technical and industrial applications including masterbatch and specialty resins.",
    parentId: 0,
    children: [
      {
        id: 31,
        thumb: "/images/website/product-list_5.png",
        categoryName: "Masterbatch Compounds",
        link: "masterbatch-compounds",
        shortDesc: "Color and additive masterbatch",
        description: "Quality masterbatch for plastic manufacturing",
        parentId: 3,
        children: []
      }
    ]
  },
  {
    id: 4,
    thumb: "/images/website/market_2.png",
    categoryName: "Eco-Friendly Products",
    link: "eco-friendly-products",
    shortDesc: "Sustainable and biodegradable solutions",
    description: "Environmentally responsible products made from compostable materials for a greener future.",
    parentId: 0,
    children: []
  },
  {
    id: 5,
    thumb: "/images/website/product-list_6.png",
    categoryName: "Plastic Resins",
    link: "plastic-resins",
    shortDesc: "High-quality plastic resin materials",
    description: "Premium plastic resins for manufacturing and industrial applications.",
    parentId: 0,
    children: []
  }
];

// Products
export const mockProducts = [
  // Consumer Goods - Food Packaging
  {
    id: 101,
    categoryId: 11,
    thumb: "/images/website/product-list_1.png",
    prodName: "Food Wrap",
    slug: "food-wrap",
    sku: "036897488221-2",
    shortDesc: "100% compostable food wrap made from PBAT material",
    description: "100% compostable: made from PBAT compostable material, AnEco food wrap is capable of completely decomposing within 6-12 months into humus, water, Co2. With outstanding features to other products on the market, AnEco compostable cling wrap is transparent, flexible with a sharp cutting bar, easy for consumers in food preservation.",
    specification: "Material: PBAT Compostable\nDecomposition Time: 6-12 months\nFeatures:\n• Transparent and flexible\n• Sharp cutting bar\n• Easy to use\n• FDA Compliant\n• CFIA Compliant\n• Kosher Compliant",
    dataSheet: "/datasheets/food-wrap.pdf",
    media: [
      "/images/website/product_1.png",
      "/images/website/product_2.png",
      "/images/website/product_3.png"
    ]
  },
  {
    id: 102,
    categoryId: 11,
    thumb: "/images/website/product-list_3.png",
    prodName: "Compostable Food Container",
    slug: "compostable-food-container",
    sku: "036897488221-3",
    shortDesc: "Eco-friendly food storage containers",
    description: "Premium compostable food containers perfect for takeaway, food service, and home use. Made from sustainable materials that decompose naturally.",
    specification: "Material: Plant-based Bioplastic\nCapacity: Various sizes available\nTemperature Range: -20°C to +100°C\nCertifications: BPI Certified Compostable",
    dataSheet: "/datasheets/food-container.pdf",
    media: [
      "/images/website/product-list_3.png"
    ]
  },
  {
    id: 103,
    categoryId: 11,
    thumb: "/images/website/product-list_5.png",
    prodName: "Biodegradable Cutlery Set",
    slug: "biodegradable-cutlery-set",
    sku: "036897488221-4",
    shortDesc: "Compostable forks, knives, and spoons",
    description: "Sturdy and eco-friendly cutlery made from renewable plant-based materials. Perfect alternative to plastic utensils.",
    specification: "Material: PLA/CPLA\nSet Includes: Fork, Knife, Spoon\nLength: 165mm\nWeight Capacity: Up to 2kg\nCertifications: EN13432 Compliant",
    dataSheet: "/datasheets/cutlery.pdf",
    media: [
      "/images/website/product-list_5.png"
    ]
  },
  
  // Consumer Goods - Household Items
  {
    id: 104,
    categoryId: 12,
    thumb: "/images/website/product-list_4.png",
    prodName: "Eco-Friendly Shopping Bags",
    slug: "eco-friendly-shopping-bags",
    sku: "036897488221-5",
    shortDesc: "Reusable and biodegradable shopping bags",
    description: "Durable shopping bags made from eco-friendly materials. Perfect for groceries, retail, and everyday use.",
    specification: "Material: Recycled Plastic/Bioplastic Blend\nCapacity: 15kg\nDimensions: 380mm x 420mm\nHandle Type: Reinforced loop\nColors: Various",
    dataSheet: "/datasheets/shopping-bags.pdf",
    media: [
      "/images/website/product-list_4.png"
    ]
  },
  {
    id: 105,
    categoryId: 12,
    thumb: "/images/website/product-list_6.png",
    prodName: "Compostable Trash Bags",
    slug: "compostable-trash-bags",
    sku: "036897488221-6",
    shortDesc: "Heavy-duty compostable waste bags",
    description: "Strong and leak-proof compostable trash bags for kitchen and garden waste. Breaks down naturally in composting facilities.",
    specification: "Material: PBAT + PLA\nSizes: 30L, 50L, 80L\nThickness: 20 microns\nCertifications: OK Compost HOME\nRoll: 15 bags per roll",
    dataSheet: "/datasheets/trash-bags.pdf",
    media: [
      "/images/website/product-list_6.png"
    ]
  },

  // Packaging - Industrial Bags
  {
    id: 201,
    categoryId: 21,
    thumb: "/images/website/product-list_2.png",
    prodName: "Overlock Jumbo Bag",
    slug: "overlock-jumbo-bag",
    sku: "036897488221-2",
    shortDesc: "Heavy-duty industrial FIBC jumbo bags",
    description: "High-strength jumbo bags with overlock stitching for maximum durability. Ideal for bulk material handling in agriculture, construction, and industry.",
    specification: "Type: FIBC (Flexible Intermediate Bulk Container)\nCapacity: 500kg - 2000kg\nMaterial: PP Woven Fabric\nSafety Factor: 5:1\nFilling/Discharge: Top/Bottom spout\nStitching: Overlock reinforced",
    dataSheet: "/datasheets/jumbo-bag.pdf",
    media: [
      "/images/website/product-list_2.png"
    ]
  },
  {
    id: 202,
    categoryId: 21,
    thumb: "/images/website/product-list_3.png",
    prodName: "Industrial Pallet Wrap",
    slug: "industrial-pallet-wrap",
    sku: "036897488221-7",
    shortDesc: "Stretch film for pallet wrapping",
    description: "High-performance stretch wrap film for securing palletized loads during storage and transportation.",
    specification: "Material: LLDPE\nWidth: 500mm\nThickness: 17-23 microns\nLength: 300m per roll\nStretch Ratio: Up to 300%\nCore Size: 76mm",
    dataSheet: "/datasheets/pallet-wrap.pdf",
    media: [
      "/images/website/product-list_3.png"
    ]
  },

  // Packaging - Food Wrap & Films
  {
    id: 203,
    categoryId: 22,
    thumb: "/images/website/product_1.png",
    prodName: "Premium Cling Film",
    slug: "premium-cling-film",
    sku: "036897488221-8",
    shortDesc: "Professional grade food wrap film",
    description: "Ultra-clear cling film with excellent cling properties. Perfect for food preservation in commercial kitchens and food service.",
    specification: "Material: PVC/PE\nWidth: 300mm - 450mm\nLength: 300m - 1500m\nThickness: 10-12 microns\nFeatures: Easy tear, strong cling\nFood Contact: FDA approved",
    dataSheet: "/datasheets/cling-film.pdf",
    media: [
      "/images/website/product_1.png",
      "/images/website/product_2.png"
    ]
  },
  {
    id: 204,
    categoryId: 22,
    thumb: "/images/website/product-list_4.png",
    prodName: "Protective Bubble Wrap",
    slug: "protective-bubble-wrap",
    sku: "036897488221-9",
    shortDesc: "Cushioning bubble wrap for packaging",
    description: "Lightweight and effective cushioning material for protecting fragile items during shipping and storage.",
    specification: "Material: LDPE\nBubble Size: 10mm, 25mm\nWidth: 1000mm, 1200mm\nLength: 50m, 100m per roll\nApplications: E-commerce, Moving, Storage",
    dataSheet: "/datasheets/bubble-wrap.pdf",
    media: [
      "/images/website/product-list_4.png"
    ]
  },

  // Engineering Plastics - Masterbatch
  {
    id: 301,
    categoryId: 31,
    thumb: "/images/website/product-list_5.png",
    prodName: "Color Masterbatch",
    slug: "color-masterbatch",
    sku: "036897488221-10",
    shortDesc: "High-quality color concentrates for plastics",
    description: "Premium masterbatch for coloring plastic products. Excellent dispersion, heat stability, and color consistency for injection molding, extrusion, and blow molding.",
    specification: "Carrier: PE, PP, PS, ABS\nPigment Loading: 20-50%\nColors: Full spectrum available\nApplications: Injection, Extrusion, Blow molding\nHeat Stability: Up to 280°C\nPackaging: 25kg bags",
    dataSheet: "/datasheets/masterbatch.pdf",
    media: [
      "/images/website/product-list_5.png"
    ]
  },
  {
    id: 302,
    categoryId: 31,
    thumb: "/images/website/product-list_6.png",
    prodName: "Additive Masterbatch",
    slug: "additive-masterbatch",
    sku: "036897488221-11",
    shortDesc: "Functional additives for plastic enhancement",
    description: "Specialized masterbatch for improving plastic properties including UV protection, flame retardancy, and anti-static properties.",
    specification: "Types: UV Stabilizer, Flame Retardant, Anti-static, Anti-block\nCarrier: PE, PP\nDosage: 1-5%\nCertifications: REACH, RoHS compliant\nShelf Life: 24 months\nStorage: Cool, dry place",
    dataSheet: "/datasheets/additive-masterbatch.pdf",
    media: [
      "/images/website/product-list_6.png"
    ]
  },

  // Eco-Friendly Products
  {
    id: 401,
    categoryId: 4,
    thumb: "/images/website/product-list_1.png",
    prodName: "Biodegradable Mulch Film",
    slug: "biodegradable-mulch-film",
    sku: "036897488221-12",
    shortDesc: "Eco-friendly agricultural film",
    description: "Fully biodegradable mulch film for agriculture. Eliminates the need for removal and disposal, naturally breaks down in soil.",
    specification: "Material: PLA + PBAT blend\nThickness: 12-25 microns\nWidth: 1000mm - 1600mm\nLength: Custom\nDegradation: 6-24 months in soil\nCertifications: EN 17033 compliant",
    dataSheet: "/datasheets/mulch-film.pdf",
    media: [
      "/images/website/product-list_1.png"
    ]
  },

  // Plastic Resins
  {
    id: 501,
    categoryId: 5,
    thumb: "/images/website/product-list_2.png",
    prodName: "Virgin PP Resin",
    slug: "virgin-pp-resin",
    sku: "036897488221-13",
    shortDesc: "High-purity polypropylene resin",
    description: "Premium virgin PP resin for manufacturing high-quality plastic products. Excellent mechanical properties and processability.",
    specification: "Grade: Homopolymer/Copolymer\nMFI: 2-35 g/10min\nDensity: 0.90-0.91 g/cm³\nApplications: Injection molding, Film, Fiber\nPackaging: 25kg bags or bulk\nOrigin: Asia/Europe",
    dataSheet: "/datasheets/pp-resin.pdf",
    media: [
      "/images/website/product-list_2.png"
    ]
  },
  {
    id: 502,
    categoryId: 5,
    thumb: "/images/website/product-list_3.png",
    prodName: "HDPE Resin",
    slug: "hdpe-resin",
    sku: "036897488221-14",
    shortDesc: "High-density polyethylene resin",
    description: "Versatile HDPE resin suitable for blow molding, injection molding, and pipe extrusion applications.",
    specification: "Grade: Film, Blow Molding, Injection\nMFI: 0.2-20 g/10min\nDensity: 0.94-0.97 g/cm³\nApplications: Bottles, Containers, Pipes\nPackaging: 25kg bags\nCertifications: FDA, NSF",
    dataSheet: "/datasheets/hdpe-resin.pdf",
    media: [
      "/images/website/product-list_3.png"
    ]
  }
];

export const mockFilterList = [
  {
    id: 1,
    name: "Price Range",
    type: "range",
    options: [
      { value: "0-50", label: "Under $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100-200", label: "$100 - $200" },
      { value: "200+", label: "Above $200" }
    ]
  },
  {
    id: 2,
    name: "Material Type",
    type: "checkbox",
    options: [
      { value: "compostable", label: "Compostable" },
      { value: "biodegradable", label: "Biodegradable" },
      { value: "recyclable", label: "Recyclable" },
      { value: "virgin", label: "Virgin Plastic" }
    ]
  },
  {
    id: 3,
    name: "Availability",
    type: "radio",
    options: [
      { value: "in-stock", label: "In Stock" },
      { value: "out-of-stock", label: "Out of Stock" },
      { value: "pre-order", label: "Pre-order" }
    ]
  }
];
