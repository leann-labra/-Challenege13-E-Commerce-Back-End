// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  //deleting all children elems belonging to category
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: "product_id",
  //an alias for when data is being retrieved
  as: "productId",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: "tag_id",
  as: "tagIds",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
