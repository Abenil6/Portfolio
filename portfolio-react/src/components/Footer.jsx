import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

function Footer() {
  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/abenezer74807', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abenezer-aschalew-ab17ab261/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Abenil6', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/_whosabeni/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold text-white">
              Portfolio
            </a>
            <p className="mt-2 text-gray-400">© 2025 Abenezer Aschalew. All rights reserved.</p>
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-300"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
