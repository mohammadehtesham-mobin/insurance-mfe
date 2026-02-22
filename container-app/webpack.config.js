const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
   'policy-mfe': 'https://cerulean-beijinho-a3aebd.netlify.app/remoteEntry.js',
   'payment-mfe': 'https://velvety-kangaroo-c964de.netlify.app/remoteEntry.js',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
