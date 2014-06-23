var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/al', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.insert(data, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
            
        });
    });
	
	// Locate all the entries using find
    collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
	
});
 });
 var data= [

 {
                "ident": "DAL116",
                "aircrafttype": "B752",
                "origin": "KTPA",
                "destination": "KATL",
                "filed_ete": "01:15:00",
                "route": "ENDED4 CTY HONIE8",
                "faFlightID": "DAL116-1318311885-airline-0362",
                "filed_altitude": 360,
                "filed_airspeed_kts": 465,
                "filed_time": 1318532269,
                "filed_departuretime": 1318531500,
                "estimatedarrivaltime": 1318536216,
                "actualarrivaltime": 1318536660,
                "actualdeparturetime": 1318532220
        }
		
];
 
