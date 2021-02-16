import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import routes from './routes';
import { ThirdPartyProvider, User } from './entity/User';
import * as cors from 'cors';
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

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

		const userRepository = getRepository(User);

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
		routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				(req: Request, res: Response, next: Function) => {
					const result = new (route.controller as any)()[
						route.action
					](req, res, next);
					if (result instanceof Promise) {
						result.then((result) =>
							result !== null && result !== undefined
								? res.send(result)
								: undefined,
						);
					} else if (result !== null && result !== undefined) {
						res.json(result);
					}
				},
			);
		});

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
