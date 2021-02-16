import { Router } from 'express';
import matchRouter from './matchRouter';
import botRouter from './botRouter';
import authRouter from './authRouter';

const router = Router();
router.use('/matches', matchRouter);
router.use('/bots', botRouter);
router.use('/auth', authRouter);

export { router };
