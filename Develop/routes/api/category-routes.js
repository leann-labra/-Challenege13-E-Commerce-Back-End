const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET ALL
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ID
router.get("/:id", async (req, res) => {
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryDataById) {
      res.status(404).json({ message: "No category with that Id exists." });
      return;
    }
    res.status(200).json(categoryDataById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const updatedCategoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedCategoryData) {
      res.status(404).json({ message: "No category with that Id exists." });
      return;
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategoryData) {
      res.status(404).json({ message: "No category with that Id exists." });
      return;
    }
    res.status(200).json(deletedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
