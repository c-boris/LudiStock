import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section id="footer" className="bg-light dark:bg-dark py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-center flex-col gap-y-4">
          <div className="flex items-center justify-center gap-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-dprimary hover:text-accent dark:hover:text-accent"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-dprimary hover:text-accent dark:hover:text-accent"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-dprimary hover:text-accent dark:hover:text-accent"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
          <Link
            to="/terms-and-conditions"
            className="px-3 hover:underline text-secondary dark:text-dsecondary"
          >
            Terms and Conditions
          </Link>
          <p className="text-secondary dark:text-dsecondary">
            © 2023 LudiStock | All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
