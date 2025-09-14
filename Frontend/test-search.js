/**
 * TEST FLIGHT SEARCH FUNCTIONALITY
 * 
 * This script tests the flight search endpoint directly in the browser console
 * Run this after you log in to test if the search endpoint works
 */

console.log('🔍 TESTING FLIGHT SEARCH FUNCTIONALITY...');

// Function to test flight search with proper authentication
const testFlightSearch = async (source, destination) => {
    console.log(`\n🛫 Testing search: ${source} → ${destination}`);
    
    // Get current authentication state
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    console.log('Auth State:', { 
        hasToken: !!token, 
        hasUser: !!user, 
        role: role,
        tokenLength: token ? token.length : 0
    });
    
    if (!token) {
        console.error('❌ No authentication token found. Please log in first.');
        return;
    }
    
    try {
        // Make the same request that the frontend makes
        const url = `http://localhost:8080/FMS/findBySourceAndDestination?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`;
        console.log('🌐 Request URL:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📡 Response Status:', response.status);
        console.log('📡 Response Status Text:', response.statusText);
        console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Search successful!');
            console.log('📋 Response data:', data);
            console.log('🛩️ Found flights:', data.data ? data.data.length : 0);
            
            if (data.data && data.data.length > 0) {
                console.log('Flight details:');
                data.data.forEach((flight, index) => {
                    console.log(`  ${index + 1}. ${flight.name}: ${flight.source} → ${flight.destination} at ${flight.time} (₹${flight.price})`);
                });
            } else {
                console.log('🔍 No flights found for this route');
            }
        } else {
            console.error('❌ Search failed:', response.status, response.statusText);
            
            // Try to get error details
            try {
                const errorData = await response.text();
                console.log('Error response:', errorData);
            } catch (e) {
                console.log('Could not read error response');
            }
        }
        
    } catch (error) {
        console.error('❌ Network or other error:', error);
    }
};

// Function to test fetching all flights (for comparison)
const testFetchAllFlights = async () => {
    console.log('\n📋 Testing fetch all flights (for comparison)...');
    
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('❌ No authentication token found. Please log in first.');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8080/FMS/findAll', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📡 FindAll Response Status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ FindAll successful!');
            console.log('🛩️ Total flights in database:', data.data ? data.data.length : 0);
            
            if (data.data && data.data.length > 0) {
                console.log('Available routes:');
                data.data.forEach((flight, index) => {
                    console.log(`  ${index + 1}. ${flight.source} → ${flight.destination}`);
                });
            }
        } else {
            console.error('❌ FindAll failed:', response.status, response.statusText);
        }
        
    } catch (error) {
        console.error('❌ FindAll error:', error);
    }
};

console.log('\n🎯 INSTRUCTIONS:');
console.log('1. First log in to your account');
console.log('2. Run: await testFetchAllFlights()');
console.log('3. Run: await testFlightSearch("Osaka", "Kyoto")');
console.log('4. Try other routes you see in the findAll results');
console.log('\nExample usage:');
console.log('await testFlightSearch("Osaka", "Kyoto")');
console.log('await testFlightSearch("Tokyo", "Osaka")');

// Export functions for global access
window.testFlightSearch = testFlightSearch;
window.testFetchAllFlights = testFetchAllFlights;

console.log('\n✅ Test functions loaded! You can now use:');
console.log('- testFlightSearch("source", "destination")');  
console.log('- testFetchAllFlights()');
