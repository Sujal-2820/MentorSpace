import Image from 'next/image';
import SujalSoni from '../../../public/projectImages/Sujal-Soni1.jpg';
import mentorspacebanner from '../../../public/projectImages/logo.png';
import Link from 'next/link';


export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
    <div className="container mx-auto px-4 py-16">
    <Link href="/" className="inline-block mb-8 px-4 py-2 bg-white bg-opacity-10 text-sm font-medium text-white rounded-md transition-all duration-200 hover:bg-opacity-20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
          ← Back to Home
    </Link>
      <h1 className="text-4xl font-bold mb-12 text-center">About MentorSpace</h1>
      
      <div className="mb-16">
        <p className="text-lg mb-8">
          "MentorSpace" is a mentorship matching platform where users can create an account, set up a profile as a mentor or mentee, specify their skills or areas of interest, and find matches with others for mentorship opportunities.
        </p>
        <Image
          src={mentorspacebanner}
          alt="MentorSpace Banner"
          width={400}
          height={200}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Personalized Dashboard: Based on profile information, mentors and mentees receive personalized dashboards.</li>
          <li>Onboarding: Following the signup process, mentors and mentees access dedicated onboarding pages to submit their profile information and set their profile images.</li>
          <li>Showcasing potential mentors to mentees: Mentees can view mentor profiles and Make Connection Requests.</li>
          <li>Filtering: Mentees can filter mentors based on parameters such as Expertise, Availability, Rating.</li>
          <li>Establishing Sessions: Mentors can schedule sessions for connected mentees on selected dates and times, providing links to meetings.</li>
          <li>Sharing Resources: Mentees can request resources from connected mentors, who can then share the requested materials.</li>
          <li>Dynamic Updates: All mentor and mentee activities are saved in Supabase SQL relations and storage, with updates dynamically reflected on dashboards.</li>
          <li>Feedback System: Mentees can provide feedback to mentors after sessions or appointments, which mentors can view on the Analytics page for personal improvement.</li>
        </ul>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Tech Stack</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Frontend: Next.js - A React framework for building fast, scalable web applications.</li>
          <li>Backend & Database: Supabase and PostgreSQL - PostgreSQL database for real-time data storage and retrieval.</li>
          <li>Authentication: Supabase Authentication - Signup and Signin using supabase Authentication.</li>
          <li>Styling and Responsiveness: Tailwind CSS - For dynamic styling and implementing responsiveness of pages across different views (Laptop, Tablet, Smartphone).</li>
        </ul>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">About the Developer</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/3">
            <Image
              src={SujalSoni}
              alt="Sujal Soni"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-4">
              Sujal Soni is a highly motivated and skilled final-year CSE student with a strong passion for full-stack web development. He possesses a comprehensive skillset, including expertise in JavaScript, React.js, Node.js, MongoDB, Next.js, and Firebase. His practical experience has been honed through internships at Indo-Tech and NotesEra, where he developed and deployed web applications using the MERN stack.
            </p>
            <p className="text-lg mb-4">
              Sujal's projects demonstrate his ability to create innovative and impactful solutions. His Skill Path platform provides personalized learning experiences, while Event Sphere revolutionizes event registration and management. Help Geared, a centralized platform for discovering and donating to NGOs, showcases his commitment to using technology for social good.
            </p>
            <p className="text-lg mb-4">
              Beyond technical skills, Sujal actively engages in the open-source community. He has been recognized as an Open Source Mentor at GDSC, Medi-Caps University, and has achieved Hacktoberfest Contributor status. His leadership and teamwork abilities were demonstrated at the Parul Hacks hackathon, where his team's AI-powered hiring solution reached the top 10.
            </p>
            <p className="text-lg">
              With his strong technical foundation, dedication to innovation, and collaborative spirit, Sujal is poised to make significant contributions to the field of web development.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-lg mb-2">Reach out to the developer Sujal Soni:</p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Email: <a href="mailto:sujal28soni@gmail.com" className="text-blue-400 hover:underline">sujal28soni@gmail.com</a></li>
          <li>GitHub: <Link href="https://github.com/Sujal-2820" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://github.com/Sujal-2820</Link></li>
          <li>LinkedIn: <Link href="https://www.linkedin.com/in/sujal-soni/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.linkedin.com/in/sujal-soni/</Link></li>
        </ul>
      </div>
    </div>
  </div>
  );
}

