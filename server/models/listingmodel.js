import mongoose from "mongoose"

const listingSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    offer: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrls:{
        type: Array,
        required: true
    },
    useRef: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Listing = mongoose.model("Listing", listingSchema)
export default Listing