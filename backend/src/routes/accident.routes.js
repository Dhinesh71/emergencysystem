const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accident.controller');
const upload = require('../middlewares/upload.middleware');

// POST /api/accidents
// 'image' matches the key sent by the hardware script
router.post('/', upload.single('image'), accidentController.createAccident);

// GET /api/accidents
router.get('/', accidentController.getAllAccidents);

// GET /api/accidents/:id
router.get('/:id', accidentController.getAccidentById);

module.exports = router;
