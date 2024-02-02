module.exports = [
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			origin: [
				"http://localhost",
				"https://mysite.com",
				"https://www.mysite.com",
			],
		},
	},
	"strapi::poweredBy",
	"strapi::logger",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
