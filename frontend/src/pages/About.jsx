import React from 'react';
import { Users, Target, Globe, Heart } from 'lucide-react';

const About = () => {
  const teamMembers = [
  {
    name: 'Boaz Mukwenyi',
    role: 'CEO & Founder',
    bio: 'Environmental scientist with 10+ years in sustainability research',
    image: '/images/boaz.jpg' // From public/images/ folder
  },
  {
    name: 'Alex Lumumba',
    role: 'CTO',
    bio: 'Tech entrepreneur passionate about climate tech solutions',
    image: 'src/assets/Alex.jpeg' // From public/images/ folder
  },
];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Our Mission',
      description: 'To empower every individual and organization to understand and reduce their carbon footprint, creating a sustainable future for generations to come.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Our Vision',
      description: 'A world where carbon tracking is as common as financial budgeting, and sustainable living is the norm rather than the exception.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Our Values',
      description: 'Transparency, innovation, and impact drive everything we do. We believe in data-driven solutions and community-powered change.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About CarbonTrack</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to make carbon tracking accessible, understandable, and actionable for everyone.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {values.map((value, index) => (
          <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-4">
              Founded in 2024, CarbonTrack emerged from a simple observation: while climate change is one of the most pressing issues of our time, most people lack the tools to understand their personal impact.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of environmental scientists, data analysts, and software engineers came together to create a platform that makes carbon tracking intuitive and empowering.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Impact</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">CO₂ Reduced</span>
                <span className="font-bold text-green-600">1,250+ tons</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Users</span>
                <span className="font-bold text-green-600">15,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Countries Reached</span>
                <span className="font-bold text-green-600">45+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-green-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;