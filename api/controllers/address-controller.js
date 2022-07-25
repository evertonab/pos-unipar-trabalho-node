const mongoose = require('mongoose');
const AddressModel = mongoose.model('Address');
const CustomerModel = mongoose.model('Customer');

module.exports = {

    get_all_adresses : async (req, res, next) => {
        try{
            const adresses = await AddressModel.find({})
                /*populate('customer_id');*/
    
            res.status(200).json({
                count: adresses.length,
                adresses: adresses.map(address => {
                    return {
                        _id: address._id,
                        customer_id: address.customer_id,
                        cep: address.cep,
                        streetName : address.streetName,
                        streetNumber: address.streetNumber,
                        complement: address.complement,
                        district : address.district,
                        city: address.city,
                        state: address.state,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/address/" + address._id
                        }
                    }
                })
            })
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }    
    },

    add_address: async (req, res, next) => {
        try{
            if(!req.body.customerId){
                res.status(404).json({message: "ID da pessoa não informado"});
                return;
            }
            if(!req.body.cep){
                res.status(404).json({message: "CEP é Obrigatório"});
                return;
            }
    
            let customer = null;
            try{
                customer = await CustomerModel.findOne({_id: req.body.customerId});
                if(!customer){
                    res.status(404).json({message: "Pessoa não existe"})
                }
            }catch (err){
                console.log(err);
                res.status(500).json(err);
            }   
    
            if(customer){
                let address = new AddressModel({
                    customer_id: customer.id,
                    cep: req.body.cep,
                    streetName : req.body.streetName,
                    streetNumber: req.body.streetNumber,
                    complement: req.body.complement,
                    district : req.body.district,
                    city: req.body.city,
                    state: req.body.state,
                });
                address = await address.save();
                res.status(201).json({
                    message: 'Endereço Criado com sucesso',
                    createdCustomer: {
                        _id: address._id,
                        customer_id: address.customer_id,
                        cep: address.cep,
                        streetName : address.streetName,
                        streetNumber: address.streetNumber,
                        complement: address.complement,
                        district : address.district,
                        city: address.city,
                        state: address.state,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/adresses/" + address._id
                        }
                    }
                })
        }
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }   
    },

    delete_address: async (req, res, next) => {
        const id = req.params.addressId;
        try{
            const address = await AddressModel.deleteOne({_id: id});
            if(address){
                res.status(200).json({
                    address:  address,
                   message: "Endereço excluido com sucesso",
                })
            }else{
                res.status(404).json({
                    message: "Endereço não existe!"
                })
            }
        }catch (err){
            console.log(err);
            res.status(500).json(err);
        }   
    },

    get_by_id: async (req, res, next) => {
        const id = req.params.addressId;
        try{
         const address = await AddressModel.findOne({_id: id}).populate('customer_id');
         if(address){
             res.status(200).json({
                _id: address._id,
                customer_id: address.customer_id,
                cep: address.cep,
                streetName : address.streetName,
                streetNumber: address.streetNumber,
                complement: address.complement,
                district : address.district,
                city: address.city,
                state: address.state,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/address/" + address._id
                }
             })
         }else{
             res.status(404).json({
                 message: "Endereço não existe!"
             })
         }
     }catch (err){
         console.log(err);
         res.status(500).json(err);
     }   
     },



}