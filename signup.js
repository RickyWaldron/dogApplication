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
		app.get("/profile", (req, res) => {
			let email = req.session.email
			const query = {
				text: (`SELECT * FROM users WHERE email='${email}'`)
			}
			client.query(query, (error, result) => {
				let userinfo = []
				userinfo.push(result.rows)
				console.log(result.rows[0].id)
				userId = result.rows[0].id
				client.query(`SELECT * FROM dogs WHERE user_id='${userId}'`, (error, result) => {
					let dogInfo = []
					dogInfo.push(result.rows)
				res.render("profile", {email: req.session.email, userinfo: userinfo, dogInfo: dogInfo})
				})	
			})
		})
		app.post('/signup', function(req, res) {
			let email = req.body.email
			let password = req.body.password
			const query = {
                  	text: (`SELECT * FROM users WHERE email='${email}'`)
                    }
				client.query(query, (error, result) => {
					if (error) throw error
						let ajax = req.body.ajax
						if (result.rows.length == 1){

						let existingUser = result.rows[0].email
						ajax = false	
						res.send({existingUser, ajax})		
						}	
					else {
						bcrypt.genSalt(10, function(error, result) {
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
			debugger
			let email = req.session.email
			let dogname = req.body.dogname
			let aboutDog = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			let sizeDog = ""
			if(smallDog === "small"){
				sizeDog = smallDog
			}
			if(mediumDog === "medium"){
				sizeDog = mediumDog
			}
			if(largeDog === "large"){
				sizeDog = largeDog
			}

			client.query(`SELECT id FROM users WHERE email='${email}'`, (error, result) => {
				if (error) throw error
				userId = result.rows[0].id
				const query2 = {
				text: (`INSERT INTO dogs (dogname, size, user_id, aboutdog) VALUES('${dogname}', '${sizeDog}', '${userId}', '${aboutDog}') RETURNING *`)
				}
				client.query(query2, (error, result) => {
					console.log(result)
					debugger
					res.render('profile')
				})
			})
			})
			
			// let pictureDog = // let picture = Store picture somewhere
		
		app.post('/signupFormDoglover', function(req, res) {
			let email = req.session.email
			let aboutMe = req.body.about
			let smallDog = req.body.smallDogButton
			let mediumDog = req.body.mediumDogButton
			let largeDog = req.body.largeDogButton
			let sizeDog = ""
			if(smallDog === "small"){
				sizeDog = smallDog
			}
			if(mediumDog === "medium"){
				sizeDog = mediumDog
			}
			if(largeDog === "large"){
				sizeDog = largeDog
			}
			const query = {
					text: 	(`UPDATE users SET 
							size='${sizeDog}', about='${aboutMe}' WHERE email='${email}'`)
						}
			client.query(query, (error, result) => {
				if (error) throw error
			res.render('profile')
			// let profilePicture = // let picture = Store picture somewhere
				})
			})
		}



//upload.single("picture")
		