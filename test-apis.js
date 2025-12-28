// Test script to verify API endpoints are working
const endpoints = [
  "http://localhost:3000/api/admin/about-content",
  "http://localhost:3000/api/about-cards",
  "http://localhost:3000/api/regions",
  "http://localhost:3000/api/industries",
  "http://localhost:3000/api/services",
];

async function testEndpoint(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`✅ ${url}: ${response.status} - ${response.statusText}`);
    return true;
  } catch (error) {
    console.log(`❌ ${url}: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log("Testing API endpoints...\n");

  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
    // Small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\nTest completed.");
}

runTests();
