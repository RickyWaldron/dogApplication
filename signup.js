require('dotenv').load();
const bcrypt = require('bcrypt')

module.exports = (app, client) => {
		app.get("/signup", (req, res) => {
			res.render("signup")
		})
		app.get("/signup2", (req, res) => {
			res.render("signup2", {email: req.session.email})
		})
		app.get("/signupInformation", (req, res) => {
			res.render("signupInformation", {email: req.session.email})
		})
		app.post('/signup', function(req, res) {
			let email = req.body.email
			let password = req.body.password
			const query = {
                  	text: (`SELECT * FROM users WHERE email='${email}'`)
                    }
				client.query(query, (error, result) => {

					console.log(result.rows.length)
					if (error) throw error
						let ajax = req.body.ajax
						if (result.rows.length == 1){

						let existingUser = result.rows[0].email
						console.log(existingUser)
						ajax = false	
						res.send({existingUser, ajax})		
						}	
					else {
						bcrypt.genSalt(10, function(error, result) {
						console.log("this is the salt" + result)
						bcrypt.hash(password, result, function(err, hash) {
							const query2 = {
							text: (`INSERT INTO users (email, password) VALUES ('${email}', '${hash}') RETURNING *`)
							}
							client.query(query2, (error, result) => {
								if (error) throw error
								req.session.email = email
								res.render("signupInformation")
								})
							})
						})				
					}	
				})
			})	
	
		app.post('/signupInformation', function(req, res) {
			console.log("check for session email: " + req.session.email)
			let email = req.session.email
			let firstname = req.body.firstname
			let lastname = req.body.lastname
			let age = req.body.age
			let dogowner = req.body.dogowner
			let streetAddress =req.body.streetAddress
			let homenumber = req.body.homeNumber
			let city = req.body.city
			let postcode = req.body.postCode
			let phonenumber = req.body.phoneNumber
			const query = {
						text: 	(`UPDATE users SET 
								firstname='${firstname}', lastname='${lastname}', age='${age}', dogowner='${dogowner}',
								address='${streetAddress}', homenumber='${homenumber}', city='${city}', postcode='${postcode}',
								phonenumber='${phonenumber}' WHERE email='${email}'`) 
						}
							client.query(query, (error, result) => {
							if (error) throw error			
			res.render("signup2", {email: req.session.email})
			})
		})


		app.post('/signupFormDog', function(req, res) {
			let dogname = req.body.dogname
			let aboutDog = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			// let pictureDog = // let picture = Store picture somewhere
		})
		app.post('/signupFormDoglover', function(req, res) {
			let aboutMe = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			// let profilePicture = // let picture = Store picture somewhere
		})
	}



//upload.single("picture")
		