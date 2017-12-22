require('dotenv').load();
module.exports = (app, client) => {
	app.get("/match", (req, res) => {
		if (req.session.email){
		let email = req.session.email
		client.query(`SELECT size, id FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				preferredSize = result.rows[0].size
				userId = result.rows[0].id
			client.query(`SELECT * FROM dogs WHERE size='${preferredSize}' AND user_id !='${userId}'`, (error, result) => {
				let allMatches = []
				allMatches.push(result)
				res.render("match", {email: req.session.email, allMatches: allMatches})
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
		client.query(`SELECT size, id, dogowner FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				dogOwner = result.rows[0].dogowner
				preferredSize = result.rows[0].size
				userId = result.rows[0].id
				if (dogOwner == true) {
					req.session.dogowner = dogOwner
					client.query(`SELECT * FROM users WHERE size='${preferredSize}' AND id !='${userId}'`, (error, result) => {
					let allMatches = []
					allMatches.push(result)
					res.render("matchPersons", {email: req.session.email, allMatches: allMatches, dogOwner: req.session.dogowner})
					})
				}
				else if(dogOwner == false) {
						req.session.dogowner = dogOwner
						res.render("matchPersons", {email: req.session.email, dogOwner: req.session.dogowner})
					}
			})		
		}
	else {
			res.redirect("/")
		}
	})
}	