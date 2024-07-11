const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bp = require('body-parser');
const session = require('express-session');
const redis = require("redis");
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis').default;
const allRoutes = require('./routes')
const redisClient = require('./redis')

const app = express();
const port = 3000;


const sessionStore = new RedisStore({
    client: redisClient,
});

// app.use(bp.urlencoded({ extended: true }));
app.use(bp.json())
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(cookieParser());
app.use(
    session({
        key:'sessionId',
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            httpOnly: false,
            maxAge: 6000000
            // secure: false, // Set to true in production for HTTPS
        },
    })
);

app.use('/', allRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
