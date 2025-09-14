// Debug Authentication Script
// Run this in the browser console (F12) to check authentication state

console.log('🔍 Flight Management System - Auth Debug');
console.log('==========================================');

// Check localStorage
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const role = localStorage.getItem('role');

console.log('📁 LocalStorage Data:');
console.log('- Token exists:', !!token);
if (token) {
    console.log('- Token length:', token.length);
    console.log('- Token starts with:', token.substring(0, 10) + '...');
    console.log('- Token ends with:', '...' + token.substring(token.length - 10));
}
console.log('- User data exists:', !!user);
if (user) {
    try {
        const parsedUser = JSON.parse(user);
        console.log('- User email:', parsedUser.email);
        console.log('- User name:', parsedUser.name);
        console.log('- User role in data:', parsedUser.role);
    } catch (e) {
        console.error('- Error parsing user data:', e);
    }
}
console.log('- Role:', role);

console.log('\n🔐 Permissions:');
console.log('- Can update flights:', role === 'ADMIN' || role === 'STAFF');
console.log('- Is Admin:', role === 'ADMIN');
console.log('- Is Staff:', role === 'STAFF');
console.log('- Is Customer:', role === 'CUSTOMER');

// Test token format
if (token) {
    console.log('\n🎯 Token Analysis:');
    const tokenParts = token.split('.');
    console.log('- Token parts count:', tokenParts.length, '(should be 3 for JWT)');
    if (tokenParts.length === 3) {
        console.log('- Header length:', tokenParts[0].length);
        console.log('- Payload length:', tokenParts[1].length);
        console.log('- Signature length:', tokenParts[2].length);
        console.log('✅ Token format looks correct');
    } else {
        console.log('❌ Token format is invalid (JWT should have 3 parts separated by dots)');
    }
}

// Test API endpoint
console.log('\n🌐 API Test:');
if (token) {
    console.log('Testing flight API with current token...');
    fetch('http://localhost:8080/FMS/findAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('- API Response Status:', response.status);
        if (response.ok) {
            console.log('✅ API call successful - token is valid');
            return response.json();
        } else {
            console.log('❌ API call failed - token might be expired or invalid');
            return response.text();
        }
    })
    .then(data => {
        console.log('- API Response:', data);
    })
    .catch(error => {
        console.error('- API Error:', error);
    });
} else {
    console.log('❌ No token found - cannot test API');
}

console.log('\n📝 Instructions:');
console.log('1. If no token exists, please log in again');
console.log('2. If token exists but API fails, the token might be expired');
console.log('3. If role is CUSTOMER, you cannot update flights');
console.log('4. For flight updates, you need ADMIN or STAFF role');
