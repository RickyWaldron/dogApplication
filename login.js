require('dotenv').load();
const bcrypt = require('bcrypt')
module.exports = (app, client) => {
	app.get("/login", (req, res) => {
			res.render("login")
		})
	app.post('/login', function(req, res) {
        let email = req.body.email
        let password = req.body.password
        const hashQuery = {
        	text: (`SELECT password from users WHERE email='${email}'`)
        }
        client.query(hashQuery, (errorHash, resultHash) => {
        	console.log("the resultHash" + resultHash.rows[0].password)
        	bcrypt.compare(password, resultHash.rows[0].password, function(err, resultH) {
			 	if (resultH == true) {
        		const query = {
                	text: (`SELECT * FROM users WHERE email='${email}' AND password ='${resultHash.rows[0].password}'`)
			 	}
            client.query(query, (error, result) => {
            	if (error) throw error
            	if (result.rows.length == 1){
            		req.session.email = email
            		res.redirect('match')
            	}
            	else {
            		res.send("No user exists with this username")
                	}		
           		})
        	}
         	else { 
	        	res.send("password is incorrect")
	   			}
	   		})
	    })         
	})
}