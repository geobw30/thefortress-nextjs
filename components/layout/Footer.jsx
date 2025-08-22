import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="fade-in">
            <h3 className="text-xl font-bold mb-4">
              The <span style={{ color: "#b02a37" }}>Fortress</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Transforming Lives by the Power of Love.
            </p>
            <div className="flex items-center">
              <a
                href="https://www.youtube.com/watch?v=A2MUlGarXtI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <div className="fade-in">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/impact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div className="fade-in">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-400">
              <p className="mb-4">Email: thefortresswop2019@gmail.com</p>
              <p className="mb-4">Phone: +256 772 97403</p>

              <form
                action="mailto:thefortresswop2019@gmail.com"
                method="post"
                encType="text/plain"
                className="mt-6 space-y-4"
              >
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="body"
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} The Fortress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
