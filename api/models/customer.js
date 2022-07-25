const mongoose = require ('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type: String, require: true},
    lastName: {type: String},
    telephone: {type: String},
    email: {type: String},
    status: {type: Boolean}
},
{
    timestamps: true
})

mongoose.model('Customer', customerSchema);
