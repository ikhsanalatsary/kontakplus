import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import basicAuth from './middleware';
import controller from './controller/contacts.controller';

const router = Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve('client/uploads'));

    // modify upload dest
  },
  filename(req, file, cb) {
    cb(null, file.originalname);

    // modify file name
  },
});

const upload = multer({ storage });
const type = upload.single('avatar');

router.use(basicAuth);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/upload', type, controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router;
