const express = require('express');

const {
    getIndexPage,
    getAllMonsPage,
    getOneMonsPage,
    getCreateMonsPage,
    getUpdateMonsPage,
    getAllTrainersPage,
    getOneTrainersPage,
    getOneRegionPage,
} = require('../../controllers/client/viewController');

const router = express.Router();

router.get('/', getIndexPage);
router.get('/allMons', getAllMonsPage);
router.get('/oneMon/:name', getOneMonsPage);
router.get('/createMon', getCreateMonsPage);
router.get('/updateMon/:name', getUpdateMonsPage);
router.get('/allTrainers', getAllTrainersPage);
router.get('/oneTrainer/:id', getOneTrainersPage);
router.get('/regions/:region', getOneRegionPage)

module.exports = router;