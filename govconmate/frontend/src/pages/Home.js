import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-govcon-blue to-govcon-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered GovCon SuperApp
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Master federal contracting with AI-powered RFP analysis, proposal generation, 
            and comprehensive training. Built by Quartermasters FZC for government contractors.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-govcon-gold text-govcon-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
            >
              Start Free Trial
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-govcon-navy transition-colors inline-block"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-govcon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI RFP Analyzer</h3>
              <p className="text-gray-600">
                Upload solicitations and get instant AI-powered analysis, compliance matrices, 
                and go/no-go recommendations.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-govcon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Proposal Generator</h3>
              <p className="text-gray-600">
                AI-assisted proposal writing with compliance checking, 
                version control, and winning strategies.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-govcon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Training Hub</h3>
              <p className="text-gray-600">
                Master GovCon with interactive courses, certifications, 
                and gamified learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-govcon-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your GovCon Business?</h2>
          <p className="text-xl mb-8">
            Join thousands of contractors already winning more with GovConMate
          </p>
          <Link
            to="/register"
            className="bg-govcon-gold text-govcon-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;