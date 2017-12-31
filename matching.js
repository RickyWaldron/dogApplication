require('dotenv').load();
var NodeGeocoder = require('node-geocoder');
 
            var options = {
              provider: 'google',
              httpAdapter: 'https', 
              apiKey: 'AIzaSyBCDnmxmEQFoz4ydD7kKiWBlwvf2lnZbAg', 
              formatter: null
            };
            var geocoder = NodeGeocoder(options);

module.exports = (app, client) => {
	app.get("/match", (req, res) => {
		if (req.session.email){
		let email = req.session.email
		
		client.query(`SELECT size, id, latitude, longitude FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				preferredSize = result.rows[0].size
				userId = result.rows[0].id
				lat1 = result.rows[0].latitude
				lon1 = result.rows[0].longitude
				console.log(lat1)
				console.log(lon1)
				
				client.query(`SELECT * FROM dogs WHERE user_id !='${userId}' AND size='${preferredSize}'`, (errorDist, resultDist) => {
					let allMatches = []
					let allDistances = []	
					if (resultDist.rows.length > 0) {
					if (errorDist) throw error
				function deg2rad(deg) {
					  		return deg * (Math.PI/180)
					  	}
					for (var i = 0; i<resultDist.rows.length; i++){
						var lat2 = resultDist.rows[i].latitude
						var lon2 = resultDist.rows[i].longitude
			    		var R = 6371; // Radius of the earth in km
					    var dLat = deg2rad(lat2-lat1);  // deg2rad below
					    var dLon = deg2rad(lon2-lon1); 
					    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * 
		    				Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
					    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					    var d = R * c; // Distance in km
					    if (d <= 5){
					    allMatches.push(resultDist.rows[i])	
					    console.log("id if d small: " + resultDist.rows[i].id)
						}
						else if(d > 5){
							console.log("distance of no matches : " + d)
							}		
						}
							res.render("match", {email: req.session.email, allMatches: allMatches})
						}		
						else {
						res.redirect("/profile")
							}
						})
					})
				}								
			else {
				res.redirect("/")
			}
		})

	app.get("/matchPersons", (req, res) => {
		if(req.session.email){
		let email = req.session.email
		client.query(`SELECT size, id, dogowner, latitude, longitude FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				dogOwner = result.rows[0].dogowner
				preferredSize = result.rows[0].size
				userId = result.rows[0].id
				lat1 = result.rows[0].latitude
				lon1 = result.rows[0].longitude
				if (dogOwner == true) {
					req.session.dogowner = dogOwner
					client.query(`SELECT * FROM users WHERE size='${preferredSize}' AND id !='${userId}' AND dogowner='${false}'`, (error, result) => {
						let allMatches = []
						function deg2rad(deg) {
					  		return deg * (Math.PI/180)
					  	}
					for (var i = 0; i<result.rows.length; i++){
						var lat2 = result.rows[i].latitude
						var lon2 = result.rows[i].longitude
			    		var R = 6371; // Radius of the earth in km
					    var dLat = deg2rad(lat2-lat1);  // deg2rad below
					    var dLon = deg2rad(lon2-lon1); 
					    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * 
		    				Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
					    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
					    var d = R * c; // Distance in km
					    console.log("distance" + d)
					    if (d <= 5){	
					   	allMatches.push(result.rows[i])
						}
						else if(d > 5){
							console.log("distance of no matches : " + d)
						}		
					}
					console.log(allMatches)
					res.render("matchPersons", {email: req.session.email, allMatches: allMatches, dogOwner: req.session.dogowner})
					})
				}
				else if(dogOwner == false) {
						req.session.dogowner = dogOwner
						res.redirect("/match")
					}
			})		
		}
	else {
			res.redirect("/")
		}
	})
	// app.get("/matchLocation", (req, res) => {
	// 	if(req.session.email){
	// 		let email = req.session.email
	// 		client.query(`SELECT id FROM users WHERE email='${email}'`, (error, result) => {
	// 			let allMatches = []
	// 			let id = result.rows[0].id
	// 			client.query(`SELECT * FROM users WHERE id !='${id}'`, (error, result) => {
	// 				allMatches.push(result)
	// 				console.log(allMatches[0].rows.length)
	// 				res.render("matchLocation", {email: req.session.email, allMatches: allMatches})
	// 				})
	// 			})
	// 		}
	// else {
	// 		res.redirect("/")
	// 	}
	// })
}	