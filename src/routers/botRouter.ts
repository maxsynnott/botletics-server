import { BotController } from '../controller/BotController';
import express from 'express';
const router = express.Router();

const controller = new BotController();

router.get('/', controller.index);
router.post('/', controller.create);

export default router;
