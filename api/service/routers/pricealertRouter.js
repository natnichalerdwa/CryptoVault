import express from 'express';
import { createPriceAlert, getPriceAlerts, deletePriceAlert } from '../controllers/pricealertController.js';

const router = express.Router();

router.post('/', createPriceAlert); 
router.get('/', getPriceAlerts);
router.delete('/:alertId', deletePriceAlert);

export default router;
