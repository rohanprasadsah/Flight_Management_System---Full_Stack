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
                
                // Don't fetch flights if user is not authenticated
                if (!token) {
                    console.log('No authentication token found. Please log in to view flights.');
                    setFlights([]);
                    return;
                }
                
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                
                // const allFlights = await fetch("http://localhost:8080/FMS/findAll", { // For local development
                const allFlights = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/FMS/findAll`, {
                    method: 'GET',
                    headers: headers
                });
                
                if (!allFlights.ok) {
                    if (allFlights.status === 401) {
                        console.log('Authentication failed. Please log in again.');
                        // Clear invalid token
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('role');
                    } else if (allFlights.status === 403) {
                        console.log('Access denied. Insufficient permissions.');
                    }
                    setFlights([]); // Set empty array on error
                    return; // Exit early on error
                }
                const data = await allFlights.json();
                setFlights(data.data || []);
            } catch (error) {
                console.error('Error fetching flights:', error);
                setFlights([]); // Set empty array on error
            }
        }
        fetchFlight();
    }, []) // Empty dependency array = run once on mount

    return flights;
}

export default useFetchFlights;