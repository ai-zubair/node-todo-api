const mongoose = require('mongoose');

//configure mongoose to use the Js built in promises and not the ones from any third party
mongoose.Promise = global.Promise;

//connecting to a mongo db server and tapping into the specified db
mongoose.connect(process.env.MONGOLAB_URI||'mongodb://localhost:27017/TodoApp',{useNewUrlParser : true})

//exporting the configured mongoose variable
module.exports = {
    mongoose
}