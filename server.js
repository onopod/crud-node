const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors")({origin: true});
const app = express();
app.use(bodyParser.json());
app.use(cors);

const client = mysql.createConnection({
	host: "localhost",
	user: "test_user",
	password: "password", 
	port: 3306,
	database: "test"
});

client.connect(err => {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}
	console.log("connected as id " + client.threadId);
});

// read 
app.get("/user", (req, res) => {
	client.query("select * from user;", (err, rows, fields) => {
		if(err) throw err;
		res.send(rows);
	});
});

// test
app.get("/test", (req, res) => {
	res.send("this is test");
});

app.listen(3001, ()=> console.log("Listening on port 3001!"));
