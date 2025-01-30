
import cryptoPricesRouter from "./cryptoprices-router.js"
import authRouter from "./authRouter.js";
import priceAlertRouter from "./pricealertRouter.js";

const initializeRoutes = (app) => {
  app.use('/cryptoprices', cryptoPricesRouter);
  app.use('/auth', authRouter);
  app.use('/pricealerts', priceAlertRouter);
}

export default initializeRoutes;

