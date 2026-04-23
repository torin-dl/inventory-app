const { Router } = require("express");
const dogsController = require("../controllers/dogsController");

const router = Router();

router.get("/"); // takes in parameter, controller filters list, renders list in partials
router.post("/");
router.get("/create");
router.post("/create");
router.get("/update");
router.post("/update"); // input name or id, specify if item or category
router.get("/delete");
router.post("/delete"); //input name of item or category to delete, controller handles it. specify if item or category

module.exports = router;
