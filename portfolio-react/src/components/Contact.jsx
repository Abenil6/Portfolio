import { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, Send } from 'lucide-react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({
        type: 'success',
        message: `Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you soon.`,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'abenilee740@gmail.com',
      href: 'mailto:abenilee740@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+251944167574',
      href: 'tel:+251944167574',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Addis Ababa, Ethiopia',
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/abenezer74807', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abenezer-aschalew-ab17ab261/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Abenil6', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/_whosabeni/', label: 'Instagram' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-500 text-white p-12">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8">
                Feel free to reach out to me for any questions or opportunities. I'll get back to you as soon as possible.
              </p>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-blue-400 p-3 rounded-full mr-4">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.title}</h4>
                      {info.href ? (
                        <a href={info.href} className="hover:underline">
                          {info.value}
                        </a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-400 hover:bg-blue-600 text-white p-3 rounded-full transition duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                {status.message && (
                  <div
                    className={`p-4 rounded-lg ${
                      status.type === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
