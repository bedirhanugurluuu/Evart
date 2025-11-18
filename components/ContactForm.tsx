'use client';

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";

interface ContactFormProps {
  projectName?: string;
  absoluteOverlay?: boolean;
}

export default function ContactForm({ projectName = "Evart", absoluteOverlay = false }: ContactFormProps) {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    subject: '',
    message: '',
    website: '', // Honeypot field - botlar için
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pageLoadTime = useRef<number>(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
    setIsDropdownOpen(false);
  };

  // Dropdown dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasyonu - subject kontrolü
    if (!formData.subject) {
      setSubmitStatus('error');
      setIsDropdownOpen(true); // Dropdown'u aç ki kullanıcı seçim yapsın
      return;
    }
    
    // Güvenlik Kontrolleri
    // 1. Honeypot kontrolü - eğer website alanı doldurulmuşsa bot'tur
    if (formData.website) {
      console.warn('Bot detected: honeypot field filled');
      setSubmitStatus('error');
      return;
    }

    // 2. Form gönderim zamanlaması kontrolü - çok hızlı gönderimleri engelle
    const timeSincePageLoad = Date.now() - pageLoadTime.current;
    const minimumTime = 2000; // 2 saniye minimum bekleme süresi
    
    if (timeSincePageLoad < minimumTime) {
      console.warn('Bot detected: form submitted too quickly');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          projectName,
          timestamp: Date.now(), // Rate limiting için
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          subject: '',
          message: '',
          website: '', // Honeypot'u da temizle
        });
        // Sayfa yükleme zamanını sıfırla (başarılı gönderimden sonra)
        pageLoadTime.current = Date.now();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        console.error('Form submission error:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={absoluteOverlay ? "relative z-20" : ""}>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${absoluteOverlay ? "md:gap-4" : ""} ${absoluteOverlay ? "bg-white p-4 md:p-5 lg:p-8 shadow-lg max-w-4xl mx-auto" : ""}`}>
          {/* Sol Taraf */}
          <div className="flex flex-col justify-center">
            <h2 className="font-gotham-bold uppercase text-xl md:text-2xl" style={{ color: "#414042" }}>
              {t('contactForm.title')}
            </h2>
            <p className="font-questa-regular text-2xl md:text-3xl mb-4" style={{ color: "#869e9e" }}>
              {t('contactForm.subtitle')}
            </p>

            <p className="font-gotham-book text-base mb-4 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
                {projectName === "Yalıkavak" ? (
                  <span dangerouslySetInnerHTML={{ __html: t('contactForm.descriptionYalikavak').replace(/<br>/g, '<br />').replace(/<b>/g, '<b style="font-weight: 500">') }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: t('contactForm.description').replace(/<br>/g, '<br />').replace(/<b>/g, '<b style="font-weight: 500">') }} />
                )}
            </p>

            {/* İletişim Bilgileri */}
            <div className="flex flex-col space-y-2">
              {/* Adres */}
              <div className="inline-flex items-center gap-2">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  style={{
                    color: "#869e9e",
                    border: "1px solid #869e9e",
                    borderRadius: "100%",
                    padding: "2px",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Dirmil,+İnönü+Cd.,+48400+Bodrum/Muğla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-gotham-book text-xs hover:opacity-70 transition-opacity"
                  style={{ color: "#414042" }}
                >
                  Dirmil, İnönü Cd., 48400 Bodrum/Muğla
                </a>
              </div>

              {/* Telefon */}
              <div className="inline-flex items-center gap-2">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  style={{
                    color: "#869e9e",
                    border: "1px solid #869e9e",
                    borderRadius: "100%",
                    padding: "2px",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:+905325101231"
                  className="font-gotham-book text-xs hover:opacity-70 transition-opacity"
                  style={{ color: "#414042" }}
                >
                  0532 510 12 31
                </a>
              </div>

              {/* Mail */}
              <div className="inline-flex items-center gap-2">
                <svg 
                  className="w-6 h-6 flex-shrink-0" 
                  style={{ 
                    color: "#869e9e",
                    border: "1px solid #869e9e",
                    borderRadius: "100%",
                    padding: "2px",
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:info@evart.com"
                  className="font-gotham-book text-xs hover:opacity-70 transition-opacity"
                  style={{ color: "#414042" }}
                >
                  info@evart.com
                </a>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot Field - Görünmez, botlar için */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              />
              {/* Ad ve Soyad - Yan Yana */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t('contactForm.firstName')}
                    required
                    className="w-full px-0 py-2 font-gotham-book font-medium text-sm focus:outline-none bg-transparent"
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
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t('contactForm.lastName')}
                    required
                    className="w-full px-0 py-2 font-gotham-book font-medium text-sm focus:outline-none bg-transparent"
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contactForm.phone')}
                    required
                    className="w-full px-0 py-2 font-gotham-book font-medium text-sm focus:outline-none bg-transparent"
                    style={{
                      border: "none",
                      borderBottom: "3px solid #869e9e",
                      color: "#414042",
                    }}
                  />
                </div>
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-0 py-2 font-gotham-book font-medium text-sm focus:outline-none bg-transparent cursor-pointer relative"
                    style={{
                      border: "none",
                      borderBottom: "3px solid #869e9e",
                      color: formData.subject ? "#414042" : "#869e9e",
                    }}
                  >
                    {formData.subject || t('contactForm.subjectPlaceholder')}
                    <svg
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      style={{ color: "#869e9e" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg border border-gray-200 mt-1"
                      style={{ borderTop: "none" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSubjectSelect(t('contactForm.subjectOptionOran'))}
                        className="w-full text-left px-4 py-3 font-gotham-book text-sm hover:bg-gray-50 transition-colors"
                        style={{ color: "#414042" }}
                      >
                        {t('contactForm.subjectOptionOran')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSubjectSelect(t('contactForm.subjectOptionYalikavak'))}
                        className="w-full text-left px-4 py-3 font-gotham-book text-sm hover:bg-gray-50 transition-colors border-t border-gray-200"
                        style={{ color: "#414042" }}
                      >
                        {t('contactForm.subjectOptionYalikavak')}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mesaj - Full Alan */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contactForm.message')}
                  rows={3}
                  required
                  className="w-full px-0 py-2 font-gotham-book font-medium text-sm resize-none focus:outline-none bg-transparent"
                  style={{
                    border: "none",
                    borderBottom: "3px solid #869e9e",
                    color: "#414042",
                  }}
                />
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-green-600 font-gotham-book text-sm">
                  {t('contactForm.success')}
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 font-gotham-book text-sm">
                  {t('contactForm.error')}
                </p>
              )}

              {/* Gönder Butonu */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block font-gotham-bold text-white uppercase text-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#869e9e",
                  padding: "5px 10px",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#6d8a8a";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#869e9e";
                }}
              >
                {isSubmitting ? t('contactForm.submitting') : t('contactForm.submit')}
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}

