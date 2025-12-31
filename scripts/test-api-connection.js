#!/usr/bin/env node

const axios = require('axios');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function testApiConnection() {
  console.log('🔍 Testing API Connection...');
  console.log(`📡 API Base URL: ${API_BASE_URL}`);
  
  try {
    // Test 1: Basic connectivity
    console.log('\n1. Testing basic connectivity...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 });
    console.log(`   ✅ Health check: ${healthResponse.status} ${healthResponse.statusText}`);
    
    // Test 2: Properties endpoint
    console.log('\n2. Testing properties endpoint...');
    const propertiesResponse = await axios.get(`${API_BASE_URL}/properties`, { timeout: 5000 });
    console.log(`   ✅ Properties endpoint: ${propertiesResponse.status}`);
    console.log(`   📊 Properties count: ${propertiesResponse.data?.length || 0}`);
    
    // Test 3: Check response structure
    if (propertiesResponse.data && Array.isArray(propertiesResponse.data)) {
      console.log(`   📝 Sample property:`, propertiesResponse.data[0] ? 'Exists' : 'No properties yet');
    }
    
    console.log('\n🎉 All API tests passed!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ API Connection Failed:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   Backend server is not running.');
      console.error('   Please start your backend server on port 5000.');
    } else if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.message || error.message}`);
    } else if (error.request) {
      console.error('   No response received from server.');
    } else {
      console.error(`   Error: ${error.message}`);
    }
    
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Ensure backend server is running');
    console.log('   2. Check .env.local for NEXT_PUBLIC_API_BASE_URL');
    console.log('   3. Verify no firewall/port blocking');
    
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  testApiConnection();
}

module.exports = { testApiConnection };
