"use client";

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkDisclaimer = () => {
      const acceptedAt = localStorage.getItem('disclaimerAcceptedAt');
      
      if (acceptedAt) {
        const timeDiff = Date.now() - parseInt(acceptedAt);
        // 30 minutes in milliseconds = 30 * 60 * 1000 = 1800000
        if (timeDiff < 1800000) {
          return;
        }
      }
      
      setIsOpen(true);
    };

    checkDisclaimer();
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimerAcceptedAt', Date.now().toString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-full">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Disclaimer</h2>
            <p className="text-xs text-gray-500">Please read carefully before proceeding</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="space-y-4 text-gray-600 text-sm md:text-[15px] leading-relaxed text-justify">
            <p>
              <span className="font-medium text-gray-900">As per the regulations prescribed by the Institute of Chartered Accountants of India</span>, Chartered Accountant firms are strictly prohibited from advertising or soliciting professional work in the public domain.
            </p>
            <p>
              Accordingly, this website has been created solely to provide general information about the firm and its professional activities, and not for the purpose of solicitation or promotion. <span className="font-medium text-gray-900">Asija and Associates LLP</span> does not intend to seek or solicit clients through any content published on this website.
            </p>
            <p>
              Furthermore, the firm shall not be held responsible for any actions taken or decisions made by individuals based on the information presented herein.
            </p>
          </div>

          {/* Footer / Action */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 text-center sm:text-left">
              By clicking "I Agree", you acknowledge that you have read and understood this disclaimer.
            </p>
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-2.5 rounded-lg font-medium transition-all transform active:scale-95 shadow-lg shadow-gray-900/20 text-sm"
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
