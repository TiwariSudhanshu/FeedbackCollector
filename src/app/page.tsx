'use client';

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/feedback', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      setStatus(data.status);
      setForm({
        name: "",
        email: "",
        message: "",
      });
      router.refresh();
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-gray-700">
        <button className="px-4 py-2 absolute right-5 top-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition duration-300"
        onClick={()=> { router.push('/feedbacks')}}>All Feedbacks</button>
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-purple-400 font-semibold mb-1">Contact Us</div>
            <h1 className="text-2xl font-bold text-white mb-6">We'd love to hear from you</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input 
                  id="name"
                  name="name" 
                  type="text"
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Your name" 
                  required 
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                  id="email"
                  name="email" 
                  type="email"
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="your.email@example.com" 
                  required 
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  placeholder="Your message" 
                  required 
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 resize-none text-white placeholder-gray-400"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition duration-150 disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
            
            {status && (
              <div className={`mt-4 p-4 rounded-md ${status.includes('success') ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-red-900 text-red-300 border border-red-700'}`}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}