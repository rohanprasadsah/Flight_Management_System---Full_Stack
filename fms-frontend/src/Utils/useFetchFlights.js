import { useEffect, useState } from "react";

/**
 * Custom hook to fetch all flights with JWT authentication
 * 
 * WHY: The backend Spring Security configuration requires JWT authentication
 * for all flight operations. The 403 errors were happening because we were
 * making unauthenticated requests.
 * 
 * WHAT: This hook fetches flights from the backend API with proper authentication
 * headers and handles errors gracefully.
 */
const useFetchFlights = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json'
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                // const allFlights = await fetch("http://localhost:8080/FMS/findAll", { // For local development
                const allFlights = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/FMS/findAll`, {
                    method: 'GET',
                    headers: headers
                });
                if (!allFlights.ok) {
                    if (allFlights.status === 403) {
                    }
                    setFlights([]); // Set empty array on error
                    return; // Exit early on error
                }
                const data = await allFlights.json();
                setFlights(data.data || []);
            } catch (error) {
                setFlights([]); // Set empty array on error
            }
        }
        fetchFlight();
    }, []) // Empty dependency array = run once on mount

    return flights;
}

export default useFetchFlights;