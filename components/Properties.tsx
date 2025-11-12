export default function Properties() {
  const properties = [
    {
      id: 1,
      title: "Modern Daire - Kadıköy",
      location: "İstanbul, Kadıköy",
      price: "8.500.000 ₺",
      area: "120 m²",
      rooms: "3+1",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Lüks Villa - Bebek",
      location: "İstanbul, Bebek",
      price: "25.000.000 ₺",
      area: "350 m²",
      rooms: "5+2",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Şık Daire - Nişantaşı",
      location: "İstanbul, Nişantaşı",
      price: "12.000.000 ₺",
      area: "150 m²",
      rooms: "4+1",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Geniş Daire - Ataşehir",
      location: "İstanbul, Ataşehir",
      price: "6.500.000 ₺",
      area: "110 m²",
      rooms: "3+1",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Penthouse - Levent",
      location: "İstanbul, Levent",
      price: "18.000.000 ₺",
      area: "280 m²",
      rooms: "4+2",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Modern Daire - Beşiktaş",
      location: "İstanbul, Beşiktaş",
      price: "9.500.000 ₺",
      area: "130 m²",
      rooms: "3+1",
      image: "https://images.unsplash.com/photo-1600585154526-990dbe4eb0f3?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Öne Çıkan İlanlar
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Size özel seçilmiş premium gayrimenkul seçenekleri
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Yeni
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.title}
                </h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary-600 font-bold text-xl">
                    {property.price}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.area}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.rooms}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition font-semibold">
                  Detayları Gör
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-lg">
            Tüm İlanları Gör
          </button>
        </div>
      </div>
    </section>
  );
}

