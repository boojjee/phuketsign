/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var UPLOAD_PATH = 'assets/images/';
var mkdirp = require('mkdirp');
module.exports = {
  
  
  index: function (req, res){
   res.view("upload")
  },

  processUpload: function(req, res){
    // var file = req.files.userPhoto,
    var socket = req.socket;
    var io = sails.io;
    dirPath = UPLOAD_PATH;
    id = req.body.id;
    req.file('img').upload(function (err, files) {
      if (err) return res.serverError(err);

      fs.readFile(files[0].fd, function (err, data) {
        if (err) {
          
          return res.json({
            uploaded: false
          }); 

        } else {
          
          fileName = dirPath+files[0].filename;
          
          fs.writeFile(fileName, data, function (err) {
            if (err) {
              // res.json({'error': 'could not write file to storage'});   
              return res.json({
                uploaded: false
              });           
            }
            fname = files[0].filename;
            split_name = fname.split(".");

            image_sign = {
              path: 'images/'+files[0].filename,
              class: id ,
              id: id,
              name: files[0].filename,
            }

            io.sockets.emit('uploaded', image_sign);
              // message: files.length + ' file(s) uploaded successfully!',
              // path: "files.fd",
              // path2: files[0].fd,
              // files: files
            Upload.find({ id: id},function(err, findUpload){
              if(err) return err;
              
              if(_.isEmpty(findUpload)){
                Upload.create(image_sign, function(err, uploadCreated){
                  if(err) return err;
                  return res.json({
                    uploaded: true
                  });
                })
              }else{
                Upload.update({id: id}, image_sign, function(err, updated){
                  if(err) return err;

                  return res.json({
                    uploaded: true
                  });


                })
              }

            })  


            

          });
        }
      });   


      
    });
  }

};

