import React from "react";
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function TopContactBar() {
  return (
    <div className="bg-[#0a1f44] text-white text-xs md:text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <a href="tel:+971582012073" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <PhoneIcon className="h-4 w-4" />
            <span className="font-medium">+971 58 201 2073</span>
          </a>
          <a href="mailto:sales@saamcabins.com" className="hidden md:flex items-center gap-2 hover:text-gray-300 transition-colors">
            <EnvelopeIcon className="h-4 w-4" />
            <span>sales@saamcabins.com</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>Saturday - Thursday: 9:00 - 19:00 / Closed on Weekends</span>
        </div>
      </div>
    </div>
  );
}
