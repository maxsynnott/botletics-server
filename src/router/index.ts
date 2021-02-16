import express from 'express';
const router = express.Router();

import matchRouter from './matchRouter';
import botRouter from './botRouter';
import authRouter from './authRouter';

router.use('/matches', matchRouter);
router.use('/bots', botRouter);
router.use('/auth', authRouter);

export { router };
