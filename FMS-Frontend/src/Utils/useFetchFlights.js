import { useEffect, useState } from "react";

const useFetchFlights = () => {
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        const fetchFlight = async () => {
            const allFlights = await fetch("http://localhost:8080/FMS/findAll");
            const data = await allFlights.json();
            setFlights(data.data);
        }
        fetchFlight();
    }, [])
    return flights;
}

export default useFetchFlights;