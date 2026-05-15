import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-surface-container-lowest border-t border-white/10 pt-20 pb-12 px-container-margin-mobile md:px-container-margin-desktop relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid: Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-16">
            <div className="mb-6">
              <span className="text-[32px] font-medium leading-[1.2] tracking-[-0.01em] text-white">
                Voxora
              </span>
            </div>

            <p className="text-[16px] leading-[1.6] text-on-surface-variant max-w-xs">
              The voice of the future. Experience an ethereal connection with
              next-generation atmospheric intelligence.
            </p>

            <div className="mt-8">
              <Link
                href="/dashboard/hub"
                className="inline-flex px-6 py-3 bg-surface-container border border-white/10 rounded-full text-[13px] font-medium tracking-[0.05em] text-primary hover:border-primary/50 transition-all duration-300 items-center gap-2 group"
                aria-label="Join the Voxora Beta"
              >
                Join the Beta
                <span
                  className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <nav aria-label="Product">
            <div className="flex flex-col gap-5">
              <h3 className="text-[13px] font-medium uppercase tracking-widest text-white/90">
                Product
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/features"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/integrations"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/api"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Resources Links */}
          <nav aria-label="Resources">
            <div className="flex flex-col gap-5">
              <h3 className="text-[13px] font-medium uppercase tracking-widest text-white/90">
                Resources
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/docs"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/help"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/community"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Company Links */}
          <nav aria-label="Company">
            <div className="flex flex-col gap-5">
              <h3 className="text-[13px] font-medium uppercase tracking-widest text-white/90">
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/careers"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[13px] font-medium tracking-[0.05em] text-on-surface-variant hover:text-primary transition-colors duration-200"
                    href="/privacy"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="order-2 md:order-1">
            <p className="text-[13px] font-medium tracking-[0.05em] text-outline">
              &copy; {currentYear} Voxora Labs Inc. All rights reserved.
            </p>
          </div>

          <nav
            className="flex items-center gap-6 order-1 md:order-2"
            aria-label="Social media links"
          >
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
              href="https://x.com/_Rahul_vyas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter (X)"
            >
              <span className="text-[20px]" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#ffffff"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.292 19.49h2.04L6.486 3.24H4.298l13.31 17.403Z" />
                </svg>
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
              href="https://www.linkedin.com/in/rahul-vyas-a60b83370/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on LinkedIn"
            >
              <span className="text-[20px]" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#ffffff"
                >
                  <path d="M4.983 3.5C4.983 4.604 4.104 5.5 3 5.5S1.017 4.604 1.017 3.5 1.896 1.5 3 1.5s1.983.896 1.983 2ZM1.5 8h3V22h-3V8Zm7 0h2.877v1.91h.041c.401-.761 1.381-1.563 2.844-1.563 3.041 0 3.602 2.002 3.602 4.604V22h-3v-7.104c0-1.694-.03-3.875-2.362-3.875-2.364 0-2.726 1.846-2.726 3.75V22h-3V8Z" />
                </svg>
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none"
              href="https://github.com/rahul-vyas-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our GitHub repository"
            >
              <span className="text-[20px]" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-white"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.37-1.344-3.37-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
                </svg>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
