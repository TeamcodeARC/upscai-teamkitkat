import React from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  loading, 
  icon, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors";
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : icon}
      {children}
    </button>
  );
}