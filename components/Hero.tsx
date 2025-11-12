export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hayalinizdeki Eve
            <br />
            <span className="text-primary-200">Kavuşun</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Binlerce seçenek arasından size en uygun gayrimenkulü bulun
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition shadow-lg">
              İlanları Keşfet
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition">
              İlan Ver
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

