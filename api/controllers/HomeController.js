/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  index: function(req, res){
    Upload.find({}, function(err, findUpload){
      if(err) return err;
      
      data = 0;
      if(_.isEmpty(findUpload)){
        data = 0;
      }else{
        data = findUpload;
      }
      // console.log(data) 
      // return res.view("home", data);  
      return res.view("sipa-psu", data);  
    })
    
  },

  clear: function(req, res){
    Upload.destroy(function(err, deleteResult){
      if(err) return err;
      return res.json({
        data: "clear"
      });  
    })
  }

};

