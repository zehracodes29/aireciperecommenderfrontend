'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, Sparkles, Clock, Heart, TrendingUp, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Smart recommendations based on your ingredients"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick & Easy",
      description: "Find recipes in seconds, not hours"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized",
      description: "Matches your dietary preferences perfectly"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center mb-8 group cursor-pointer">
              <div className="bg-linear-to-br from-orange-500 to-amber-500 p-6 rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <ChefHat className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent animate-gradient">
                Cook Smarter
              </span>
              <br />
              <span className="text-slate-800">Not Harder</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Turn your ingredients into delicious meals with AI-powered recipe recommendations
            </p>

            {/* CTA Button */}
            <Link href="/FileUpload">
              <button className="group bg-linear-to-r from-orange-500 to-amber-500 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span>1000+ Recipes</span>
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-orange-500" />
                <span>Personalized Results</span>
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>AI Powered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              Why Choose AI Recipe Finder?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  <div className="bg-linear-to-br from-orange-100 to-amber-100 w-14 h-14 rounded-2xl flex items-center justify-center text-orange-600 mb-5 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              How It Works
            </h2>
            
            <div className="space-y-6">
              {[
                { step: '1', title: 'Enter Your Ingredients', desc: 'Tell us what you have in your kitchen' },
                { step: '2', title: 'Set Your Preferences', desc: 'Choose dietary restrictions and cooking time' },
                { step: '3', title: 'Get Recipes', desc: 'Discover personalized recipe recommendations' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 transform transition-all hover:translate-x-2"
                  style={{
                    animation: `slideInLeft 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div className="bg-linear-to-br from-orange-500 to-amber-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center bg-linear-to-r from-orange-500 to-amber-500 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Cook Something Amazing?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Start discovering recipes tailored just for you
            </p>
            <Link href="/FileUpload/generate-page.jsx">
              <button className="bg-white text-orange-600 px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95">
                Start Now
              </button>
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}