'use client';

import { useState, useEffect } from 'react';
import { User, Phone, Mail, BadgeCheck, FileText, Globe, MessageSquare, Search, ChevronDown, Camera } from 'lucide-react';
import { useAgentStore } from '@/lib/stores/agentStore';

interface AgentStepProps {
  lang: 'en' | 'ar';
  property: any;
  onChange: (e: any) => void;
  errors: any;
}

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  agency: string;
  licenseNumber: string;
  specialization: string;
  status: string;
}

export default function AgentStep({ 
  lang, 
  property, 
  onChange,
  errors 
}: AgentStepProps) {
  const { agents, fetchAgents } = useAgentStore();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAgentList, setShowAgentList] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Load agents on component mount
  useEffect(() => {
    const loadAgents = async () => {
      if (agents.length === 0) {
        setIsLoading(true);
        await fetchAgents();
        setIsLoading(false);
      }
    };
    loadAgents();
  }, [fetchAgents, agents.length]);

  // Initialize selected agent if agentId exists in property
  useEffect(() => {
    if (property.agentId && agents.length > 0) {
      const agent = agents.find(a => a.id === property.agentId);
      if (agent) {
        setSelectedAgent(agent);
        updatePropertyWithAgent(agent);
      }
    } else if (property.agentName && agents.length > 0) {
      // Try to find agent by name (for backward compatibility)
      const agent = agents.find(a => 
        a.name.toLowerCase() === property.agentName.toLowerCase() ||
        a.email.toLowerCase() === property.agentEmail?.toLowerCase()
      );
      if (agent) {
        setSelectedAgent(agent);
        updatePropertyWithAgent(agent);
      }
    }
  }, [agents, property.agentId, property.agentName, property.agentEmail]);

  const updatePropertyWithAgent = (agent: Agent) => {
    // Update all agent fields in property
    const updates = {
      agentId: agent.id,
      agentName: agent.name,
      agentPhone: agent.phone,
      agentEmail: agent.email,
      agentLicense: agent.licenseNumber,
      agentPicture: agent.photo
    };

    // Apply each update
    Object.entries(updates).forEach(([key, value]) => {
      const syntheticEvent = {
        target: {
          name: key,
          value: value
        }
      };
      onChange(syntheticEvent);
    });
  };

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentList(false);
    setSearchTerm('');
    updatePropertyWithAgent(agent);
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManualOverride = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(e);
    
    // If manually editing agent fields, clear the selected agent
    if (name.startsWith('agent') && selectedAgent) {
      setSelectedAgent(null);
      
      // Also clear agentId if it exists
      if (property.agentId) {
        const syntheticEvent = {
          target: {
            name: 'agentId',
            value: ''
          }
        };
        onChange(syntheticEvent);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Header */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-medium text-indigo-900">
              {lang === 'en' ? 'Agent & Final Details' : 'معلومات الوكيل والتفاصيل النهائية'}
            </h3>
            <p className="text-indigo-700 text-sm">
              {lang === 'en' 
                ? 'Select listing agent from registered professionals' 
                : 'اختر وكيل القائمة من المحترفين المسجلين'}
            </p>
          </div>
        </div>
      </div>

      {/* Agent Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'en' ? 'Select Agent *' : 'اختر الوكيل *'}
          </label>
          
          <div className="relative">
            {/* Agent Selector Button */}
            <button
              type="button"
              onClick={() => setShowAgentList(!showAgentList)}
              className={`w-full px-4 py-3 border rounded-lg flex items-center justify-between ${
                errors.agentName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {selectedAgent ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      {selectedAgent.photo ? (
                        <img src={selectedAgent.photo} alt={selectedAgent.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                          {selectedAgent.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{selectedAgent.name}</p>
                      <p className="text-xs text-gray-500">{selectedAgent.licenseNumber}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <User className="w-5 h-5" />
                    <span>{lang === 'en' ? 'Click to select an agent' : 'انقر لاختيار وكيل'}</span>
                  </div>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showAgentList ? 'rotate-180' : ''}`} />
            </button>

            {/* Agent List Dropdown */}
            {showAgentList && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {/* Search Bar */}
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={lang === 'en' ? 'Search agents...' : 'ابحث عن وكلاء...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                    <p>{lang === 'en' ? 'Loading agents...' : 'جاري تحميل الوكلاء...'}</p>
                  </div>
                )}

                {/* Agent List */}
                <div className="py-1">
                  {filteredAgents.length === 0 && !isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      <p>{lang === 'en' ? 'No agents found' : 'لم يتم العثور على وكلاء'}</p>
                      {searchTerm && (
                        <p className="text-sm mt-1">{lang === 'en' ? 'Try a different search term' : 'جرب مصطلح بحث آخر'}</p>
                      )}
                    </div>
                  ) : (
                    filteredAgents.map((agent) => (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => handleAgentSelect(agent)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          {agent.photo ? (
                            <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                              {agent.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{agent.name}</p>
                          <p className="text-sm text-gray-600 truncate">{agent.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <BadgeCheck className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-gray-500">{agent.licenseNumber}</span>
                          </div>
                        </div>
                        <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          agent.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {agent.status}
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Add Agent Note */}
                <div className="p-3 border-t bg-gray-50">
                  <p className="text-xs text-gray-600 text-center">
                    {lang === 'en' 
                      ? 'Need to add a new agent? Contact your admin.'
                      : 'هل تحتاج إلى إضافة وكيل جديد؟ اتصل بمسؤولك.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {errors.agentName && (
            <p className="text-red-500 text-sm mt-2">{errors.agentName}</p>
          )}
        </div>

        {/* Manual Override Fields (Read-only when agent selected) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'en' ? 'Agent Name' : 'اسم الوكيل'}
            </label>
            <input
              type="text"
              name="agentName"
              value={property.agentName || ''}
              onChange={handleManualOverride}
              placeholder={lang === 'en' ? 'Will auto-fill when agent selected' : 'سيتم الملء التلقائي عند اختيار الوكيل'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              readOnly={!!selectedAgent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'en' ? 'Agent License Number' : 'رقم ترخيص الوكيل'}
            </label>
            <input
              type="text"
              name="agentLicense"
              value={property.agentLicense || ''}
              onChange={handleManualOverride}
              placeholder={lang === 'en' ? 'e.g., DLD-12345, RERA-67890' : 'مثال: DLD-12345, RERA-67890'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              readOnly={!!selectedAgent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'en' ? 'Agent Phone' : 'هاتف الوكيل'}
            </label>
            <input
              type="tel"
              name="agentPhone"
              value={property.agentPhone || ''}
              onChange={handleManualOverride}
              placeholder="+971 50 123 4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              readOnly={!!selectedAgent}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'en' ? 'Agent Email' : 'بريد الوكيل'}
            </label>
            <input
              type="email"
              name="agentEmail"
              value={property.agentEmail || ''}
              onChange={handleManualOverride}
              placeholder="agent@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              readOnly={!!selectedAgent}
            />
          </div>
        </div>
      </div>

      {/* Agent Profile Preview */}
      {(property.agentName || selectedAgent) && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-700">{lang === 'en' ? 'Agent Profile Preview' : 'معاينة ملف الوكيل'}</h4>
              <p className="text-sm text-gray-500">
                {lang === 'en' 
                  ? 'How the agent information will appear to clients' 
                  : 'كيف ستظهر معلومات الوكيل للعملاء'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                {property.agentPicture ? (
                  <img src={property.agentPicture} alt={property.agentName} className="w-full h-full object-cover" />
                ) : property.agentName ? (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                    {property.agentName.charAt(0)}
                  </div>
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-lg">{property.agentName || (lang === 'en' ? 'Agent Name' : 'اسم الوكيل')}</h5>
                    {property.agentLicense && (
                      <div className="flex items-center gap-2 mt-1">
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{lang === 'en' ? 'Licensed' : 'مرخص'}</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {property.agentLicense}
                        </span>
                      </div>
                    )}
                  </div>
                  {property.agentPhone && (
                    <a 
                      href={`tel:${property.agentPhone}`}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">{lang === 'en' ? 'Call' : 'اتصل'}</span>
                    </a>
                  )}
                </div>

                {(property.agentPhone || property.agentEmail) && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.agentPhone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Phone className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Phone' : 'الهاتف'}</p>
                          <p className="font-medium">{property.agentPhone}</p>
                        </div>
                      </div>
                    )}
                    {property.agentEmail && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{lang === 'en' ? 'Email' : 'البريد'}</p>
                          <p className="font-medium truncate">{property.agentEmail}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          {lang === 'en' ? 'Property Description *' : 'وصف العقار *'}
        </label>
        <div className={`border rounded-lg overflow-hidden ${
          errors.description ? 'border-red-300' : 'border-gray-300'
        }`}>
          <textarea
            name="description"
            value={property.description || ''}
            onChange={onChange}
            rows={6}
            placeholder={lang === 'en' 
              ? 'Describe the property features, amenities, location advantages, nearby facilities, unique selling points...\n\n• Luxury finishes\n• Prime location\n• High ROI potential\n• 24/7 security\n• Swimming pool & gym'
              : 'صف مميزات العقار، المرافق، مزايا الموقع، المنشآت القريبة، نقاط البيع الفريدة...\n\n• تشطيبات فاخرة\n• موقع متميز\n• إمكانية عائد استثماري مرتفع\n• أمن 24/7\n• مسبح وصالة ألعاب رياضية'
            }
            className="w-full px-4 py-3 focus:outline-none resize-none"
          />
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {lang === 'en' 
                ? `${(property.description || '').length}/2000 characters` 
                : `${(property.description || '').length}/2000 حرف`}
            </span>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{lang === 'en' ? 'Public listing' : 'قائمة عامة'}</span>
            </div>
          </div>
        </div>
        {errors.description && (
          <p className="text-red-500 text-sm mt-2">{errors.description}</p>
        )}
      </div>

      {/* Description Tips */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-900">
              {lang === 'en' ? 'Description Tips' : 'نصائح للوصف'}
            </h4>
            <ul className="text-green-800 text-sm mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Start with a compelling headline that highlights key features' 
                  : 'ابدأ بعنوان جذاب يبرز الميزات الرئيسية'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Use bullet points for easy readability' 
                  : 'استخدم النقاط النقطية لسهولة القراءة'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Include nearby amenities: schools, malls, hospitals, transport' 
                  : 'أضف المرافق القريبة: مدارس، مولات، مستشفيات، مواصلات'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{lang === 'en' 
                  ? 'Mention investment potential and ROI calculations' 
                  : 'اذكر إمكانات الاستثمار وحسابات العائد على الاستثمار'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
