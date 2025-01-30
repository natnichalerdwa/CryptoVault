import express from 'express';
import * as cryptopricesController from '../controllers/cryptoprices-controller.js';

const cryptopricesRouter = express.Router();

// getting all assets
cryptopricesRouter.route('/')
    .get(cryptopricesController.get);

// getting asset by ID
cryptopricesRouter.route('/:assetID')
    .get(cryptopricesController.getById);

export default cryptopricesRouter;