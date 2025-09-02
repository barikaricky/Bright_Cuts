'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [userType, setUserType] = useState<'customer' | 'barber' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-primary">GROOMOSPHERE</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-text-secondary hover:text-primary transition-colors">How It Works</a>
            <a href="#about" className="text-text-secondary hover:text-primary transition-colors">About</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Logo and Tagline */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-in">
              <span className="text-white font-bold text-3xl">G</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              GROOMOSPHERE
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8">
              Professional Barber Services, On-Demand
            </p>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Connect with professional barbers for quality haircuts at your location. 
              Experience convenience, quality, and style with GROOMOSPHERE.
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-12 animate-slide-up">
            <h2 className="text-2xl font-semibold text-text-primary mb-8">
              Choose Your Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Customer Card */}
              <div 
                className={`card cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  userType === 'customer' ? 'ring-2 ring-primary bg-primary-50' : ''
                }`}
                onClick={() => setUserType('customer')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">I'm a Customer</h3>
                  <p className="text-text-secondary">
                    Book professional barbers for on-demand services at your location
                  </p>
                </div>
              </div>

              {/* Barber Card */}
              <div 
                className={`card cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  userType === 'barber' ? 'ring-2 ring-primary bg-primary-50' : ''
                }`}
                onClick={() => setUserType('barber')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">I'm a Barber</h3>
                  <p className="text-text-secondary">
                    Offer your professional services and grow your business with us
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {userType && (
            <div className="animate-fade-in space-y-4">
              <button className="btn-primary text-lg px-8 py-4 w-full md:w-auto">
                {userType === 'customer' ? 'Find a Barber' : 'Join as Barber'}
              </button>
              <div className="text-center">
                <p className="text-text-secondary mb-4">
                  {userType === 'customer' ? 'Already have an account?' : 'Already registered?'}
                </p>
                <button className="btn-outline">
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose GROOMOSPHERE?</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Experience the future of grooming with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">On-Demand Service</h3>
              <p className="text-text-secondary">
                Professional barbers come to your location at your convenience
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Verified Professionals</h3>
              <p className="text-text-secondary">
                All our barbers are verified and highly rated by customers
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Secure Payments</h3>
              <p className="text-text-secondary">
                Safe and secure payment processing with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">G</span>
            </div>
            <span className="text-xl font-bold">GROOMOSPHERE</span>
          </div>
          <p className="text-primary-200 mb-4">
            Professional Barber Services, On-Demand
          </p>
          <p className="text-primary-300 text-sm">
            © 2024 GROOMOSPHERE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
