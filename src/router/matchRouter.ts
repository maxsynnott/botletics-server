import { MatchController } from '../controller/MatchController';
import { Router } from 'express';

const controller = new MatchController();

const router = Router();
router.post('/', controller.create);
router.get('/:id', controller.show);

export default router;
