import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  console.error("Set JWT_SECRET environment variable first");
  process.exit(1);
}

const token = jwt.sign(
  { id: 'TEST_AGENT_ID', role: 'agent' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

console.log(token);
