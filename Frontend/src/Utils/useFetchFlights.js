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
                // Get JWT token from localStorage
                const token = localStorage.getItem('token');
                
                // Prepare headers for the API request
                const headers = {
                    'Content-Type': 'application/json'
                };
                
                // Add Authorization header if user is authenticated
                // Spring Security expects format: "Bearer <jwt-token>"
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }
                
                // Make authenticated request to fetch all flights
                const allFlights = await fetch("http://localhost:8080/FMS/findAll", {
                    method: 'GET',
                    headers: headers
                });
                
                // Check if request was successful (not 403 Forbidden)
                // This prevents JSON parsing errors on error responses
                if (!allFlights.ok) {
                    console.error('Failed to fetch flights:', allFlights.status, allFlights.statusText);
                    if (allFlights.status === 403) {
                        console.error('Authentication failed - user may need to log in');
                    }
                    setFlights([]); // Set empty array on error
                    return; // Exit early on error
                }
                
                // Parse JSON response safely
                const data = await allFlights.json();
                
                // Update flights state with fetched data
                // Use fallback empty array if data.data is undefined
                setFlights(data.data || []);
            } catch (error) {
                // Handle network errors or JSON parsing failures
                console.error('Error fetching flights:', error);
                setFlights([]); // Set empty array on error
            }
        }
        
        // Fetch flights when component mounts
        fetchFlight();
    }, []) // Empty dependency array = run once on mount
    
    return flights;
}

export default useFetchFlights;