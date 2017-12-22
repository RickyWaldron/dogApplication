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
				console.log(result.rows)
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
		client.query(`SELECT size, id FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				userId = result.rows[0].id
				preferredSize = result.rows[0].size
			client.query(`SELECT * FROM users WHERE size='${preferredSize}' AND id !='${userId}'`, (error, result) => {
				let allMatches = []
				console.log(result.rows)
				allMatches.push(result)
				res.render("matchPersons", {email: req.session.email, allMatches: allMatches})
				})
			})
		}
	else {
			res.redirect("/")
		}
	})
}	