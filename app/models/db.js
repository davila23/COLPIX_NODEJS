var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// SETUP MONGOOSE
// Local DB -> MONGODB
mongoose.connect('mongodb://localhost:27017/node-crud', {
    useMongoClient: true
});
