'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    // For now we just simulate a send; replace with real API integration
    try {
      await new Promise((res) => setTimeout(res, 800));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-md bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-800">Message sent</h3>
        <p className="mt-2 text-sm text-green-700">Thanks — we&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again later.</p>
      )}
    </form>
  );
}
