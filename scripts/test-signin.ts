async function testSignIn() {
  const baseUrl = 'http://localhost:3000/api/auth';
  const origin = 'http://localhost:3000';

  // Use a test user (ideally one that was just created or exists)
  // For this test, you might need to use an email that is already verified or 
  // handle the "email not verified" error.
  const email = process.argv[2] || 'test-user@example.com';
  const password = process.argv[3] || 'Password123!';

  console.log(`\n--- Testing sign-in for ${email} ---`);
  const signinUrl = `${baseUrl}/sign-in/email`;
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(signinUrl, {
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
      console.log('Sign-in successful!');
      if (result.session) {
        console.log('Session created:', result.session.id);
      }
    } else {
      console.log('Sign-in failed.');
      if (result.code === 'EMAIL_NOT_VERIFIED') {
        console.log('Reason: Email not verified. Please verify your email first.');
      } else {
        console.log('Reason:', result.message || result.code || 'Unknown error');
      }
    }
  } catch (error) {
    console.error('Error during sign-in test:', error);
  }
}

testSignIn();
