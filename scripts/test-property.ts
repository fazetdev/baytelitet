import connect from "../lib/db";
import Property from "../lib/models/Property";
import mongoose from "mongoose";

async function runTest() {
  console.log(`[${new Date().toISOString()}] Testing Production Property Schema...`);

  try {
    const db = await connect();
    console.log(`[${new Date().toISOString()}] MongoDB connected successfully.`);

    // Create test agent ID for reference
    const testAgentId = new mongoose.Types.ObjectId();
    
    // Production-grade test property for Gulf market
    const testProperty = new Property({
      title: { 
        en: "Luxury Villa with Private Pool", 
        ar: "فيلا فاخرة مع مسبح خاص" 
      },
      description: { 
        en: "Stunning 5-bedroom villa in Palm Jumeirah with panoramic sea views.",
        ar: "فيلا خلابة مكونة من 5 غرف نوم في نخلة الجميرة مع إطلالات بانورامية على البحر."
      },
      type: "villa",
      category: "sale",
      price: 12500000,
      currency: "AED",
      beds: 5,
      baths: 4,
      area: {
        builtUp: 400,
        plot: 600,
        unit: "sqm"
      },
      yearBuilt: 2022,
      floors: 2,
      furnishing: "furnished",
      
      // Location - denormalized for queries
      emirate: "Dubai",
      city: "Dubai",
      neighborhood: "Palm Jumeirah",
      location: {
        type: "Point",
        coordinates: [55.2708, 25.2048],
        address: {
          en: "Villa 45, Palm Jumeirah",
          ar: "فيلا 45، نخلة الجميرة"
        },
        emirate: "Dubai",
        city: "Dubai",
        neighborhood: "Palm Jumeirah"
      },
      
      // Media
      media: [
        { url: "https://example.com/villa1.jpg", type: "image", order: 1 },
        { url: "https://example.com/villa2.jpg", type: "image", order: 2 }
      ],
      coverImage: "https://example.com/villa1.jpg",
      
      // Agent & Commission
      agentId: testAgentId,
      commission: {
        percentage: 2.5,
        paymentTerms: "50% on contract signing, 50% on completion"
      },
      
      // Gulf Compliance
      reraNumber: "RERA-789012",
      reraVerified: true,
      escrowRequired: true,
      
      // Status
      status: "published",
      isFeatured: true,
      isPublished: true,
      
      // SEO & Tracking
      tags: ["luxury", "sea-view", "pool", "palm-jumeirah", "villa"]
    });

    // Save property
    await testProperty.save();
    console.log(`[${new Date().toISOString()}] Property created: ${testProperty.referenceNumber}`);
    
    // Test queries
    const byCity = await Property.findOne({ city: "Dubai" });
    console.log(`[${new Date().toISOString()}] Found by city: ${byCity?.referenceNumber}`);
    
    // GeoJSON query
    const nearby = await Property.find({
      location: {
        $geoWithin: {
          $centerSphere: [[55.2708, 25.2048], 10 / 6378.1]
        }
      }
    });
    console.log(`[${new Date().toISOString()}] Properties within 10km: ${nearby.length}`);
    
    // Cleanup
    await Property.deleteOne({ _id: testProperty._id });
    console.log(`[${new Date().toISOString()}] Test data cleaned up.`);
    
    await db.disconnect();
    console.log(`[${new Date().toISOString()}] Test completed successfully.`);
    
  } catch (err: any) {
    console.error(`[${new Date().toISOString()}] Test failed:`, err.message);
    if (err.errors) {
      Object.entries(err.errors).forEach(([field, error]: [string, any]) => {
        console.error(`  ${field}: ${error.message}`);
      });
    }
    process.exit(1);
  }
}

runTest();
