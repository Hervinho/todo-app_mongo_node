var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  var config = require('./config.json');
  var envConfig = config[env];//grab environment type from config.json

  //grab objects from specified environment type from config.json
  Object.keys(envConfig).forEach((key) => {
    process.env.key = envConfig[key];
  });
}
