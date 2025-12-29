'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import PropertyMap from '../components/PropertyMap';
import VirtualTourViewer from '../components/VirtualTourViewer';
import {
  Bed,
  Bath,
  MapPin,
  DollarSign,
  Home,
  Building2,
  Calendar,
  Maximize,
  CheckCircle,
  Shield,
  User,
  Phone,
  Mail,
  Heart,
  Share2,
  ArrowLeft,
  Download,
  Printer,
  MessageCircle,
  Star,
  Loader2,
  AlertCircle,
  Building,
  TreePine
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { properties, loadProperties } = useGulfAssetStore();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'location' | 'compliance'>('overview');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load properties from store
        await loadProperties();
        
        // Find the property by ID
        const foundProperty = properties.find(p => String(p.id) === String(id));
        
        if (foundProperty) {
          console.log('Found property:', foundProperty);
          setProperty(foundProperty);
        } else {
          // Fallback to localStorage
          const savedProperties = localStorage.getItem('gulf_properties');
          if (savedProperties) {
            const allProperties = JSON.parse(savedProperties);
            const localProperty = allProperties.find((p: any) => String(p.id) === String(id));
            if (localProperty) {
              console.log('Found property in localStorage:', localProperty);
              setProperty(localProperty);
            } else {
              setError('Property not found');
            }
          } else {
            setError('Property not found');
          }
        }
      } catch (err) {
        console.error('Error loading property:', err);
        setError('Failed to load property details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, loadProperties, properties]);

  // Property type icons
  const propertyTypeIcons: Record<string, JSX.Element> = {
    apartment: <Home className="w-5 h-5" />,
    villa: <Home className="w-5 h-5" />,
    townhouse: <Building2 className="w-5 h-5" />,
    penthouse: <Building2 className="w-5 h-5" />,
    office: <Building className="w-5 h-5" />,
    retail: <Building className="w-5 h-5" />,
    warehouse: <Building className="w-5 h-5" />,
    land: <TreePine className="w-5 h-5" />,
  };

  // Get all images for the property
  const getAllImages = (): string[] => {
    if (!property) return [];
    const images: string[] = [];
    
    if (property.heroImage && typeof property.heroImage === 'string') {
      images.push(property.heroImage);
    }
    
    if (property.gallery && Array.isArray(property.gallery)) {
      images.push(...property.gallery.filter((img: string) => img && typeof img === 'string' && img.trim() !== ''));
    }
    
    if (property.images && Array.isArray(property.images)) {
      images.push(...property.images.filter((img: string) => img && typeof img === 'string' && img.trim() !== ''));
    }
    
    return [...new Set(images)]; // Remove duplicates
  };

  const images = getAllImages();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The property you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Breadcrumb */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
              Properties
            </Link>
            <span className="text-gray-500">/</span>
            <span className="font-medium truncate max-w-[200px]">{property.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
                  {propertyTypeIcons[property.propertyType] || <Home className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {property.propertyType?.charAt(0).toUpperCase() + property.propertyType?.slice(1) || 'Property'}
                  </span>
                </div>
                {property.offPlan && (
                  <span className="px-3 py-1 bg-amber-600 rounded-full text-sm font-medium">
                    Off-Plan
                  </span>
                )}
                {property.escrowRequired && (
                  <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">
                    Escrow Protected
                  </span>
                )}
                {property.complianceStatus === 'verified' && (
                  <span className="px-3 py-1 bg-emerald-600 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-lg text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>{property.address}, {property.city}, {property.country}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Price</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-3xl font-bold">
                    {property.currency} {Number(property.price || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Bed className="w-5 h-5" />
                    <span className="text-xl font-bold">{property.beds || 0}</span>
                  </div>
                  <span className="text-xs text-gray-300">Bedrooms</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Bath className="w-5 h-5" />
                    <span className="text-xl font-bold">{property.baths || 0}</span>
                  </div>
                  <span className="text-xs text-gray-300">Bathrooms</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Maximize className="w-5 h-5" />
                    <span className="text-xl font-bold">{property.area || 0}</span>
                  </div>
                  <span className="text-xs text-gray-300">{property.areaUnit || 'sqft'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-4">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={images[activeImage]}
                    alt={`${property.title} - Image ${activeImage + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%239ca3af" text-anchor="middle" dy=".3em">Image Not Available</text></svg>';
                    }}
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-4">
                    {images.map((img: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === index 
                            ? 'border-blue-500 scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="10" fill="%239ca3af" text-anchor="middle" dy=".3em">Image</text></svg>';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Virtual Tour Section */}
            {property.virtualTour && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Virtual Tour</h3>
                <VirtualTourViewer
                  tourData={property.virtualTour}
                  language="en"
                  isRTL={false}
                />
              </div>
            )}

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'overview' as const, label: 'Overview', icon: <Home className="w-4 h-4" /> },
                  { id: 'features' as const, label: 'Features', icon: <Star className="w-4 h-4" /> },
                  { id: 'location' as const, label: 'Location', icon: <MapPin className="w-4 h-4" /> },
                  { id: 'compliance' as const, label: 'Compliance', icon: <Shield className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Property Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {property.description || 'No description available.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Property Type</div>
                      <div className="flex items-center gap-2 font-semibold">
                        {propertyTypeIcons[property.propertyType] || <Home className="w-5 h-5" />}
                        {property.propertyType?.charAt(0).toUpperCase() + property.propertyType?.slice(1) || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Year Built</div>
                      <div className="flex items-center gap-2 font-semibold">
                        <Calendar className="w-5 h-5" />
                        {property.yearBuilt || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Property Status</div>
                      <div className={`font-semibold ${
                        property.status === 'available' ? 'text-green-600' : 
                        property.status === 'sold' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {property.status?.charAt(0).toUpperCase() + property.status?.slice(1) || 'Available'}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">Price per sqft</div>
                      <div className="font-semibold">
                        {property.area ? `${Math.round(Number(property.price) / property.area).toLocaleString()} ${property.currency}/${property.areaUnit || 'sqft'}` : 'N/A'}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Features & Amenities</h3>
                  {property.features ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {typeof property.features === 'string' 
                        ? property.features.split(',').map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="font-medium">{feature.trim()}</span>
                            </div>
                          ))
                        : Array.isArray(property.features)
                        ? property.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="font-medium">{feature}</span>
                            </div>
                          ))
                        : (
                            <div className="text-gray-500">No features listed</div>
                          )}
                    </div>
                  ) : (
                    <div className="text-gray-500">No features listed for this property.</div>
                  )}
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Location & Map</h3>
                  <div className="h-[400px] rounded-xl overflow-hidden border border-gray-200">
                    <PropertyMap
                      latitude={property.lat}
                      longitude={property.long}
                      title={property.title}
                      zoom={15}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Address Details</h4>
                      <div className="space-y-2 text-gray-600">
                        <p><span className="font-medium">Address:</span> {property.address}</p>
                        <p><span className="font-medium">City:</span> {property.city}</p>
                        <p><span className="font-medium">State/Region:</span> {property.state || 'N/A'}</p>
                        <p><span className="font-medium">Country:</span> {property.country}</p>
                        <p><span className="font-medium">Postal Code:</span> {property.postalCode || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Neighborhood Highlights</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">• Premium residential area</li>
                        <li className="flex items-center gap-2">• Close to major highways</li>
                        <li className="flex items-center gap-2">• Shopping and dining options nearby</li>
                        <li className="flex items-center gap-2">• Schools and parks in proximity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Legal & Compliance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-green-600" />
                        <h4 className="font-bold text-green-900">RERA Certification</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Registration Number</p>
                          <p className="font-mono font-bold text-lg">{property.reraNumber || 'Not Available'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Verification Status</p>
                          <p className="font-semibold text-green-700">
                            {property.complianceStatus === 'verified' ? 'Verified ✓' : 'Pending Verification'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                        <h4 className="font-bold text-blue-900">Financial Information</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Escrow Required</p>
                          <p className="font-semibold">{property.escrowRequired ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimated Monthly ROI</p>
                          <p className="font-bold text-lg">
                            {property.currency} {((Number(property.price) * 0.06) / 12).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Full Dossier
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  isFavorite
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save Property'}
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-2">Request Information</h3>
              <p className="text-gray-300 mb-6">
                Get complete details, schedule a viewing, or request documentation.
              </p>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                    <option value="">I'm interested in...</option>
                    <option value="viewing">Schedule a Viewing</option>
                    <option value="details">Request Full Details</option>
                    <option value="financing">Financing Options</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Submit Request
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-gray-400">
                <p>Your inquiry will be handled by our certified agents within 24 hours.</p>
              </div>
            </div>

            {/* Agent Information */}
            {property.agentId && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Listing Agent</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">Assigned Agent</h4>
                    <p className="text-gray-600 text-sm">RERA Licensed Professional</p>
                    <div className="mt-4 space-y-2">
                      <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Contact Agent
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Property Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Days on Market</p>
                  <p className="text-lg font-semibold">12 days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Views this Month</p>
                  <p className="text-lg font-semibold">247 views</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per sqft</p>
                  <p className="text-lg font-semibold">
                    {property.area 
                      ? `${Math.round(Number(property.price) / property.area).toLocaleString()} ${property.currency}`
                      : 'N/A'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Market Comparison</p>
                  <p className="text-lg font-semibold text-green-600">-3.2% below avg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Modal */}
      {showDetailsModal && property && (
        <PropertyDetailsModal
          property={{
            id: property.id,
            title: property.title,
            price: property.price,
            location: `${property.address}, ${property.city}`,
            type: property.propertyType,
            bedrooms: property.beds,
            bathrooms: property.baths,
            description: property.description,
            area: property.area,
            status: property.status,
            rentalYield: '7.2%',
            images: getAllImages(),
          }}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          language="en"
        />
      )}
    </div>
  );
}
