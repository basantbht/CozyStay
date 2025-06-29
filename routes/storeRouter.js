// External Module
const express = require("express");
const storeRouter = express.Router();

const storeController = require('../controllers/storeController');

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

storeRouter.get("/homes/:homeId", storeController.getHomesDetails);
storeRouter.post("/favourites", storeController.postAddToFavourite);

storeRouter.get("/rules/:homeId", storeController.getHouseRules);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourites);

module.exports = storeRouter;