import passport from 'passport';
import { getRepository } from 'typeorm';
import { ThirdPartyProvider, User } from '../entity/User';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const initPassport = (app) => {
	const userRepository = getRepository(User);

	passport.serializeUser((user: Partial<User>, done) => {
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

	app.use(passport.initialize());
	app.use(passport.session());
};
