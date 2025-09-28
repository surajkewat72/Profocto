const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  { key: 'NEXT_PUBLIC_CONVEX_URL', alternativeKeys: ['CONVEX_URL'] },
  { key: 'CONVEX_DEPLOY_KEY', alternativeKeys: ['CONVEX_KEY'] },
  { key: 'NEXTAUTH_SECRET', alternativeKeys: ['JWT_SECRET', 'AUTH_SECRET'] },
  { key: 'GOOGLE_CLIENT_ID', alternativeKeys: ['GOOGLE_ID'] },
  { key: 'GOOGLE_CLIENT_SECRET', alternativeKeys: ['GOOGLE_SECRET'] },
  { key: 'NEXTAUTH_URL', alternativeKeys: ['AUTH_URL', 'APP_URL'] }
];

console.log('Checking environment files...\n');

// Check for environment files
const envFiles = ['.env', '.env.local', '.env.development', '.env.development.local'];
const foundEnvFiles = envFiles.filter(file => fs.existsSync(path.join(process.cwd(), file)));

if (foundEnvFiles.length > 0) {
  console.log('Found environment files:');
  foundEnvFiles.forEach(file => console.log(`  - ${file}`));
} else {
  console.log('No environment files found. Please create one of: ' + envFiles.join(', '));
}

console.log('\nChecking environment variables...\n');
const missing = [];

for (const envVar of requiredEnvVars) {
  const allKeys = [envVar.key, ...envVar.alternativeKeys];
  const foundKey = allKeys.find(key => process.env[key]);
  
  if (!foundKey) {
    missing.push({
      main: envVar.key,
      alternatives: envVar.alternativeKeys
    });
  } else {
    console.log(`✓ ${envVar.key} is set (using ${foundKey})`);
  }
}

if (missing.length > 0) {
  console.error('\n❌ Missing required environment variables:');
  missing.forEach(v => {
    console.error(`  - ${v.main}`);
    if (v.alternatives.length > 0) {
      console.error(`    Alternative names accepted: ${v.alternatives.join(', ')}`);
    }
  });
  process.exit(1);
} else {
  console.log('\n✓ All required environment variables are set');
  console.log('\nYour authentication configuration should be ready to use!');
}