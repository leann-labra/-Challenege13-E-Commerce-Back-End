const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
//get ALL
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tagIds" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get ID
router.get("/:id", async (req, res) => {
  try {
    const tagDataById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tagIds" }],
    });
    //---if tag not found---//
    if (!tagDataById) {
      res.status(404).json({ message: "Not tag with that id exists." });
      return;
    }
    res.status(200).json(tagDataById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT: updating a tag name by id value
router.put("/:id", async (req, res) => {
  try {
    const updatedTagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    //-----if tag with that id is not found----//
    if (!updatedTagData) {
      res.status(404).json({ message: "Sorry! No tag with that id exists." });
      return;
    }
    res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE tag by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedTagData = await Tag.destroy({
      //---deleting tag by id---//
      where: {
        id: req.params.id,
      },
    });
    //----if tag id not found---//
    if (!deletedTagData) {
      res.status(404).json({ message: "Sorry! No tag with that ID exists." });
      return;
    }
    res.status(200).json(deletedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
