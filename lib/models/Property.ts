import mongoose, { Schema, Document } from "mongoose";

export interface IMedia {
  url: string;
  type: "image" | "video" | "vr";
  order: number;
  caption?: { en: string; ar: string };
}

export interface ILocation {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
  address: { en: string; ar: string };
  emirate: "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "Umm Al Quwain" | "Ras Al Khaimah" | "Fujairah";
  city: string;
  neighborhood?: string;
  postalCode?: string;
}

export interface IProperty extends Document {
  // Basic Info
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  type: "apartment" | "villa" | "townhouse" | "office" | "warehouse" | "land" | "penthouse";
  category: "rent" | "sale" | "off-plan";
  
  // Pricing
  price: number;
  currency: "AED" | "SAR" | "QAR" | "USD";
  pricePerSqm: number;
  paymentPlan?: Array<{
    installment: number;
    percentage: number;
    dueDate?: Date;
  }>;
  
  // Specifications
  beds: number;
  baths: number;
  area: {
    builtUp: number;
    plot?: number;
    unit: "sqm" | "sqft";
  };
  yearBuilt?: number;
  floors?: number;
  furnishing: "furnished" | "unfurnished" | "partially";
  
  // Location (denormalized for queries)
  emirate: string;
  city: string;
  neighborhood?: string;
  location: ILocation;
  
  // Media
  media: IMedia[];
  coverImage: string;
  floorPlans?: Array<{
    url: string;
    caption: { en: string; ar: string };
    area: number;
  }>;
  
  // Agent & Commission
  agentId: mongoose.Types.ObjectId;
  agencyId?: mongoose.Types.ObjectId;
  commission: {
    percentage: number;
    fixed?: number;
    paymentTerms: string;
  };
  
  // Gulf Compliance
  reraNumber: string;
  reraVerified: boolean;
  escrowRequired: boolean;
  escrowAccount?: {
    bank: string;
    accountNumber: string;
    verified: boolean;
  };
  developerId?: mongoose.Types.ObjectId;
  projectName?: { en: string; ar: string };
  
  // Status & Lifecycle
  status: "draft" | "under_review" | "published" | "reserved" | "sold" | "rented" | "archived";
  isFeatured: boolean;
  isPublished: boolean;
  viewCount: number;
  favoriteCount: number;
  
  // SEO & Tracking
  slug: { en: string; ar: string };
  referenceNumber: string;
  tags: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  lastViewedAt?: Date;
}

const MediaSchema = new Schema<IMedia>({
  url: { type: String, required: true },
  type: { type: String, enum: ["image", "video", "vr"], required: true },
  order: { type: Number, default: 0 },
  caption: {
    en: String,
    ar: String
  }
});

const LocationSchema = new Schema<ILocation>({
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], required: true, validate: {
    validator: (coords: [number, number]) => 
      coords.length === 2 && 
      coords[0] >= -180 && coords[0] <= 180 &&
      coords[1] >= -90 && coords[1] <= 90,
    message: "Invalid coordinates"
  }},
  address: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  emirate: { 
    type: String, 
    enum: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
    required: true 
  },
  city: { type: String, required: true },
  neighborhood: String,
  postalCode: String
});

const PropertySchema = new Schema<IProperty>({
  title: {
    en: { type: String, required: true, trim: true, maxlength: 200 },
    ar: { type: String, required: true, trim: true, maxlength: 200 }
  },
  description: {
    en: { type: String, required: true, maxlength: 5000 },
    ar: { type: String, required: true, maxlength: 5000 }
  },
  type: { 
    type: String, 
    enum: ["apartment", "villa", "townhouse", "office", "warehouse", "land", "penthouse"],
    required: true 
  },
  category: { 
    type: String, 
    enum: ["rent", "sale", "off-plan"],
    required: true 
  },
  price: { type: Number, required: true, min: 0 },
  currency: { 
    type: String, 
    enum: ["AED", "SAR", "QAR", "USD"],
    required: true 
  },
  pricePerSqm: { type: Number, min: 0 },
  paymentPlan: [{
    installment: Number,
    percentage: Number,
    dueDate: Date
  }],
  beds: { type: Number, min: 0 },
  baths: { type: Number, min: 0 },
  area: {
    builtUp: { type: Number, required: true, min: 0 },
    plot: { type: Number, min: 0 },
    unit: { type: String, enum: ["sqm", "sqft"], required: true }
  },
  yearBuilt: { type: Number, min: 1800, max: new Date().getFullYear() },
  floors: { type: Number, min: 0 },
  furnishing: { 
    type: String, 
    enum: ["furnished", "unfurnished", "partially"],
    default: "unfurnished" 
  },
  emirate: { 
    type: String, 
    enum: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
    required: true 
  },
  city: { type: String, required: true },
  neighborhood: String,
  location: LocationSchema,
  media: [MediaSchema],
  coverImage: { type: String, required: true },
  floorPlans: [{
    url: { type: String, required: true },
    caption: {
      en: String,
      ar: String
    },
    area: { type: Number, min: 0 }
  }],
  agentId: { 
    type: Schema.Types.ObjectId, 
    ref: "Agent", 
    required: true,
    index: true 
  },
  agencyId: { type: Schema.Types.ObjectId, ref: "Agency" },
  commission: {
    percentage: { type: Number, min: 0, max: 100 },
    fixed: { type: Number, min: 0 },
    paymentTerms: String
  },
  reraNumber: { 
    type: String, 
    required: true,
    match: [/^RERA-[A-Z0-9]+$/, "Invalid RERA number format"]
  },
  reraVerified: { type: Boolean, default: false },
  escrowRequired: { type: Boolean, default: false },
  escrowAccount: {
    bank: String,
    accountNumber: String,
    verified: { type: Boolean, default: false }
  },
  developerId: { type: Schema.Types.ObjectId, ref: "Developer" },
  projectName: {
    en: String,
    ar: String
  },
  status: { 
    type: String, 
    enum: ["draft", "under_review", "published", "reserved", "sold", "rented", "archived"],
    default: "draft" 
  },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  favoriteCount: { type: Number, default: 0 },
  slug: {
    en: { type: String, unique: true, sparse: true },
    ar: { type: String, unique: true, sparse: true }
  },
  referenceNumber: { 
    type: String, 
    unique: true,
    match: [/^PROP-\d{6}$/, "Invalid reference number format"] 
  },
  tags: [{ type: String, index: true }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Performance Indexes
PropertySchema.index({ location: "2dsphere" });
PropertySchema.index({ emirate: 1, city: 1, price: 1 });
PropertySchema.index({ status: 1, isPublished: 1, isFeatured: 1 });
PropertySchema.index({ agentId: 1, status: 1 });
PropertySchema.index({ type: 1, category: 1, beds: 1 });
PropertySchema.index({ price: 1, area: 1 });
PropertySchema.index({ "title.en": "text", "title.ar": "text", "description.en": "text", "description.ar": "text" });

// Virtual for full address
PropertySchema.virtual("fullAddress").get(function(this: IProperty) {
  return `${this.location.address.en}, ${this.location.neighborhood || ''}, ${this.location.city}, ${this.location.emirate}`;
});

// Pre-save hook for auto-generated fields

// Query helper for active properties
PropertySchema.query.active = function() {
  return this.where({ 
    status: "published", 
    isPublished: true 
  });
};

export default mongoose.models.Property || mongoose.model<IProperty>("Property", PropertySchema);
