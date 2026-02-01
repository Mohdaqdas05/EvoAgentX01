import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuSection from '../components/MenuSection';
import ReservationSection from '../components/ReservationSection';
import { Users, Star, Award, ChefHat, MapPin, Phone, Mail, BarChart3, TrendingUp, Eye } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Authentic Indo-Chinese Cuisine
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Experience the perfect blend of traditional Chinese recipes with Indian spices. Every dish is crafted with passion and premium ingredients.
              </p>
              <div className="flex gap-4">
                <a
                  href="#reservations"
                  className="bg-yellow-400 text-red-700 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
                >
                  Book a Table
                </a>
                <a
                  href="#menu"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 transition"
                >
                  View Menu
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-6">🥡</div>
              <p className="text-2xl font-bold text-yellow-300">KGN Chinese Corner</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-gray-600 text-lg mb-4">
                KGN Chinese Corner is a modern restaurant specializing in authentic Indo-Chinese cuisine. Founded in 2020, we have been delighting customers with our unique blend of traditional Chinese flavors and Indian spices.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Our expert chefs trained in authentic Chinese culinary techniques bring you dishes that are not just delicious but also authentic in taste and presentation.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                  <p className="text-gray-600 text-sm">Happy Customers</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">80+</div>
                  <p className="text-gray-600 text-sm">Dishes</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">4.8★</div>
                  <p className="text-gray-600 text-sm">Rating</p>
                </div>
              </div>

              <a
                href="#reservations"
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Reserve Now
              </a>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ChefHat className="text-red-600" size={28} /> Chef's Vision
              </h3>
              <p className="text-gray-700 mb-4">
                "At KGN, we believe every meal tells a story. Our mission is to bring authentic Asian flavors to your table while maintaining the highest quality standards."
              </p>
              <p className="text-gray-700 mb-6">
                "We source only the finest ingredients and prepare each dish with meticulous attention to detail. Your satisfaction is our priority."
              </p>
              <p className="font-bold text-gray-900">- Chef Krishnan, Founder & Head Chef</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <MenuSection />

      {/* Chef Recommendations */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Chef's Specials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dragon Chicken', desc: 'Crispy chicken in spicy dragon sauce', price: '$12.99' },
              { name: 'Paneer Hakka Noodles', desc: 'Cottage cheese with Indo-Chinese noodles', price: '$10.99' },
              { name: 'Schezwan Fried Rice', desc: 'Spiced fried rice with seasonal vegetables', price: '$9.99' },
            ].map((dish, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                <p className="text-gray-300 mb-4">{dish.desc}</p>
                <p className="text-2xl font-bold text-yellow-400">{dish.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Raj Kumar',
                text: 'Absolutely amazing food! The flavors are authentic and the service is impeccable.',
                rating: 5,
              },
              {
                name: 'Priya Singh',
                text: 'My favorite place to eat in the city. The ambiance is great and staff is very welcoming.',
                rating: 5,
              },
              {
                name: 'Ahmed Hassan',
                text: 'Best Indo-Chinese food I have ever had. Highly recommended for family dinners.',
                rating: 5,
              },
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <p className="font-bold text-gray-900">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <ReservationSection />

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Do you accommodate dietary requirements?', a: 'Yes! We offer vegan, vegetarian, gluten-free, and dairy-free options.' },
              { q: 'Is parking available?', a: 'Yes, we have a large parking lot available for our customers.' },
              { q: 'Can I book a private event?', a: 'Absolutely! Contact us for bulk bookings and private event arrangements.' },
              { q: 'What are your opening hours?', a: 'Mon-Thu: 11 AM - 10 PM, Fri-Sat: 11 AM - 11 PM, Sun: 12 PM - 10 PM' },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <MapPin className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-600">123 Main Street, City, State 12345</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Phone className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Mail className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-600">info@kgnrestaurant.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
