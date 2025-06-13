const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
    Home.fetchAll((registeredHomes) => 
        res.render('store/index', { 
        registeredHomes: registeredHomes, 
        pageTitle: 'airbnb home',
        currentPage: 'index'
     })
    );
};

exports.getHomes = (req, res, next) => {
    Home.fetchAll((registeredHomes) => 
        res.render('store/home-list', { 
        registeredHomes: registeredHomes, 
        pageTitle: 'Homes List',
        currentPage: 'Home'
     })
    );
};

exports.getBookings = (req, res, next) => {
        res.render('store/bookings', { 
        pageTitle: 'bookings',
        currentPage: 'bookings'
     })
};

exports.getFavouriteList = (req, res, next) => {
        Home.fetchAll((registeredHomes) => 
        res.render('store/favourite-list', { 
        registeredHomes: registeredHomes, 
        pageTitle: 'My favourites',
        currentPage: 'favourites'
     })
    );
};
