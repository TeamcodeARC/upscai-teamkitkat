import React from 'react';
import { Brain, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl">UPSC AI</span>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-gray-600">Built with ❤️ by Team KitKat</p>
            <p className="text-sm text-gray-500">© 2024 UPSC AI. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/team-kitkat/upsc-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}