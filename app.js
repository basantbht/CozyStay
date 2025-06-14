// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require('./utils/pathUtil');
const errorController = require('./controllers/errors')

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorController.get404);

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});