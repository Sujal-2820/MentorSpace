import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/about" className="text-base text-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/team" className="text-base text-foreground hover:text-primary">Team</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/blog" className="text-base text-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/guides" className="text-base text-foreground hover:text-primary">Guides</Link></li>
              <li><Link href="/faq" className="text-base text-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/privacy" className="text-base text-foreground hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="text-base text-foreground hover:text-primary">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/contact" className="text-base text-foreground hover:text-primary">Contact Us</Link></li>
              <li><a href="https://twitter.com" className="text-base text-foreground hover:text-primary">Twitter</a></li>
              <li><a href="https://linkedin.com" className="text-base text-foreground hover:text-primary">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-foreground">&copy; 2024 MentorSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}