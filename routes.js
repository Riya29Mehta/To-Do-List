const express = require('express');
const db = require('./connection');
const app = express.Router();
const checkAuth = require('./check-authorised.middleware')

app.get('/', (req, res) => {
    res.json({ message: 'Hello from Node.js server!' });
});

app.get("/login", (req, res) => {
    res.json({ message: 'hello' })
})

app.post('/loginUser', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM Users WHERE username = ? AND password = ?`;
    //question mark is used to prevent sql injection

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const user = result[0];
                req.session.username = user.username;
                console.log('in login ', req.session.username)
                res.cookie('sessionId', req.sessionID, { httpOnly: true });
                console.log("req.sessionId", req.sessionID)
                console.log("req.session", req.session);
                console.log("req.session", req.session.username);
                res.json({ success: true, message: 'Login successful' });
            } else {
                req.session.destroy();  // Clear the session
                res.clearCookie('sessionId'); // Clear the session cookie
                res.json({ success: false, message: 'Invalid credentials' });
                // res.json({ success: false, message: 'Invalid credentials' });
            }
        }
    });
});

app.post('/signupUser', (req, res) => {
    const { username, password } = req.body;
    const sql1 = `SELECT * FROM Users WHERE username = ? AND password = ?`;
    const sql2 = `INSERT INTO Users (username, password) VALUES (?,?); `

    db.query(sql2, [username, password], (err, result) => {
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else {
            res.json({ success: true, message: result })
        }
    })
})

app.get('/tasks',(req, res) => {
    console.log("req.session.username",req.session.username)
    const username = req.session.username;
    const sql = `SELECT * FROM Task WHERE username = ?`;

    db.query(sql, [username], (err, result) => {
        if (!req.session.username) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            if (result.length > 0) {
                console.log(result.length)
                res.json({ success: true, message: `Welcome, ${req.session.username}!`, taskRes:result });
            } else {
                console.log(result.length)
                res.send({ success: false, message: result });
            }
        }
    });
});
app.post('/addNewTask' ,checkAuth, (req, res) => {
    const { username, task } = req.body;
    console.log("what is username", username)

    const sql = `INSERT INTO Task (username, task_title) VALUES (?,?)`;

    db.query(sql, [username, task], (err, result) => {
        
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.send({ status: true, message: result })
        }
    });
});

app.put('/updateStatus', checkAuth, (req, res) => {
    const { username, task } = req.body;
  
    const sql = 'UPDATE Task SET isCompleted = 1 WHERE username = ? and task_title = ?'
    db.query(sql, [username, task], (err, result) => {

       
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else {
            res.send({ status: true, message: 1 })
        }
    })
})

app.delete('/deleteTask',checkAuth, (req, res) => {
    const { username, task } = req.body;
  
    const sql = 'DELETE FROM Task WHERE username = ? AND task_title = ?';
    db.query(sql, [username, task], (err, result) => {
       
        if (err) {
            console.error('MySQL error:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Task not found or not deleted' });
        }

        res.json({ success: true, message: 'Task deleted successfully' });
    });

})

app.put('/editTask',checkAuth, (req, res) => {
    const { username, oldtask, task } = req.body;
  
    const sql = 'UPDATE Task SET task_title = ? WHERE username = ? and task_title = ?'
    db.query(sql, [task, username, oldtask], (err, result) => {
        
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else {
            res.send({ status: true, message: "edited task" })
        }
    })
})

app.get('/logout', (req, res) => {
    console.log('Logout request received');
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.clearCookie('sessionId'); 
            
            console.log('Session destroyed and cookie cleared');
            res.json({ success: true, message: 'Logout successful' });
        }
    });
});

app.get('/check-session', (req, res) => {
    // Check if the session is active
    if (req.session && req.session.username) {
        console.log("user is active")
        res.json({isActive:true});
    } else {
        console.log("user is inactive")  
        return res.json({isActive:false});
    }
  });

app.get('/username',(req,res)=>{
    return res.json({ message: req.session.username});
})
module.exports = app;