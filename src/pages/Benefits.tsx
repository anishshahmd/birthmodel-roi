import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  Clock, 
  Users, 
  LineChart, 
  DollarSign 
} from 'lucide-react';

const Benefits = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Benefits of BirthModel</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover how our AI-driven platform transforms labor and delivery units
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Enhanced Patient Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time risk assessment and monitoring</li>
                <li>• Early detection of complications</li>
                <li>• Standardized care protocols</li>
                <li>• Improved communication between care teams</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Improved Efficiency</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Optimized room utilization</li>
                <li>• Reduced wait times</li>
                <li>• Streamlined workflows</li>
                <li>• Better resource allocation</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Time Savings</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 3 hours saved per nurse shift</li>
                <li>• 4 hours saved per administrator daily</li>
                <li>• 5 hours saved per provider daily</li>
                <li>• Reduced documentation time</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Staff Satisfaction</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reduced burnout</li>
                <li>• Better work-life balance</li>
                <li>• Improved team collaboration</li>
                <li>• Enhanced job satisfaction</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <LineChart className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Clinical Excellence</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Evidence-based decision support</li>
                <li>• Predictive analytics</li>
                <li>• Quality metrics tracking</li>
                <li>• Continuous improvement</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Financial Impact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reduced claim denials</li>
                <li>• Increased revenue</li>
                <li>• Lower operational costs</li>
                <li>• Better resource utilization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mountainside Medical Center</h3>
              <p className="text-gray-600 mb-4">
                Achieved a 94% reduction in first-pass claim denials and saved over 
                1,000 staff hours in the first year of implementation.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-3xl font-bold text-blue-600">94%</p>
                  <p className="text-sm text-gray-600">Reduction in Denials</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">1,000+</p>
                  <p className="text-sm text-gray-600">Hours Saved</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Pascack Valley Medical Center</h3>
              <p className="text-gray-600 mb-4">
                Improved room utilization by 15% and reduced average length of stay 
                by implementing BirthModel's AI-driven solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-3xl font-bold text-blue-600">15%</p>
                  <p className="text-sm text-gray-600">Better Utilization</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">-20%</p>
                  <p className="text-sm text-gray-600">Length of Stay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the Benefits Yourself</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join leading hospitals in transforming maternal care with BirthModel's 
            AI-driven platform.
          </p>
          <div className="space-x-4">
            <a 
              href="mailto:demo@birthmodel.com" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Request a Demo
            </a>
            <a 
              href="/calculator" 
              className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50"
            >
              Calculate ROI
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;