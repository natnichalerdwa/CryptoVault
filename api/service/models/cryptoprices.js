import mongoose from "mongoose";

const CryptoPriceSchema = new mongoose.Schema({
    assetID: {
        required: true,
        type: String
    },
    assetName: {
        required: true,
        type: String
    },
    assetSymbol: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    currency: {
        required: true,
        type: String,
        default: "USD"
    },
    lastUpdated: {
        required: true,
        type: Date
    }
});



const CryptoPriceModel = mongoose.model("cryptoprice", CryptoPriceSchema);

export default CryptoPriceModel;
