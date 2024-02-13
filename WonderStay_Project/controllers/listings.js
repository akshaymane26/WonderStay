const Listing = require("../models/listing");
 

//index route
module.exports.index=(async(req,res)=>{
    let allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

//new route
module.exports.new=(req,res)=>{
    res.render("listings/new.ejs");
};

//showListing
module.exports.showList=(async(req,res)=>{
    let {id}=req.params;
const listing = await Listing.findById(id).populate({path:"reviews",
populate:{path:"author",},}).populate("owner");
   if(!listing){
    req.flash("error","Listing You Requested for does not exist!");
    res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
});


//createListing
module.exports.createList=(async(req,res,next)=>{
   
    // let listing = req.body.listing;
    // console.log(listing);

    let url = req.file.path;
    let filename= req.file.filename;

      const newListing = new  Listing(req.body.listing);
       newListing.owner = req.user._id;
       newListing.image = {url,filename};
        await newListing.save();
        req.flash("success","new Listing Created");
         res.redirect("/listings");
 });

 //edit listing
 module.exports.editList=(async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing You Requested for does not exist!");
        res.redirect("/listings");
        }
let originalImageUrl = listing.image.url;
originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
res.render("listings/edit.ejs",{listing,originalImageUrl});

        req.flash("success","Listing Edited successfully");
    res.render("listings/edit.ejs",{listing});
});

//updateListing
module.exports.updateList = async(req,res)=>{
    let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename= req.file.filename;
        listing.image = { url , filename };
        await listing.save();
    }

    req.flash("success","Listing Updated Successfully ");
    res.redirect(`/listings/${id}`);
};

//deletelisting
module.exports.deleteList =(async(req,res)=>{
    let {id} =req.params;
   let deleted = await Listing.findByIdAndDelete(id);
console.log(deleted);
req.flash("success","Deleted Successfully ");
res.redirect("/listings");
});
