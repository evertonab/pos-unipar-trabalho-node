const express = require('express');
const router = express.Router();
const controllerCustomer = require('../controllers/customer-controller');


router.get('/', controllerCustomer.get_all_customers);

router.post('/', controllerCustomer.add_customer);

router.delete('/:customerId', controllerCustomer.delete_by_id);

router.get('/:customerId', controllerCustomer.get_by_id);

module.exports = router;