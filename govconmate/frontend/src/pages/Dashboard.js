import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/v1/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-govcon-blue"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-gray-600">
            Ready to dominate federal contracting? Let's get started.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-govcon-blue">0</div>
            <div className="text-gray-600">RFPs Analyzed</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-govcon-blue">0</div>
            <div className="text-gray-600">Proposals Created</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-govcon-blue">0%</div>
            <div className="text-gray-600">Win Rate</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-govcon-blue">0</div>
            <div className="text-gray-600">Certifications</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-govcon-blue rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyze RFP</h3>
            <p className="text-gray-600 mb-4">
              Upload a solicitation and get AI-powered analysis and recommendations.
            </p>
            <button className="btn-primary w-full">Upload RFP</button>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-govcon-blue rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Create Proposal</h3>
            <p className="text-gray-600 mb-4">
              Start building your winning proposal with AI assistance.
            </p>
            <button className="btn-primary w-full">New Proposal</button>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-govcon-blue rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Training Hub</h3>
            <p className="text-gray-600 mb-4">
              Master GovCon fundamentals and earn certifications.
            </p>
            <button className="btn-primary w-full">Start Learning</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="card">
            <div className="text-gray-500 text-center py-8">
              No recent activity. Start by analyzing your first RFP or creating a proposal!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;