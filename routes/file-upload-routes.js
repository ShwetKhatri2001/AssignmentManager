'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload, multipleFileUpload, getallSingleFiles, getallMultipleFiles} = require('../controllers/fileuploaderController');
const { getFormData, saveFormData } = require('../controllers/userdata.js');
const router = express.Router();

router.get('/getFormData', getFormData);
router.post('/saveFormData', saveFormData);
router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}