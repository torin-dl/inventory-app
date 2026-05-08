const { Router } = require("express");
const dogsController = require("../controllers/dogsController");

const router = Router();

router.get("/", dogsController.showDogsGet);
router.post("/", dogsController.showDogsPost);
router.get("/create", dogsController.addDogGet);
router.post("/create", dogsController.addDogPost);
router.get("/update", dogsController.updateDogGet);
router.post("/update", dogsController.updateDogPost);
/*
router.get("/remove");
router.post("/remove"); //input name of item or category to delete, controller handles it. specify if item or category
*/

module.exports = router;
