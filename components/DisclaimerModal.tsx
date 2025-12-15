"use client";

import { useEffect, useState } from 'react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Disclaimer</h2>
          
          <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <p>
              As per the regulations prescribed by the Institute of Chartered Accountants of India, Chartered Accountant firms are strictly prohibited from advertising or soliciting professional work in the public domain.
            </p>
            <p>
              Accordingly, this website has been created solely to provide general information about the firm and its professional activities, and not for the purpose of solicitation or promotion. Asija and Associates does not intend to seek or solicit clients through any content published on this website.
            </p>
            <p>
              Furthermore, the firm shall not be held responsible for any actions taken or decisions made by individuals based on the information presented herein.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
