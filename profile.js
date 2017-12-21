require('dotenv').load();

module.exports = (app, client) => {
		app.get("/profile", (req, res) => {
			let email = req.session.email
			const query = {
				text: (`SELECT * FROM users WHERE email='${email}'`)
			}
			client.query(query, (error, result) => {
				let userinfo = []
				userinfo.push(result)
				userId = result.rows[0].id
				client.query(`SELECT * FROM dogs WHERE user_id='${userId}'`, (error, result) => {
					let doginfo = []
					doginfo.push(result)
				res.render("profile", {email: req.session.email, userinfo: userinfo, doginfo: doginfo})
				})	
			})
		})
	}