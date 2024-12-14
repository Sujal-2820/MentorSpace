'use client'

import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import { useState } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Header />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-background">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl">
            Find Your <span className="text-blue-600">Perfect Mentor</span> Match
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with experienced mentors or passionate mentees in your field. Grow together, learn from each other, and achieve your goals.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-foreground hover:bg-opacity-90 md:py-4 md:text-lg md:px-10">
                Get Started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const features = [
    {
      title: 'Smart Matching',
      description: 'Our AI-powered algorithm finds the perfect mentor-mentee matches based on skills, goals, and preferences.',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Easily schedule and manage mentorship sessions with our integrated calendar system.',
    },
    {
      title: 'Progress Tracking',
      description: 'Set goals, track progress, and celebrate milestones together on your mentorship journey.',
    },
    {
      title: 'Resource Sharing',
      description: 'Share and access a wealth of learning resources, from articles to video courses.',
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything you need for successful mentorship
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-foreground">{feature.title}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      content: "MentorMatch has been a game-changer for my career. I found an amazing mentor who's helped me grow both professionally and personally.",
      author: "Sarah J., Software Developer",
    },
    {
      content: "As a mentor, I've had the privilege of guiding talented individuals. This platform makes it easy to connect and make a real impact.",
      author: "Michael L., Marketing Executive",
    },
    {
      content: "The matching algorithm is spot-on! I was paired with a mentor who perfectly understood my goals and challenges.",
      author: "Emily R., Aspiring Entrepreneur",
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground text-center mb-8">What Our Users Say</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-foreground mb-4">{testimonial.content}</p>
              <p className="text-primary font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "How does the matching process work?",
      answer: "Our AI-powered algorithm considers your skills, goals, and preferences to suggest the most compatible mentors or mentees for you.",
    },
    {
      question: "Is MentorMatch free to use?",
      answer: "We offer a free basic plan and premium plans with additional features. Check our pricing page for more details.",
    },
    {
      question: "Can I be both a mentor and a mentee?",
      answer: "Many of our users find value in both mentoring others and receiving mentorship in different areas.",
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up, create your profile, and start exploring potential matches. You can then send connection requests to begin your mentorship journey.",
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground text-center mb-8">Frequently Asked Questions</h2>
        <dl className="space-y-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-4">
      <dt className="text-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-start text-left w-full text-foreground focus:outline-none"
        >
          <span className="font-semibold">{question}</span>
          <span className="ml-6 flex-shrink-0">
            <svg
              className={`h-6 w-6 transform ${isOpen ? 'rotate-180' : ''} transition-transform duration-200`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-2 text-foreground">
          <p>{answer}</p>
        </dd>
      )}
    </div>
  );
}