import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import router from './routers';
import { ThirdPartyProvider, User } from './entity/User';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
// import passport from 'passport';
// import passportGoogleOAuth20 from 'passport-google-oauth20';

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		app.use(bodyParser.json());
		app.use(
			cors({
				origin: 'http://localhost:3000',
				credentials: true,
			}),
		);
		app.use(cookieParser());

		// Temp Auth Logic Location
		const passport = require('passport');
		const GoogleStrategy = require('passport-google-oauth20').Strategy;

		const userRepository = getRepository(User);

		passport.serializeUser((user, done) => {
			done(null, user.id);
		});

		passport.deserializeUser(async (id, done) => {
			const user = await userRepository.findOne(id);
			done(null, user);
		});

		passport.use(
			new GoogleStrategy(
				{
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
					callbackURL: '/auth/google/callback',
				},
				async (accessToken, refreshToken, profile, done) => {
					let user = await userRepository.findOne({
						thirdPartyId: profile.id,
						thirdPartyProvider: ThirdPartyProvider.GOOGLE,
					});

					if (!user) {
						const newUser = new User();
						newUser.thirdPartyId = profile.id;
						newUser.thirdPartyProvider = ThirdPartyProvider.GOOGLE;
						newUser.email = profile.emails[0].value;
						user = await userRepository.save(newUser);
					}

					done(null, user);
				},
			),
		);

		app.use(
			cookieSession({
				// 1 day
				maxAge: 24 * 60 * 60 * 1000,
				keys: [process.env.SESSION_SECRET],
			}),
		);
		app.use(passport.initialize());
		app.use(passport.session());

		app.get(
			'/auth/google/init',
			passport.authenticate('google', {
				scope: ['profile', 'email'],
			}),
		);

		app.get(
			'/auth/google/callback',
			passport.authenticate('google'),
			(req, res) => {
				return res.redirect('http://localhost:3000/');
			},
		);

		// register express routes from defined application routes
		app.use(router);

		// setup express app here
		// ...

		// start express server
		const port = process.env.PORT || 8080;
		app.listen(port);

		console.log(
			`Express server has started on port ${port}. Open http://localhost:${port}/users to see results`,
		);
	})
	.catch((error) => console.log(error));
