require('dotenv').load();

module.exports = (app, client) => {
		app.get("/profile", (req, res) => {
			let email = req.session.email
			const query = {
				text: (`SELECT * FROM users WHERE email='${email}'`)
			}
			client.query(query, (error, result) => {
				let userinfo = []
				let doginfo = []
				userinfo.push(result)
				dogOwner = result.rows[0].dogowner
				userId = result.rows[0].id
				console.log(dogOwner)
				if (dogOwner == true) {
					req.session.dogowner = dogOwner
					client.query(`SELECT * FROM dogs WHERE user_id='${userId}'`, (error, result) => {
					doginfo.push(result)
					userinfo.push("")
					res.render("profile", {email: req.session.email, doginfo: doginfo, dogOwner: req.session.dogowner})
					})
				}	
				else if(dogOwner == false) {
					console.log(dogOwner)
					req.session.dogowner = dogOwner
					res.render("profile", {email: req.session.email, dogOwner: req.session.dogowner, userinfo: userinfo})
					}
				})	
			})
		}