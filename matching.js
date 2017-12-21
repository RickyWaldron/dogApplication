require('dotenv').load();
module.exports = (app, client) => {
	app.get("/match", (req, res) => {
		let email = req.session.email
		client.query(`SELECT size FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				preferredSize = result.rows[0].size
			client.query(`SELECT * FROM dogs WHERE size='${preferredSize}'`, (error, result) => {
				let allMatches = []
				console.log(result.rows)
				allMatches.push(result)
				res.render("match", {allMatches: allMatches})
			})
		})
	})
	app.get("/matchPersons", (req, res) => {
		let email = req.session.email
		client.query(`SELECT size FROM users WHERE email='${email}'`, (error, result) => {
			if (error) throw error
				preferredSize = result.rows[0].size
			client.query(`SELECT * FROM users WHERE size='${preferredSize}'`, (error, result) => {
				let allMatches = []
				console.log(result.rows)
				allMatches.push(result)
				res.render("matchPersons", {allMatches: allMatches})
				})
			})
		})
	}	