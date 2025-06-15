const Favourite = require("../models/favourite");
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
    Favourite.getFavourites((favourites) => {
        Home.fetchAll((registeredHomes) => {
            const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
            res.render('store/favourite-list', {
                favouriteHomes: favouriteHomes,
                pageTitle: 'My favourites',
                currentPage: 'favourites'
            })
        }

        );
    })

};

exports.postAddToFavourite = (req, res, next) => {
    console.log("came to add to favourite: ", req.body);
    Favourite.addToFavourite(req.body.id, error => {
        if (error) {
            console.log("Error while marking favourite: ", error);
        }
        res.redirect("/favourites");
    })
}

exports.getHomesDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home => {
        if (!home) {
            console.log("Home not found");
            res.redirect("/homes");
        } else {
            res.render('store/home-detail', {
                home: home,
                pageTitle: 'Home Detail',
                currentPage: 'Home'
            })
        }
    });
};

exports.postRemoveFromFavourites = (req,res,next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId, error => {
        if(error){
            console.log("Error removing favourites", error);
        }
        res.redirect('/favourites');
    })
}