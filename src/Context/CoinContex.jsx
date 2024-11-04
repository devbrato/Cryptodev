import { useEffect, useState, createContext } from "react";

const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"  
    });

    const fetchAllCoin = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-qPo7DeXMaWmnibGLYqVxDJgK' // API key
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(data => setAllCoin(data))
            .catch(err => console.error("Fetch error:", err));
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        currency,
        setCurrency,
        allCoin
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export { CoinContext, CoinContextProvider };
export default CoinContextProvider;
