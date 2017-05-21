import { Router } from 'express';
import basicAuth from './middleware';
import controller from './controller/contacts.controller';

const router = Router();

router.use(basicAuth);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/upload', controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router;
