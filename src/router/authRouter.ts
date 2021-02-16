import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
	'/google/init',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	}),
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	return res.redirect('http://localhost:3000/');
});

export default router;
