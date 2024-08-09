import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primaryBg text-white py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-white mb-4">
              We provide reliable and trusted doctor appointment services to ensure your health is always in good hands.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com" passHref>
                <div className="text-white hover:text-white cursor-pointer">
                  <FaFacebook size={24} />
                </div>
              </Link>
              <Link href="https://www.twitter.com" passHref>
                <div className="text-white hover:text-white cursor-pointer">
                  <FaTwitter size={24} />
                </div>
              </Link>
              <Link href="https://www.instagram.com" passHref>
                <div className="text-white hover:text-white cursor-pointer">
                  <FaInstagram size={24} />
                </div>
              </Link>
              <Link href="https://www.linkedin.com" passHref>
                <div className="text-white hover:text-white cursor-pointer">
                  <FaLinkedin size={24} />
                </div>
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link href="/">
                  <span className="text-white hover:text-white cursor-pointer">Home</span>
                </Link>
              </li>
              
              <li className="mb-2">
                <Link href="/doctors">
                  <span className="text-white hover:text-white cursor-pointer">Doctors</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms-and-conditions">
                  <span className="text-white hover:text-white cursor-pointer">Terms & conditions</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/privacy-policy">
                  <span className="text-white hover:text-white cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about">
                  <span className="text-white hover:text-white cursor-pointer">About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-white mb-2">Phone: +123 456 7890</p>
            <p className="text-white mb-2">Email: info@doctorappointment.com</p>
            <p className="text-white">Address: 123 Main Street, Dhaka, Bangladesh</p>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[40px] font-semibold mb-4">DocCare</h3>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-white">&copy; 2024 Doctor Appointment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
