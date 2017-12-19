require('dotenv').load();
const bcrypt = require('bcrypt')

module.exports = (app, client) => {
		app.get("/signup", (req, res) => {
			res.render("signup")
		})
		app.get("/signup2", (req, res) => {
			res.render("signup2")
		})
		app.post('/checkEmail', function(req, res) {
			let email = req.body.email
			console.log(email)
				const query = {
                  	text: (`SELECT * FROM users WHERE email='${email}'`)
                    }
				client.query(query, (error, result) => {
					console.log(result.rows)
					if (error) throw error
					let array = ["key", "value"]
						
					if (result.rows.length == 0){
					res.send(array)
					}
				})
			})
		app.post('/signupForm', function(req, res) {
			console.log("reached")
			let email = req.body.email
			let firstname = req.body.firstname
			let lastname = req.body.lastname
			let age = req.body.age
			let dogowner = req.body.dogowner
			let streetAddress =req.body.streetAddress
			let homeNumber = req.body.homeNumber
			let city = req.body.city
			let postCode = req.body.postCode
			let phoneNumber = req.body.phoneNumber			
			req.session.email = email
			req.session.firstname = firstname
			req.session.lastname = lastname
			req.session.age = age
			req.session.dogowner = dogowner
			req.session.streetAddress = streetAddress
			req.session.homeNumber = homeNumber
			req.session.city = city
			req.session.postCode = postCode
			req.session.phoneNumber = phoneNumber
			console.log(req.session.email)
			res.render("signup2", {email: req.session.email, firstname: req.session.firstname,
			 			lastname: req.session.lastname, age: req.session.age, dogowner: req.session.dogowner,
			  			streetAddress: req.session.streetAddress, homeNumber: req.session.homeNumber,
			  			city: req.session.city, postCode: req.session.postCode, phoneNumber: req.session.phoneNumber})
		})
		
		app.post('/signupFormDoglover', function(req, res) {
			let email = req.body.email
			let firstname = req.body.firstname
			let lastname = req.body.lastname
			let age = req.body.age
			let dogowner = req.body.dogowner
			let streetAddress =req.body.streetAddress
			let homeNumber = req.body.homeNumber
			let city = req.body.city
			let postCode = req.body.postCode
			let phoneNumber = req.body.phoneNumber
			let username = req.body.username
			let aboutMe = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			req.session.username = username
			req.session.aboutMe = aboutMe
			req.session.smallDog = smallDog
			req.session.mediumDog = mediumDog
			req.session.largeDog = largeDog
			res.render("/signupCheck", {email: req.session.email, firstname: req.session.firstname,
			 			lastname: req.session.lastname, age: req.session.age, dogowner: req.session.dogowner,
			  			streetAddress: req.session.streetAddress, homeNumber: req.session.homeNumber,
			  			city: req.session.city, postCode: req.session.postCode, phoneNumber: req.session.phoneNumber,
			  			username: req.session.username, aboutMe: req.session.aboutMe, smallDog: req.session.smallDog, 
			  			mediumDog: req.session.mediumDog, largeDog: req.session.largeDog})
		})

		app.post('/signupFormDog', function(req, res) {
			let email = req.body.email
			let firstname = req.body.firstname
			let lastname = req.body.lastname
			let age = req.body.age
			let dogowner = req.body.dogowner
			let streetAddress =req.body.streetAddress
			let homeNumber = req.body.homeNumber
			let city = req.body.city
			let postCode = req.body.postCode
			let phoneNumber = req.body.phoneNumber
			let dogname = req.body.dogname
			let aboutDog = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			req.session.dogname = dogname
			req.session.aboutDog = aboutDog
			req.session.smallDog = smallDog
			req.session.mediumDog = mediumDog
			req.session.largeDog = largeDog
			res.render("signupCheck", {email: req.session.email, firstname: req.session.firstname,
			 			lastname: req.session.lastname, age: req.session.age, dogowner: req.session.dogowner,
			  			streetAddress: req.session.streetAddress, homeNumber: req.session.homeNumber,
			  			city: req.session.city, postCode: req.session.postCode, phoneNumber: req.session.phoneNumber,
			  			dogname: req.session.dogname, aboutDog: req.session.aboutDog, smallDog: req.session.smallDog, 
			  			mediumDog: req.session.mediumDog, largeDog: req.session.largeDog})
		})

		app.post('/signupCheck', function (req, res) {
			let email = req.body.email
			let firstname = req.body.firstname
			let lastname = req.body.lastname
			let age = req.body.age
			let dogowner = req.body.dogowner
			let streetAddress =req.body.streetAddress
			let homeNumber = req.body.homeNumber
			let city = req.body.city
			let postCode = req.body.postCode
			let phoneNumber = req.body.phoneNumber
			let username = req.body.username
			let aboutMe = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			// let picture = Store picture somewhere

		})
	}



//upload.single("picture")
		