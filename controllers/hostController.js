const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
    res.render('host/addHome', { pageTitle: 'Add to home', currentPage: 'addHome' });
};

exports.postAddHome = (req, res, next) => {
    const { houseName, price, location, rating, photoUrl } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();

    res.render('host/home-added', { pageTitle: 'Home added', currentPage: 'homeAdded' });
};

exports.getHostHomes = (req, res, next) => {
        Home.fetchAll((registeredHomes) => 
        res.render('host/host-home-list', { 
        registeredHomes: registeredHomes, 
        pageTitle: 'Host home list',
        currentPage: 'host-homes'
     })
    );
};