import React from 'react';

export default function AnimatedText({ text, className = '' }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-400"
          style={{ transitionDelay: `${index * 25}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
