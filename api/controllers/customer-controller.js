const mongoose = require('mongoose');
const CustomerModel = mongoose.model('Customer');
const AddressModel = mongoose.model('Address');

module.exports = {

    get_all_customers: async (req,res, next) => {
        try {
            const customers = await CustomerModel.find()
            res.status(200).json({
                count: customers.length,
                customers: customers.map(customer => {
                return {
                    name: customer.name,
                    lastName: customer.lastName,
                    telephone: customer.telephone,
                    email: customer.email,
                    status: customer.status,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/customer/" + customer._id
                    }
                }
                })
            })
        }catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    add_customer: async (req, res, next) => {

        try{
            if(!req.body.name){
                res.status(404).json({message: "Nome é obrigatório"});
                return;
            }

            const customer = new CustomerModel({
                name: req.body.name,
                lastName: req.body.lastName,
                telephone: req.body.telephone,
                email: req.body.email,
                status: req.body.status
            });
            await customer.save();
            res.status(201).json({
                message: 'Cliente criado com sucesso!',
                createdCustomer: {
                    _id: customer._id,
                    name: customer.name,
                    lastName: customer.lastName,
                    telephone: customer.telephone,
                    email: customer.email,
                    status: customer.status,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/customer/" + customer._id
                    }
                }
            })  
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    delete_by_id: async (req, res, next) => {
        const id = req.params.customerId;
        try{
            const customer = await CustomerModel.deleteOne({_id: id});
            if(customer){
                res.status(200).json({
                    customer:  customer,
                    message: "Endereço excluido com sucesso",
                })
            }else{
                res.status(404).json({
                    message: "Pessoa não existe!"
                })
            }
        }catch (err){
            console.log(err);
            res.status(500).json(err);
        }   
    },

    get_by_id :async (req,res, next)=> {
        const id = req.params.customerId
        try{
            const customer = await CustomerModel.findOne({_id: id});
            const adresses = await AddressModel.find({customer_id: id});
            if (customer) {
                res.status(200).json({customer: customer, adresses: adresses});
            }else{
                res.status(404).json("Customer não existe!");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }


}