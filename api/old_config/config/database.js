module.exports = ({ env }) => ({
	defaultConnection: "default",
	connections: {
		default: {
			connector: "bookshelf",
			settings: {
				client: "mysql",
				host: env("DATABASE_HOST", "127.0.0.1"),
				port: env.int("DATABASE_PORT", 3306),
				database: env("DATABASE_NAME", "cantodarua-db"),
				username: env("DATABASE_USERNAME", "root"),
				password: env("DATABASE_PASSWORD", "secret"),
				ssl: env.bool("DATABASE_SSL", true),
			},
			options: {
				useNullAsDefault: true,
			},
		},
	},
});
