const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateListing,isLoggedIn, isOwner} = require("../middleware.js");
const listingContoller = require("../controllers/listings.js");
const multer = require('multer');
const {storage} =require("../cloudConfig.js");
const upload = multer({storage}) ;

//index .create
router
    .route("/")
    .get(wrapAsync(listingContoller.index)) 
    .post(
       isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingContoller.createList)
        );
// .post(upload.single('listing[image]'),(req,res )=>{
//     res.send(req.file);
// })

//new route
router.get("/new",isLoggedIn,listingContoller.new);


//show route update and delete
router
    .route("/:id")
    .get(wrapAsync(listingContoller.showList))
    .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingContoller.updateList))
   .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingContoller.deleteList));
 
    // Edit Route
router.get("/:id/edit",
isLoggedIn,
isOwner,
wrapAsync(listingContoller.editList));

module.exports = router;





















// //index route
// router.get("/",wrapAsync(listingContoller.index));

// //new route
// router.get("/new",isLoggedIn,listingContoller.new);

//show route
// router.get("/:id",wrapAsync(listingContoller.showList));

// //create route
// router.post("/",
// isLoggedIn,
// validateListing,
// wrapAsync(listingContoller.createList)
// );

// // Edit Route
// router.get("/:id/edit",
// isLoggedIn,
// isOwner,
// wrapAsync(listingContoller.editList));    

//update route
// router.put("/:id",
// isLoggedIn,
// isOwner,
// validateListing,
// wrapAsync(listingContoller.updateList));

//delete route
// router.delete("/:id",
// isLoggedIn,
// isOwner,
// wrapAsync(listingContoller.deleteList));


// module.exports = router;