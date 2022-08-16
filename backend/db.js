const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/iNotebook';

const connectToMongo =()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log('Mongoose Connect To MongoDB');
    })
}

module.exports = connectToMongo;