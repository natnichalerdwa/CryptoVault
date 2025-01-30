import { useDispatch } from "react-redux";
import App from "../App";
import { PriceAlert } from "../models/PriceAlerts";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { deletePriceAlert } from "../store/pricealert-store";

type PropsType = {
    priceAlert: PriceAlert;
}

export default function PriceAlertComponent(props: PropsType) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {t} = useTranslation('common');
    const priceAlert = props.priceAlert;
    return (
        <div>
            <h3>{priceAlert.id} 
            {priceAlert.assetID}
            {priceAlert.assetName}
            {priceAlert.assetSymbol}
            {priceAlert.price}
            {priceAlert.targetPrice}
            {priceAlert.alertType}
            </h3>
            <button onClick={() => navigate(`/pricealerts/${priceAlert.id}`)}>{t('appbar.view.label')}</button>
            <button onClick={() => dispatch(deletePriceAlert(priceAlert.id))}>{t('appbar.delete.label')}</button>
        </div>
    )
}
  