require('dotenv').load();
const bcrypt = require('bcrypt')
module.exports = (app, client) => {
	app.get("/login", (req, res) => {
			res.render("login")
		})
	app.post('/login', function(req, res) {
        let email = req.body.email
        let password = req.body.password
        let ajax = req.body.ajax
        let passval = req.body.passval
        const hashQuery = {
        	text: (`SELECT password from users WHERE email='${email}'`)
        }
        client.query(hashQuery, (errorHash, resultHash) => {
            if (resultHash.rows.length == 1){
            	bcrypt.compare(password, resultHash.rows[0].password, function(err, resultH) {
    			 	if (resultH == true) {
            		const query = {
                    	text: (`SELECT * FROM users WHERE email='${email}' AND password ='${resultHash.rows[0].password}'`)
			 	   }    
            client.query(query, (error, result) => {
            	if (error) throw error
            	if (result.rows.length == 1){
            		req.session.email = email
            		res.send({ajax, email, passval})
                	   }              	
               		})
            	}
                if (resultH == false) {
                        passval = false
                        res.send({passval})
         		        }
                    })
                }
                if (resultHash.rows.length == 0 ) {
                    ajax = false
                    res.send({ajax})    
        	    }
            })         
    	}) 
    }