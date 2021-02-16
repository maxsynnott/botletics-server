import { MatchController } from '../controller/MatchController';
import express from 'express';
const router = express.Router();

const controller = new MatchController();

router.post('/', controller.create);

export default router;
