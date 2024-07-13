const mysql =  require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "root",
    database: 'To-do-list'
})

db.connect(function (error) {
    if (error) {
        console.log("error connecting to db", error)
    } else {
        console.log("successful db conection")
    }
})

module.exports = db;