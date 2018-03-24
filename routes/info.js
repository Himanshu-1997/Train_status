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
  res.render('pnrstatus',{
	  station:null,
	  station1:null,
	  doj:null,
	  pass:null,
	  tname:null
  });
});
router.get('/fareenquiry', function(req, res){
  res.render('fareenquiry',{
	  fare:null
  });
});
router.get('/seatavailability', function(req, res){
  res.render('seatavailability',{
	  date3:null,
	  availability:null
  });
});
router.get('/trainbetweenstation', function(req, res){
  res.render('trainbetweenstation',{
	  trainname3:null
  });
});

//train_status
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

//pnr_status
router.post('/pnrstatus', function(req,res) {
	const pnr = req.body.pnr_number;
	var station,station1,doj,pass,tname;
	var day = "";
	//const url = "https://api.railwayapi.com/v2/name-number/train/"+ trainnumber+ "/apikey/7l2xrdda2i";
	const url = "https://api.railwayapi.com/v2/pnr-status/pnr/"+ pnr + "/apikey/7l2xrdda2i";
	request(url, function (error, response, data) {
		console.log('error:', error);
		data = JSON.parse(data);
		station = data.from_station.name;
		station1 = data.to_station.name;
		doj = data.doj;
		pass = data.total_passengers;
		tname = data.train.name;
		if(error){
			throw error;
		}
		else{
			res.render('pnrstatus',{
				station:station,
				station1:station1,
				doj:doj,
				pass:pass,
				tname:tname
			});
		}
	});
});

//train between station

router.post('/trainbetweenstation', function(req,res) {
	const src = req.body.source;
	const dest = req.body.dest;
	const date = req.body.date;
	var trainname4=[],date2;
	function convertDate(dateString){
		var p = dateString.split(/\D/g)
		return [p[2],p[1],p[0] ].join("-")
	}
	date2 = convertDate(date.toString());
	const url = "https://api.railwayapi.com/v2/between/source/"+src+"/dest/"+dest+"/date/"+date2+"/apikey/7l2xrdda2i";
	request(url, function (error, response, data) {
		console.log('error:', error);
		data = JSON.parse(data);
		for(i=0;i<data.trains.length;i++){
			trainname4[i] = data.trains[i].name;
		}
		if(error){
			throw error;
		}
		else{
			res.render('trainbetweenstation',{
				trainname3:trainname4
			});
		}
	});
});

//seat_availability
router.post('/seatavailability', function(req,res) {
	const trainnumber = req.body.trainnumber;
	const src = req.body.src;
	const dest = req.body.dest;
	const date2 = req.body.date;
	const class1 = req.body.class1;
	const quota = req.body.quota;
	var trainname1,date;
	var date3=[],status=[];
	function convertDate(dateString){
		var p = dateString.split(/\D/g)
		return [p[2],p[1],p[0] ].join("-")
	}
	date = convertDate(date2.toString());
	const url = "https://api.railwayapi.com/v2/check-seat/train/"+trainnumber+"/source/"+src+"/dest/"+dest+"/date/"+date+"/pref/"+class1+ "/quota/"+quota+"/apikey/7l2xrdda2i"
	request(url, function (error, response, data) {
		console.log('error:', error);
		data = JSON.parse(data);
		//trainname1 = data.availability;
		//console.log(data);
		for(var i=0;i<data.availability.length;i++){
			date3[i] = data.availability[i].date;
			status[i] = data.availability[i].status;
		}
		if(error){
			throw error;
		}
		else{
			res.render('seatavailability',{
				date3:date3,
				status:status
			});
		}
	});
});

//Fare_Enquiry

router.post('/fareenquiry', function(req,res) {
	const trainnumber = req.body.trainnumber;
	const src = req.body.src;
	const dest = req.body.dest;
	const date2 = req.body.date;
	const class1 = req.body.class1;
	const quota = req.body.quota;
	const age = req.body.age;
	var trainname1,date,fare;
	var date3=[],status=[];
	function convertDate(dateString){
		var p = dateString.split(/\D/g)
		return [p[2],p[1],p[0] ].join("-")
	}
	date = convertDate(date2.toString());
	const url = "https://api.railwayapi.com/v2/fare/train/"+trainnumber+"/source/"+src+"/dest/"+dest+"/age/"+age+"/pref/"+class1+"/quota/"+quota+"/date/"+date+"/apikey/7l2xrdda2i"
	request(url, function (error, response, data) {
		console.log('error:', error);
		data = JSON.parse(data);
		//trainname1 = data.availability;
		fare = data.fare;
		//console.log(data);
		/*for(var i=0;i<data.availability.length;i++){
			date3[i] = data.availability[i].date;
			status[i] = data.availability[i].status;
		}*/
		if(error){
			throw error;
		}
		else{
			res.render('fareenquiry',{
				fare:fare
			});
		}
	});
});

module.exports = router;