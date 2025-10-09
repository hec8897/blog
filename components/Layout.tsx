import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-gray-600 transition-colors">
            Dawoon&apos;s blog
          </Link>
          <nav className="mt-4 flex gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors">
              home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors">
              portfolio
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2025 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
