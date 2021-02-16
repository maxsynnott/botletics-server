import { BotController } from '../controller/BotController';
import { Router } from 'express';

const controller = new BotController();

const router = Router();
router.get('/', controller.index);
router.post('/', controller.create);

export default router;
