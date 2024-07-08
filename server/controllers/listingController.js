import Listing from "../models/listingmodel.js"

const createListing = async (req,res) =>{
    try {
        const newList = await Listing.create(req.body);
        return res.status(200).json(newList)
    } catch (error) {
        return res.status(500).json({"message" : "Something went wrong during creating the list"})
    }
}

const deleteListing = async(req,res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return res.status(404).json({"message" : "Listing is not present"})
        }
        // console.log(req.user.id);
        // console.log(listing.useRef);
        if(req.user.id !== listing.useRef){
            return res.status(400).json({"message" : "Not Authrorized"})
        }

        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json({"message" : "Listing has been deleted"})
    } catch (error) {
        return res.status(500).json({"Message" : "Something went wrong during deletion of listing"})
    }
}

const updateListing = async (req,res) =>{
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id);
        if(!listing){
            return res.status(404).json({"message" : "Listing is not found for update"})
        }

        if(req.user.id !== listing.useRef){
            return res.status(401).json({"message" : "Not Authorized for Updating the listing"})
        }

        await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json({"message" : "Updated Successfully"})
    } catch (error) {
        console.log(error);
    }
}

export {createListing, deleteListing, updateListing}