'use client';

export default function Footer() {
  return (
    <>
      <footer className="py-16 md:py-32" style={{ backgroundColor: "#869e9e" }}>
        <div className="container-custom footer-container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            {/* Sol Taraf - Logo ve İletişim */}
            <div className="space-y-4">
              {/* Logo */}
              <div className="mb-6">
                <img src="/logo.png" alt="Evart Logo" className="h-15 w-auto brightness-0 invert" loading="eager" />
              </div>

              {/* Sabit Hat */}
              <div className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: "white" }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="font-gotham-book text-sm text-white">444 0 456</p>
              </div>

              {/* Telefon */}
              <div className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: "white" }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="font-gotham-book text-sm text-white">0532 510 12 31</p>
              </div>

              {/* Adres */}
              <div className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5 mt-1 flex-shrink-0" 
                  style={{ color: "white" }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-gotham-book text-sm text-white">
                  İlkbahar Mahallesi, Galip Erdem Caddesi,<br></br>
                  Güney Park Evleri Karşısı,<br></br>
                  06550 Çankaya / Ankara
                </p>
              </div>
            </div>

            {/* Orta Taraf - Menü */}
            <div className="flex flex-col space-y-3 border-t border-white/20 pt-4 md:border-none md:pt-0">
              <a href="#" className="font-gotham-book text-lg lg:text-2xl text-white hover:opacity-80 transition-opacity">
                ANASAYFA
              </a>
              <a href="#" className="font-gotham-book text-lg lg:text-2xl text-white hover:opacity-80 transition-opacity">
                HAKKIMIZDA
              </a>
              <a href="#" className="font-gotham-book text-lg lg:text-2xl text-white hover:opacity-80 transition-opacity">
                EVART ORAN
              </a>
              <a href="#" className="font-gotham-book text-lg lg:text-2xl text-white hover:opacity-80 transition-opacity">
                EVART YALIKAVAK
              </a>
              <a href="#" className="font-gotham-book text-lg lg:text-2xl text-white hover:opacity-80 transition-opacity">
                İLETİŞİM
              </a>
            </div>

              {/* Sağ Taraf - Mail Form */}
              <div className="border-t border-white/20 pt-4 md:border-none md:pt-0">
                <p className="font-gotham-bold text-3xl text-white mb-3">MAİL</p>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="E-MAIL"
                    className="w-48 px-0 py-2 font-gotham-book text-sm focus:outline-none bg-transparent border-b-2 border-white"
                    style={{
                      color: "white",
                    }}
                  />
                <button
                  type="button"
                  className="flex-shrink-0"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transform: "rotate(45deg)",
                  }}
                >
                  <svg 
                    className="w-6 h-6" 
                    style={{ color: "white" }} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="w-full py-4 text-center" style={{ backgroundColor: "#869e9e" }}>
        <p className="font-gotham-book text-xs text-white opacity-80">
          © {new Date().getFullYear()} Evart. Tüm hakları saklıdır.
        </p>
      </div>
    </>
  );
}
