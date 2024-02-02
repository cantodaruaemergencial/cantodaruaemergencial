module.exports = ({ env }) => ({
	connection: {
		client: "mysql",
		connection: {
			host: env("DATABASE_HOST", "127.0.0.1"),
			port: env.int("DATABASE_PORT", 3306),
			database: env("DATABASE_NAME", "cantodarua-db"),
			user: env("DATABASE_USERNAME", "root"),
			password: env("DATABASE_PASSWORD", "secret"),
			schema: env("DATABASE_SCHEMA", "public"), // Not Required
			ssl: {
				rejectUnauthorized: env.bool("DATABASE_SSL", true), // For self-signed certificates
			},
		},
		debug: false,
	},
});
