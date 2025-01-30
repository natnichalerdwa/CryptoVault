import mongoose from 'mongoose';

const PriceAlertSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: () => new mongoose.Types.ObjectId(), // Autogenerate ObjectId if not provided
    },
    crypto: { 
        type: String, 
        required: true 
    },
    targetPrice: { 
        type: Number, 
        required: true 
    },
    alertType: { 
        type: String, 
        enum: ['above', 'below'], 
        required: true 
    },
    active: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    triggeredAt: { 
        type: Date, 
        default: null 
    },
});

const PriceAlert = mongoose.model('PriceAlert', PriceAlertSchema);

export default PriceAlert;
