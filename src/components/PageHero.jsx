export default function PageHero({ title, subtitle, description }) {
  return (
    <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {subtitle && (
          <p className="text-amber-100 text-sm font-medium mb-2">{subtitle}</p>
        )}
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-amber-50 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
