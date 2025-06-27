// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://bhatt:bhatt@cozystay.qfhxhev.mongodb.net/airbnb?retryWrites=true&w=majority&appName=cozystay";

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require('./utils/pathUtil');
const errorController = require('./controllers/errors');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
});

app.use(express.urlencoded());

app.use(session({
    secret: "basant bhatt",
    resave: false,
    saveUninitialized: true,
    store: store
}))

app.use((req,res,next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
})

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req,res,next) => {
    if(req.isLoggedIn) {
        next();
    }else{
        res.redirect("/login");
    }
});
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorController.get404);

PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
    console.log("Connected to Mongo")
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch(err => {
    console.log("Error while connecting to Mongo:",err);
})