import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Information We Collect',
      content: `We collect information to provide better services to our users. This includes:

• Personal Information: Name, email address, and profile information you provide
• Usage Data: How you interact with our platform and carbon tracking features
• Environmental Data: Your carbon emissions data, energy usage, transportation habits, and consumption patterns
• Technical Data: Device information, IP address, and browser type`
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: `Your data helps us personalize your experience and improve our services:

• Provide personalized carbon reduction recommendations
• Generate insights and analytics about your environmental impact
• Improve our platform and develop new features
• Communicate important updates and educational content
• Conduct research on carbon reduction patterns (anonymized and aggregated)`
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Protection',
      content: `We take your privacy seriously and implement robust security measures:

• Encryption of all sensitive data in transit and at rest
• Regular security audits and vulnerability assessments
• Strict access controls and authentication protocols
• Compliance with global data protection regulations (GDPR, CCPA)
• Regular data backups and disaster recovery procedures`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Your Rights',
      content: `You have control over your data:

• Access and download your personal data
• Request correction of inaccurate information
• Delete your account and associated data
• Opt-out of marketing communications
• Object to certain data processing activities
• Data portability to transfer your information`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600">
          Last updated: December 2024
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <p className="text-gray-600 mb-6">
          At CarbonTrack, we are committed to protecting your privacy and being transparent about how we handle your data.
          This policy explains what information we collect, how we use it, and your rights regarding your personal data.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Our Commitment</h3>
          <p className="text-gray-700">
            We believe that privacy and environmental responsibility go hand in hand. We will never sell your personal data
            to third parties, and we only use your information to help you reduce your carbon footprint and improve our services.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600 flex-shrink-0">
                {section.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Our Privacy Team</h3>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy or how we handle your data, please contact our Privacy Team:
        </p>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Email:</strong> privacy@carbontrack.com
          </p>
          <p className="text-gray-700">
            <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;