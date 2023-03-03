'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FormEvent, useRef } from 'react';

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = inputRef.current?.value;
    if (!input) return;

    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }

    try {
      // Call out API to activate the scraper
      const response = await fetch('/activateScraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: input }),
      });
    } catch (error) {
      // Handle any errors
    }

    // Wait for the response to come back
  };

  return (
    <header>
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-100 max-w-md mx-auto"
      >
        <input
          ref={inputRef}
          className="flex-1 outline-none bg-transparent text-indigo-400 placeholder:text-indigo-300"
          type="text"
          placeholder="Search..."
        />
        <button hidden>Search</button>
        <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300" />
      </form>
    </header>
  );
};

export default Header;
