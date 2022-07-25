const express = require('express');
const { default: mongoose } = require('mongoose');
const router =  express.Router();

const controllerAddress = require('../controllers/address-controller')

router.get('/', controllerAddress.get_all_adresses);

router.post('/', controllerAddress.add_address);

router.delete('/:addressId', controllerAddress.delete_address);

router.get('/:addressId', controllerAddress.get_by_id);

module.exports = router;