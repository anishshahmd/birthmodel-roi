import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  LineChart, 
  Clock, 
  Users, 
  Shield, 
  MessageSquare 
} from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transform Your Labor & Delivery Unit with AI
              </h1>
              <p className="text-xl mb-8">
                Increase safety, efficiency, and cost savings with our AI-driven platform designed specifically for maternal care.
              </p>
              <div className="space-x-4">
                <Link 
                  to="/calculator" 
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
                >
                  Calculate ROI
                </Link>
                <a 
                  href="mailto:demo@birthmodel.com" 
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600"
                >
                  Request Demo
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80"
                alt="Healthcare professionals using modern technology"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BrainCircuit className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Driven Predictions</h3>
              <p className="text-gray-600">
                Predict delivery times with {'>'} 94% accuracy and optimize staff allocation for improved workflow.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <LineChart className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p className="text-gray-600">
                SMART on FHIR integration with Epic and Cerner for smooth workflow implementation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">
                Get instant updates on patient status and delivery progress through our mobile app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BirthModel?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Safety</h3>
                <p className="text-gray-600">
                  Improve patient outcomes with AI-driven risk assessment and real-time monitoring.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimized Staffing</h3>
                <p className="text-gray-600">
                  Reduce overtime costs and improve staff satisfaction with intelligent scheduling.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MessageSquare className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Better Communication</h3>
                <p className="text-gray-600">
                  Streamline team coordination with our integrated communication platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your L&D Unit?</h2>
          <p className="text-xl mb-8">
            Join leading hospitals in revolutionizing maternal care with BirthModel.
          </p>
          <div className="space-x-4">
            <Link 
              to="/calculator" 
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Calculate Your ROI
            </Link>
            <a 
              href="mailto:demo@birthmodel.com" 
              className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;