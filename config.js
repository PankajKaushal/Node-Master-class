var enviroments = {
    dev : {
        port : 4000
    },
    prod : {
        port : 4001
    }
};

var envType = process.env.envType ? lower(process.env.envType) : 'dev';
var enviroment = enviroments[envType];

module.exports = enviroment;