interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[#1a4d6f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-3 max-w-2xl text-base text-gray-100">{subtitle}</p>
      </div>
    </section>
  );
}
