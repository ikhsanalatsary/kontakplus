'use strict';

import express from 'express';
import basicAuth from './middleware.js';
import controller from './controller/contacts.controller';

const router = express.Router();

router.use(basicAuth);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
