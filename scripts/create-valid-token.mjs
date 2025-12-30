import jwt from 'jsonwebtoken';

const payload = {
  id: '6954090ead197cf81b5e3cfa', // Real agent ID from database
  role: 'agent',
  email: 'agent@test.com'
};

const token = jwt.sign(payload, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });
console.log(token);
