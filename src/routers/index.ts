import express from 'express';
const router = express.Router();

import matchRouter from './matchRouter';
import botRouter from './botRouter';

router.use('/matches', matchRouter);
router.use('/bots', botRouter);

export default router;
