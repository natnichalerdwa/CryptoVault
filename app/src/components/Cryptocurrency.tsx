import { Cryptocurrency } from "../models/Cryptocurrency";

type PropsType = {
    cryptocurrency: Cryptocurrency;
}

export default function CryptoComponent(props: PropsType) {
    return (
    <article>
        <h2>{`${props.cryptocurrency.assetID}, ${props.cryptocurrency.assetName}`}</h2>
        <div>
            Symbol: {props.cryptocurrency.assetSymbol}
            Price: {props.cryptocurrency.price}
        </div>
    </article>
    );
}