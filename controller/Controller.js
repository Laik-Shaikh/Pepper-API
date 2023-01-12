const Model = require("../models/Model");
const grid = require('gridfs-stream');
const mongoose = require('mongoose');

const url = 'http://localhost:7000/admin';   // server url

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

exports.uploadImage = (request, response) => {
  if(!request.file) 
      return response.status(404).json("File not found");
  
  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json({
    isTrue: true,
    imageUrl
  });    
}

exports.getImage = async (request, response) => {
  try {   
      const file = await gfs.files.findOne({ filename: request.params.filename });
      
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(response);
  } catch (error) {
      response.status(500).json({ msg: error.message });
  }
}

exports.updateDetails = async (request, response) => {
  try {

    const data = request.body;
    let record = await Model.find();

    if(record.length === 0) {
      let newRecord = await new Model(data);
      let result = await newRecord.save({ validateBeforeSave:false });
      return response.status(200).json({
        msg: "Record added successfully",
        newRecord,
        result,
      });
    }

    const ID = record[0]._id;
    record = await Model.findByIdAndUpdate(ID, { $set: data });

    response.status(200).json({
      msg: "Updated Successfully",
      record
    });



  } catch (error) {
    return response.status(500).json({
      error: error.message,
    });
  }
};

exports.updateCount = async (request, response) => {
  try {

    const record = await Model.find();
    const ID = record[0]._id;

    let data = {
       count : record[0].count + 1
    }

    let details = await Model.findByIdAndUpdate(ID, { $set: data });

    
  } catch (error) {
    return response.status(500).json({
      error: error.message
    })
  }
}

exports.getDetails = async (request, response) => {
  try {
    const details = await Model.findOne();

    response.status(200).json({
      details
    });

  } catch (error) {
    return response.status(500).json({
      error: error.message,
    });
  }
}
