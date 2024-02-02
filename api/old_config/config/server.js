module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),  
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "3a15b882379b3a021dc924c0a2eae33f"),
    },
  },
});
