const express = require('express');
const router = express.Router();
var request = require('request');

// Register Form
router.get('/trainstatus', function(req, res){
  res.render('trainstatus',{
	  trainname:null,
	  trainschedule:null
  });
});
router.get('/pnrstatus', function(req, res){
  res.render('pnrstatus');
});
router.get('/livetrainstatus', function(req, res){
  res.render('livetrainstatus');
});
router.get('/seatavailability', function(req, res){
  res.render('seatavailability');
});
router.post('/trainstatus', function(req,res) {
	const trainnumber = req.body.trainnumber;
	var trainname1;
	var day = "";
	const url = "https://api.railwayapi.com/v2/name-number/train/"+ trainnumber+ "/apikey/7l2xrdda2i";
	request(url, function (error, response, data) {
		console.log('error:', error);
		data = JSON.parse(data);
		trainname1 = data.train.name;
		for(i=0;i<data.train.days.length;i++){
			if(data.train.days[i].runs == "Y"){
				day += data.train.days[i].code + " ";
			}
		}
		//console.log(data);
		if(error){
			throw error;
		}
		else{
			res.render('trainstatus',{
				trainname:trainname1,
				trainschedule:day
			});
		}
	});
});
module.exports = router;