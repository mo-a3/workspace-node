var MongoClient = require('mongodb').MongoClient;
var customerSchema = require('../schema/customer-model');
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var {ObjectId} = require('mongodb');

// _id
var service= {};
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';

service.getCustomers = function(){ 
   console.log("get records with mongoose");
   return customerSchema.find();
};

service.getCustomersCallback = function(callback){ 
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
    function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result);
      });
    client.close();
  });
};

service.getCustomerById = (id)=>{
   return customerSchema.find({"_id":id})
};

service.addCustomer = (record)=> {
  console.log("addCustomer..");
  return customerSchema.create(record);
}

service.deleteCustomer =  (recordId)=>{
  console.log("delete Customer..");
  return customerSchema.deleteOne({"_id" : recordId});
};

service.updateCustomer = function(customer){
  console.log("update Customer.."+JSON.stringify(customer));
  customer._id = customer.id;
  delete(customer.id);
  return customerSchema.findByIdAndUpdate({_id:customer._id},customer)

};

service.getCustomersBySearch = function(field,searchText){
  return new Promise((resolve, reject) => {
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
  });
}
//sqlService.getCustomersBySearch(searchParam,callback);
service.getCustomersBySearchOLD = function(searchParam){
  return new Promise((resolve, reject) => {
    var records = [];
    //searhObject = {searchParam.field: '//i'}
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({name: /vivek/i}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        resolve(result);
        client.close();
         });
      });
   ;
  });
}

module.exports=service;




// brew services start mongodb-community@6.0
// brew services stop mongodb-community@6.0