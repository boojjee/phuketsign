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
      console.log()
      return res.view("home", data);  
    })
    
  }

};

