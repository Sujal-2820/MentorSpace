'use client'

import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Header />
        <Features />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-background">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl">
              Find Your <span className="text-blue-600">Perfect Mentor</span> Match
            </h1>
            <p className="mt-3 text-xl text-foreground sm:mt-5 sm:text-2xl lg:text-xl xl:text-2xl">
              Connect with experienced mentors or passionate mentees in your field. Grow together, learn from each other, and achieve your goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out">
                Get Started
              </a>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
          <Image
                src="https://media.istockphoto.com/id/2077560078/photo/closeup-lawyer-or-insurance-agent-pointing-at-contract-showing-male-client-where-to-signature.jpg?s=612x612&w=0&k=20&c=lU8Dlal-bE054A4CzqcWsH9_sWymfv-LUHqbGqODbiw="
                alt="Mentorship illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                style={{
                  clipPath: 'url(#blob)',
                  width: '100%',
                  height: 'auto',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              />
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
      image: 'https://www.lmja.com/blog/wp-content/uploads/2016/05/photodune-6901703-connecting-people-xs.jpg',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Easily schedule and manage mentorship sessions with our integrated calendar system.',
      image: 'https://media.istockphoto.com/id/2187227030/vector/in-a-modern-office-setting-three-individuals-focus-on-their-laptops-while-one-actively.jpg?s=612x612&w=0&k=20&c=plPLvuiycN1M_mSxdVzjcy_cIW5nY9i3MbwKSIJ5TRI=',
    },
    {
      title: 'Progress Tracking',
      description: 'Set goals, track progress, and celebrate milestones together on your mentorship journey.',
      image: 'https://media.istockphoto.com/id/953153186/vector/target-guideline.jpg?s=612x612&w=0&k=20&c=lqZrNI91wXJqIiLA-4cIZ9roU1iTm_5ncnjWC2SUooY=',
    },
    {
      title: 'Resource Sharing',
      description: 'Share and access a wealth of learning resources, from articles to video courses.',
      image: 'https://media.istockphoto.com/id/1329214702/vector/brain-charging-concept.jpg?s=612x612&w=0&k=20&c=WBF-8uNOe-ohm5wYqGkGOwYmfZlNwcrzvYlJnbcg3e0=',
    },
  ];

  return (
    <section className="bg-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-background font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-background sm:text-4xl">
            Everything you need for successful mentorship
          </p>
        </div>
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature, index }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col md:flex-row items-center justify-between gap-12"
    >
      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <Image
          src={feature.image}
          alt={feature.title}
          width={600}
          height={400}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="text-2xl font-bold mb-4 text-background">{feature.title}</h3>
        <p className="text-lg text-background">{feature.description}</p>
      </div>
    </motion.div>
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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Our Users Say</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <p className="text-gray-900 font-semibold">{testimonial.author}</p>
            </motion.div>
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
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        <dl className="space-y-12">
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
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(229, 231, 235, 0.5)" : "transparent" }}
      className="border-b border-gray-200 pb-6"
    >
      <dt className="text-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-start text-left w-full text-gray-900 focus:outline-none"
        >
          <span className="font-medium text-xl">{question}</span>
          <span className="ml-6 flex-shrink-0">
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="h-6 w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </span>
        </button>
      </dt>
      <motion.dd
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 pr-12 overflow-hidden"
      >
        <p className="text-gray-600 text-lg">{answer}</p>
      </motion.dd>
    </motion.div>
  );
}

function CallToAction() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to start your mentorship journey?</span>
          <span className="block mt-2">Join MentorMatch today!</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-100">
          Whether you're looking to find a mentor or become one, MentorMatch is the perfect platform to connect, learn, and grow.
        </p>
        <a
          href="#"
          className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
}

