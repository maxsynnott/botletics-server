import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import routes from './routes';

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		app.use(bodyParser.json());

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
		app.listen(8080);

		// insert new users for test
		// await connection.manager.save(
		// 	connection.manager.create(User, {
		// 		email: 'user1@example.com',
		// 		thirdPartyId: '123',
		// 		thirdPartyProvider: ThirdPartyProvider.GOOGLE,
		// 	}),
		// );
		// await connection.manager.save(
		// 	connection.manager.create(User, {
		// 		email: 'user1@example.com',
		// 		thirdPartyId: '124',
		// 		thirdPartyProvider: ThirdPartyProvider.GOOGLE,
		// 	}),
		// );

		console.log(
			'Express server has started on port 3000. Open http://localhost:3000/users to see results',
		);
	})
	.catch((error) => console.log(error));
