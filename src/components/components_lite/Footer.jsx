import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 sm:mt-12 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto text-center px-4 py-6 sm:py-8 space-y-2 text-sm text-slate-600">
        <p>© All rights reserved.</p>
        <p>
          Powered by{" "}
          <a href="https://github.com/milind7agarwal" className="text-blue-600 hover:underline font-medium">
            Milind Agrawal
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
          <span className="cursor-pointer hover:text-slate-900">Privacy Policy</span>
          <span className="cursor-pointer hover:text-slate-900">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
