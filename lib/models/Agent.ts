import mongoose, { Schema, Document } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  email: string;
  phone: string;
  reraLicense: string;
  password: string; // Added for agent login
  agencyId?: mongoose.Types.ObjectId;
  specialization: string[];
  languages: string[];
  ratings: {
    average: number;
    count: number;
  };
  status: 'active' | 'inactive' | 'suspended';
  picture?: string; // Added picture field - URL to profile picture
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema<IAgent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  reraLicense: { type: String, required: true },
  password: { type: String, required: true }, // Added password field
  agencyId: { type: Schema.Types.ObjectId, ref: 'Agency' },
  specialization: [String],
  languages: [String],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  picture: { type: String } // Added picture field to schema
}, { timestamps: true });

// Add index for email (login queries)
AgentSchema.index({ email: 1 });

export default mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);
