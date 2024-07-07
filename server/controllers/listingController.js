import Listing from "../models/listingmodel.js"

const createListing = async (req,res) =>{
    try {
        const newList = await Listing.create(req.body);
        return res.status(200).json({"message" : "Listing Successfully"})
    } catch (error) {
        return res.status(500).json({"message" : "Something went wrong during creating the list"})
    }
}

export {createListing}