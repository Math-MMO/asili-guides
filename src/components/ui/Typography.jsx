export const H1 = ({ children }) => (
  <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-gray-900">{children}</h1>
);

export const H2 = ({ children }) => (
  <h2 className="font-serif text-xl font-bold mt-8 mb-3 text-gray-900 border-b border-gray-100 pb-2">{children}</h2>
);

export const H3 = ({ children }) => (
  <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">{children}</h3>
);

export const Body = ({ children }) => (
  <p className="text-gray-700 leading-8 mb-5 text-[17px]">{children}</p>
);
