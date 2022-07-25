const mongoose = require ('mongoose');

const addressSchema = new mongoose.Schema({
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', require: true},
    cep: {type: String, require: true},
    streetName: {type: String},
    streetNumber: {type: String},
    complement: {type: String},
    district: {type: String},
    city: {type: String},
    state: {type: String}
},
{
    timestamps: true
});

mongoose.model('Address', addressSchema);
