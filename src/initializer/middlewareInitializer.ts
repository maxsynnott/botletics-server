import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

export const initMiddleware = (app) => {
	app.use(bodyParser.json());

	app.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		}),
	);

	app.use(cookieParser());

	app.use(
		cookieSession({
			// 1 day
			maxAge: 24 * 60 * 60 * 1000,
			keys: [process.env.SESSION_SECRET],
		}),
	);
};
