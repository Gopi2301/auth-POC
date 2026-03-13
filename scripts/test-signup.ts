async function testAuth() {
  const baseUrl = 'http://localhost:3000/api/auth';
  const origin = 'http://localhost:3000';
  
  // Test /api/auth/ok
  console.log('--- Testing /api/auth/ok ---');
  try {
    const okRes = await fetch(`${baseUrl}/ok`);
    const okJson = await okRes.json();
    console.log('Status:', okRes.status);
    console.log('Response:', JSON.stringify(okJson, null, 2));
  } catch (error) {
    console.error('Error testing /ok:', error);
  }

  // Test sign-up
  console.log('\n--- Testing sign-up ---');
  const signupUrl = `${baseUrl}/sign-up/email`;
  const data = {
    email: `test-${Date.now()}@example.com`,
    password: 'Password123!',
    name: 'Test User'
  };

  console.log('Sending sign-up request to:', signupUrl);
  try {
    const response = await fetch(signupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('Sign-up successful!');
    } else {
      console.log('Sign-up failed.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAuth();
