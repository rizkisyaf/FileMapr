import Link from 'next/link'
import Image from 'next/image'
import { CloudIcon, Box, HardDriveIcon, ArrowRight, CheckCircle, Eye, FileText} from 'lucide-react'
import BlogList from '../components/BlogList'

export default function Home() {
  const trackCTA = (ctaName: string) => {
    // Google Analytics tracking code
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        'event_category': 'CTA',
        'event_label': ctaName,
      })
    }
  }

  return (
    <div className="bg-[#F9F7E4] text-[#122D4F]">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">FileMapr</Link>
          <div className="space-x-4">
            <Link href="#features" className="hover:underline">Features</Link>
            <Link href="#demo" className="hover:underline">Demo</Link>
            <Link href="#pricing" className="hover:underline">Pricing</Link>
            <Link href="#faq" className="hover:underline">FAQ</Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Visualize and Optimize Your File Structure</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">FileMapr helps you visualize your cloud storage files and suggests optimal file structures and naming conventions, boosting your productivity in file management.</p>
          <button 
            onClick={() => trackCTA('hero-get-started')}
            className="bg-[#122D4F] text-[#F9F7E4] hover:bg-[#1e3a6d] text-lg px-8 py-3"
          >
            Try It Free <ArrowRight className="ml-2" />
          </button>
        </section>

        <section className="bg-[#122D4F] text-[#F9F7E4] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Seamlessly Integrate with Your Cloud Storage</h2>
            <div className="flex justify-center space-x-12 mb-12">
              <div className="text-center">
                <CloudIcon className="h-20 w-20 text-[#F9F7E4] mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Google Drive</h3>
              </div>
              <div className="text-center">
                <Box className="h-20 w-20 text-[#F9F7E4] mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Dropbox</h3>
              </div>
              <div className="text-center">
                <HardDriveIcon className="h-20 w-20 text-[#F9F7E4] mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Terabox</h3>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => trackCTA('integrate-now')}
                className="bg-[#F9F7E4] text-[#122D4F] hover:bg-[#e9e7d4] text-lg px-8 py-3"
              >
                Start Integrating Now
              </button>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Powerful File Visualization and Optimization Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <Eye className="text-[#122D4F] mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive File Structure Visualization</h3>
                <p>View your file structure as an intuitive tree map or list, making it easy to understand your file organization at a glance.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="text-[#122D4F] mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Naming Suggestions</h3>
                <p>Receive intelligent suggestions for file and folder names to improve consistency and searchability.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-[#122D4F] mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Structure Optimization</h3>
                <p>Get recommendations on how to optimize your file structure for better organization and efficiency.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CloudIcon className="text-[#122D4F] mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Multi-Cloud Support</h3>
                <p>Analyze and optimize file structures across multiple cloud storage platforms from a single interface.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => trackCTA('explore-features')}
              className="bg-[#122D4F] text-[#F9F7E4] hover:bg-[#1e3a6d] text-lg px-8 py-3"
            >
              Explore All Features
            </button>
          </div>
        </section>

        <section id="demo" className="bg-[#122D4F] text-[#F9F7E4] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">See FileMapr in Action</h2>
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <Image 
                src="/placeholder.svg" 
                alt="FileMapr Demo Video" 
                width={1280} 
                height={720} 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center">
              <button 
                onClick={() => trackCTA('watch-demo')}
                className="bg-[#F9F7E4] text-[#122D4F] hover:bg-[#e9e7d4] text-lg px-8 py-3"
              >
                Watch Full Demo
              </button>
            </div>
          </div>
        </section>

        <section id="pricing" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Simple, One-Time Pricing</h2>
          <div className="max-w-md mx-auto border border-[#122D4F] rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Lifetime Access</h3>
            <p className="text-5xl font-bold mb-6">$35</p>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="text-[#122D4F] mr-2 h-5 w-5" />
                Full access to all features
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-[#122D4F] mr-2 h-5 w-5" />
                Unlimited file structure analysis
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-[#122D4F] mr-2 h-5 w-5" />
                Multi-cloud storage support
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-[#122D4F] mr-2 h-5 w-5" />
                Free updates for life
              </li>
            </ul>
            <button 
              onClick={() => trackCTA('buy-now')}
              className="bg-[#122D4F] text-[#F9F7E4] hover:bg-[#1e3a6d] w-full text-lg py-3"
            >
              Buy Now
            </button>
          </div>
          <p className="text-center mt-8 text-lg">
            Try it free with one Google Drive account before you buy!
          </p>
        </section>

        <section id="blog" className="bg-[#122D4F] text-[#F9F7E4] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Latest Insights on File Management</h2>
            <p className="text-xl text-center mb-8">
              Stay updated with the latest tips, strategies, and trends on file organization, cloud storage, and more to boost your productivity.
            </p>
            <BlogList /> {/* Insert the BlogList component here */}
            <div className="text-center mt-8">
              <Link href="/blog" className="bg-[#F9F7E4] text-[#122D4F] hover:bg-[#e9e7d4] text-lg px-8 py-3 rounded">
                View All Blog Posts <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#122D4F] text-[#F9F7E4] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  q: "How does FileMapr work?", 
                  a: "FileMapr connects to your cloud storage, analyzes your file structure, and provides visual representations and suggestions for optimization." 
                },
                { 
                  q: "Is my data safe?", 
                  a: "Yes, FileMapr only accesses file metadata and does not store any of your files or personal information." 
                },
                { 
                  q: "Can I use FileMapr with multiple cloud storage accounts?", 
                  a: "Yes, FileMapr supports multiple cloud storage platforms and accounts." 
                },
                { 
                  q: "Do I need to pay a subscription fee?", 
                  a: "No, FileMapr offers a one-time purchase for lifetime access. No recurring fees!" 
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-semibold">{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your File Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Try FileMapr for free with one Google Drive account and see the difference it can make in your file organization.</p>
          <button 
            onClick={() => trackCTA('final-cta')}
            className="bg-[#122D4F] text-[#F9F7E4] hover:bg-[#1e3a6d] text-lg px-8 py-3"
          >
            Start Your Free Trial <ArrowRight className="ml-2" />
          </button>
        </section>
      </main>

      <footer className="bg-[#122D4F] text-[#F9F7E4] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FileMapr</h3>
              <p>Visualize and optimize your file structure for better productivity.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="hover:underline">Features</Link></li>
                <li><Link href="#demo" className="hover:underline">Demo</Link></li>
                <li><Link href="#pricing" className="hover:underline">Pricing</Link></li>
                <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
                <li><a href="#" className="hover:underline">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#F9F7E4] text-center">
            <p>&copy; {new Date().getFullYear()} FileMapr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}