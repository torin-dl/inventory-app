const { Router } = require("express");
const dogsController = require("../controllers/dogsController");

const router = Router();

router.get("/", dogsController.showDogsGet);
router.post("/", dogsController.showDogsPost);
router.get("/create", dogsController.addDogGet);
router.post("/create", dogsController.addDogPost);
router.get("/update", dogsController.updateDogGet);
router.post("/update", dogsController.updateDogPost);
router.get("/remove", dogsController.removeGet);
router.post("/remove", dogsController.removePost);

module.exports = router;
