export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="https://asili.immo/?utm_source=guide&utm_medium=internal&utm_campaign=back_to_main" className="flex items-center">
          <img
            src="/logo-asili.png"
            alt="Asili"
            className="h-10 w-auto"
          />
        </a>
        <a
          href="https://asili.immo/?utm_source=guide&utm_medium=internal&utm_campaign=back_to_main"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
          asili.immo &rarr;
        </a>
      </div>
    </header>
  );
}
