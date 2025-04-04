module.exports = {
  identityProvider: {
    issuer: 'https://your-identity-provider.com',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectUri: 'https://your-app.com/callback',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: '1h',
  },
};
