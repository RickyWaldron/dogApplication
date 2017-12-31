// require('dotenv').load();


// module.exports = (app, client) => {
//   app.get("/match", (req, res) => {
//     if (req.session.email){
//     let email = req.session.email
//     client.query(`SELECT size, id FROM users WHERE email='${email}'`, (error, result) => {
//       if (error) throw error
//         preferredSize = result.rows[0].size
//         userId = result.rows[0].id
//       client.query(`SELECT * FROM dogs WHERE size='${preferredSize}' AND user_id !='${userId}'`, (error, result) => {
//         let allMatches = []
//         allMatches.push(result)
//         res.render("match", {email: req.session.email, allMatches: allMatches})
//         })
//       })
//     }
//     else {
//       res.redirect("/")
//     }
//   })


// function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//   var R = 6371; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1); 
//   var a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ; 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   var d = R * c; // Distance in km
//   return d;
// }

// function deg2rad(deg) {
//   return deg * (Math.PI/180)
// }
let test = []
for (var i = 0; i<4;i++){
  if (true) {
    test.push("alpha")
  }
}
console.log(test)