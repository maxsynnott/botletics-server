import { MatchController } from '../controller/MatchController';
import { Router } from 'express';

const controller = new MatchController();

const router = Router();
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/run', controller.run);

export default router;
