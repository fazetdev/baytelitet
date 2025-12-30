import connect from '@/lib/db';
import Agent from '@/lib/models/Agent';

async function seedAgent() {
  await connect();
  
  const agent = new Agent({
    name: 'Test Agent',
    email: 'agent@test.com',
    phone: '+971501234567',
    reraLicense: 'RERA-AGENT-001',
    specialization: ['villa', 'apartment'],
    languages: ['en', 'ar']
  });

  await agent.save();
  console.log('Test agent created:', agent._id);
  return agent._id;
}

seedAgent().catch(console.error);
