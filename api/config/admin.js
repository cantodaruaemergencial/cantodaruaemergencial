module.exports = ({ env }) => ({
	// ...
	admin: {
		auth: {
			secret: env("ADMIN_JWT_SECRET", "3a15b882379b3a021dc924c0a2eae33f"),
		},
	},
});
