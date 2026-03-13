async function testBearerToken() {
  const baseUrl = 'http://localhost:3000/api/auth';
  const origin = 'http://localhost:3000';
  const email = process.argv[2] || 'test-1773424044537@example.com';
  const password = process.argv[3] || 'Password123!';

  console.log(`\n--- 1. Testing sign-in to get Bearer Token ---`);
  try {
    const loginRes = await fetch(`${baseUrl}/sign-in/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin
      },
      body: JSON.stringify({ email, password })
    });

    const loginData = await loginRes.json();
    if (!loginRes.ok) {
      console.error('Sign-in failed:', loginData);
      return;
    }

    const token = loginData.token;
    console.log('Login Successful!');
    console.log('Bearer Token obtained:', token);

    console.log(`\n--- 2. Testing Authenticated Request with Bearer Token ---`);
    console.log('Calling /api/auth/get-session using Authorization header...');
    
    // Crucially, we do NOT pass any cookies here to prove the token works.
    const sessionRes = await fetch(`${baseUrl}/get-session`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Origin': origin
      }
    });

    const sessionData = await sessionRes.json();
    console.log('Status:', sessionRes.status);
    console.log('Session Data:', JSON.stringify(sessionData, null, 2));

    if (sessionRes.ok && sessionData.user) {
      console.log('\nSUCCESS: Bearer Token authentication verified!');
      console.log(`User: ${sessionData.user.email}`);
    } else {
      console.log('\nFAILED: Could not retrieve session with Bearer Token.');
    }
  } catch (error) {
    console.error('Error during bearer token test:', error);
  }
}

testBearerToken();
