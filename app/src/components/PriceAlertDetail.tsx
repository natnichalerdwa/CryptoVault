import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { findPriceAlerts } from "../store/pricealert-store"

export default function () {
    const {id} = useParams()
    const priceAlert = useSelector(findPriceAlerts(id));
    return (<h3>{priceAlert?.id} 
    {priceAlert?.assetID}
    {priceAlert?.assetName}
    {priceAlert?.assetSymbol}
    {priceAlert?.price}
    {priceAlert?.targetPrice}
    {priceAlert?.alertType}
    </h3>)
}