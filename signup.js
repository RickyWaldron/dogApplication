require('dotenv').load();
const bcrypt = require('bcrypt')

module.exports = (app, client) => {
		app.get("/signup", (req, res) => {
			res.render("signup")
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
					if (result.rows.length == 1){
					res.send(result)
					}
				})
			})
		app.post('/signupForm', function(req, res) {
			let email = req.body.email
			let firstname = req.body.firstname
			let lastname = req.body.lastname
			let age = req.body.age
			let dogowner = req.body.dogowner
			let streetAddress =req.body.streetAddress
			let homeNumber = req.body.homeNumber
			let city = req.body.city
			let phoneNumber = req.body.phoneNumber			
			req.session.email = email
			req.session.firstname = firstname
			req.session.lastname = lastname
			req.session.age = age
			req.session.dogowner = dogowner
			req.session.streetAddress = streetAddress
			req.session.homeNumber = homeNumber
			req.session.city = city
			req.session.phoneNumber = phoneNumber
			res.redirect("/signup2")
		})
		app.get("/signup2", (req, res) => {
			res.render("signup2")
		})
		app.post('/singupForm2', function(req, res) {

		})
	}



//upload.single("picture")
		