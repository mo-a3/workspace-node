const mongoose = require('mongoose');

const customerSchema =  new mongoose.Schema({
	    name: {
	        type: String,
	      },
	      email:{
	        type: String,
	      },
	      phone:{
	        type: String,
	      },
	      address:{
	        type: String,
	      }
},{
	    timestamps: true,
});

module.exports= mongoose.model('customer', customerSchema);