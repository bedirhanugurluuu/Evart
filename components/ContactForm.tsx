'use client';

export default function ContactForm() {
  return (
    <section className="pb-16 pt-16 lg:pt-32">
      <div className="container-custom">
        <div className="grid items-end grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sol Taraf */}
          <div className="flex flex-col justify-center">
            <h2 className="font-gotham-bold uppercase text-2xl md:text-3xl" style={{ color: "#414042" }}>
              yaşam hayaliniz
            </h2>
            <p className="font-questa-regular text-3xl md:text-4xl mb-6" style={{ color: "#869e9e" }}>
              bir mesaj uzağınızda...
            </p>
            
            <p className="font-gotham-book text-base md:text-xl mb-8 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
                Evart projeleriyle ilgili tüm detaylara <br></br>ulaşmak ve satış ekibimizden destek<br></br>
                almak için bizimle iletişim kurun.
            </p>

            {/* İletişim Bilgileri */}
            <div className="space-y-2">
              {/* Adres */}
              <div className="flex items-center gap-2">
                <svg 
                  className="w-6 h-6 flex-shrink-0 transition-all duration-300 cursor-pointer" 
                  style={{ 
                    color: "#869e9e",
                    border: "1px solid #869e9e",
                    borderRadius: "100%",
                    padding: "2px",
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#869e9e";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#869e9e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#869e9e";
                    e.currentTarget.style.borderColor = "#869e9e";
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-gotham-book text-sm" style={{ color: "#414042" }}>
                    Dirmil, İnönü Cd., 48400 Bodrum/Muğla
                  </p>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-center gap-2">
                <svg 
                  className="w-6 h-6 flex-shrink-0 transition-all duration-300 cursor-pointer" 
                  style={{ 
                    color: "#869e9e",
                    border: "1px solid #869e9e",
                    borderRadius: "100%",
                    padding: "2px",
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#869e9e";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#869e9e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#869e9e";
                    e.currentTarget.style.borderColor = "#869e9e";
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-gotham-book text-sm" style={{ color: "#414042" }}>
                    0532 510 12 31
                  </p>
                </div>
              </div>

              {/* Mail */}
              <div className="flex items-center gap-2">
                <svg 
                  className="w-6 h-6 flex-shrink-0 transition-all duration-300 cursor-pointer" 
                  style={{ 
                    color: "#869e9e",
                    border: "1px solid #869e9e",
                    borderRadius: "100%",
                    padding: "2px",
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#869e9e";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#869e9e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#869e9e";
                    e.currentTarget.style.borderColor = "#869e9e";
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                <p className="font-gotham-book text-sm" style={{ color: "#414042" }}>
                    info@evart.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Form */}
          <div>
            <form className="space-y-4">
              {/* Ad ve Soyad - Yan Yana */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full px-0 py-3 font-gotham-book font-medium text-base focus:outline-none bg-transparent"
                    style={{
                      border: "none",
                      borderBottom: "3px solid #869e9e",
                      color: "#414042",
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Soyadınız"
                    className="w-full px-0 py-3 font-gotham-book font-medium text-base focus:outline-none bg-transparent"
                    style={{
                      border: "none",
                      borderBottom: "3px solid #869e9e",
                      color: "#414042",
                    }}
                  />
                </div>
              </div>

              {/* Telefon ve Konu - Yan Yana */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    placeholder="Telefon"
                    className="w-full px-0 py-3 font-gotham-book font-medium text-base focus:outline-none bg-transparent"
                    style={{
                      border: "none",
                      borderBottom: "3px solid #869e9e",
                      color: "#414042",
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Konu"
                    className="w-full px-0 py-3 font-gotham-book font-medium text-base focus:outline-none bg-transparent"
                    style={{
                      border: "none",
                      borderBottom: "3px solid #869e9e",
                      color: "#414042",
                    }}
                  />
                </div>
              </div>

              {/* Mesaj - Full Alan */}
              <div>
                <textarea
                  placeholder="Bir mesaj yazın"
                  rows={4}
                  className="w-full px-0 py-3 font-gotham-book font-medium text-base resize-none focus:outline-none bg-transparent"
                  style={{
                    border: "none",
                    borderBottom: "3px solid #869e9e",
                    color: "#414042",
                  }}
                />
              </div>

              {/* Gönder Butonu */}
              <button
                type="button"
                className="inline-block font-gotham-bold text-white uppercase transition-all duration-300"
                style={{
                  backgroundColor: "#869e9e",
                  padding: "5px 10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6d8a8a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#869e9e";
                }}
              >
                gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

