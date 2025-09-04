import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

const CheckoutWrapper = ({ children }) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    color: '#3a3a3b'
  }}>
    {children}
  </div>
);

const Container = ({ children }) => (
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {children}
  </div>
);

const MainCard = ({ children }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e5e5',
    width: '100%',
    maxWidth: '1000px',
    overflow: 'hidden'
  }}>
    {children}
  </div>
);

const Header = ({ children }) => (
  <div style={{
    backgroundColor: '#3a3a3b',
    padding: '48px 32px',
    color: 'white',
    textAlign: 'center',
    borderBottom: '1px solid #e5e5e5'
  }}>
    {children}
  </div>
);

const HeaderTitle = ({ children }) => (
  <h1 style={{
    fontSize: '28px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px'
  }}>
    {children}
  </h1>
);

const HeaderSubtitle = ({ children }) => (
  <p style={{
    fontSize: '15px',
    opacity: '0.85',
    margin: 0,
    fontWeight: '400'
  }}>
    {children}
  </p>
);

const Content = ({ children }) => (
  <div style={{
    padding: '40px 32px'
  }}>
    {children}
  </div>
);

const PlanHeader = ({ children }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef'
  }}>
    {children}
  </div>
);

const PlanInfo = ({ children }) => (
  <div>
    {children}
  </div>
);

const PlanTitle = ({ children, ...props }) => (
  <h2 style={{
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#3a3a3b'
  }} {...props}>
    {children}
  </h2>
);

const PlanDescription = ({ children, ...props }) => (
  <div style={{
    color: '#6c757d',
    fontSize: '14px',
    fontWeight: '400'
  }} {...props}>
    {children}
  </div>
);

const PlanPricing = ({ children }) => (
  <div style={{
    textAlign: 'right'
  }}>
    {children}
  </div>
);

const PriceDisplay = ({ children, ...props }) => (
  <div style={{
    fontSize: '24px',
    fontWeight: '700',
    color: '#3a3a3b',
    marginBottom: '4px'
  }} {...props}>
    {children}
  </div>
);

const PriceInterval = ({ children, ...props }) => (
  <div style={{
    color: '#6c757d',
    fontSize: '13px',
    fontWeight: '400'
  }} {...props}>
    {children}
  </div>
);

const MainContent = ({ children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '40px',
    alignItems: 'start'
  }}>
    {children}
  </div>
);

const FormSection = ({ children }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    border: '1px solid #e9ecef'
  }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 style={{
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#3a3a3b',
    borderBottom: '2px solid #3a3a3b',
    paddingBottom: '8px',
    display: 'inline-block'
  }}>
    {children}
  </h3>
);

const PlanFeatures = ({ children, ...props }) => (
  <ul style={{
    listStyle: 'none',
    margin: '0 0 32px 0',
    padding: 0
  }} {...props}>
    {children}
  </ul>
);

const FeatureItem = ({ children }) => (
  <li style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #f1f3f4',
    fontSize: '14px',
    fontWeight: '400',
    color: '#3a3a3b'
  }}>
    <div style={{
      width: '6px',
      height: '6px',
      backgroundColor: '#3a3a3b',
      borderRadius: '50%',
      flexShrink: 0
    }} />
    {children}
  </li>
);

const FormGroup = ({ children }) => (
  <div style={{
    marginBottom: '20px'
  }}>
    {children}
  </div>
);

const Label = ({ children, ...props }) => (
  <label style={{
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#3a3a3b',
    marginBottom: '8px'
  }} {...props}>
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input style={{
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '400',
    transition: 'all 0.2s ease',
    backgroundColor: 'white',
    outline: 'none'
  }}
    onFocus={(e) => {
      e.target.style.borderColor = '#3a3a3b';
      e.target.style.boxShadow = '0 0 0 3px rgba(58, 58, 59, 0.1)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = '#dee2e6';
      e.target.style.boxShadow = 'none';
    }}
    {...props} />
);

const FieldRow = ({ children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 140px',
    gap: '16px'
  }}>
    {children}
  </div>
);

const PrimaryButton = ({ children, ...props }) => (
  <button style={{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#3a3a3b',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '24px'
  }}
    onMouseEnter={(e) => {
      if (!e.target.disabled) {
        e.target.style.backgroundColor = '#2d2d2e';
        e.target.style.transform = 'translateY(-1px)';
      }
    }}
    onMouseLeave={(e) => {
      if (!e.target.disabled) {
        e.target.style.backgroundColor = '#3a3a3b';
        e.target.style.transform = 'translateY(0)';
      }
    }}
    {...props}>
    {children}
  </button>
);

const CheckoutSummary = ({ children }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    border: '1px solid #e9ecef',
    position: 'sticky',
    top: '40px'
  }}>
    {children}
  </div>
);

const SummaryHeader = ({ children }) => (
  <h3 style={{
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#3a3a3b',
    textAlign: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid #e9ecef'
  }}>
    {children}
  </h3>
);

const SummaryItem = ({ children }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #f8f9fa',
    fontSize: '14px',
    fontWeight: '400'
  }}>
    {children}
  </div>
);

const SummaryTotal = ({ children }) => (
  <div style={{
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid #3a3a3b'
  }}>
    {children}
  </div>
);

const TotalLabel = ({ children }) => (
  <div style={{
    fontSize: '13px',
    color: '#6c757d',
    marginBottom: '8px',
    fontWeight: '400'
  }}>
    {children}
  </div>
);

const TotalPrice = ({ children }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: '700',
    color: '#3a3a3b'
  }}>
    {children}
  </div>
);

const PaymentStatus = ({ visible, type, msg }) => {
  if (!visible) return null;

  const getStatusStyle = () => {
    const baseStyle = {
      marginTop: '16px',
      padding: '12px 16px',
      borderRadius: '6px',
      fontSize: '13px',
      fontWeight: '500',
      textAlign: 'center',
      border: '1px solid'
    };

    switch (type) {
      case 'loading':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(58, 58, 59, 0.05)',
          color: '#3a3a3b',
          borderColor: 'rgba(58, 58, 59, 0.2)'
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(34, 197, 94, 0.05)',
          color: '#16a34a',
          borderColor: 'rgba(34, 197, 94, 0.2)'
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
          color: '#dc2626',
          borderColor: 'rgba(239, 68, 68, 0.2)'
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={getStatusStyle()}>
      {msg}
    </div>
  );
};

const SecurityBadge = ({ children }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '20px',
    padding: '12px',
    backgroundColor: 'rgba(58, 58, 59, 0.05)',
    borderRadius: '6px',
    color: '#3a3a3b',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid rgba(58, 58, 59, 0.1)'
  }}>
    <div style={{
      width: '12px',
      height: '12px',
      backgroundColor: '#3a3a3b',
      borderRadius: '2px'
    }} />
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '48rem',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#6c757d',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const ContractFooter = ({ onTermsClick, onContractClick }) => (
  <div style={{
    padding: '20px',
    textAlign: 'center',
    borderTop: '1px solid #e9ecef'
  }}>
    <button
      type="button"
      onClick={onTermsClick}
      style={{
        background: 'none',
        border: 'none',
        color: '#3a3a3b',
        textDecoration: 'underline',
        cursor: 'pointer',
        marginRight: '16px',
        fontSize: '14px'
      }}
    >
      Ön Bilgilendirme Koşulları
    </button>
    <button
      type="button"
      onClick={onContractClick}
      style={{
        background: 'none',
        border: 'none',
        color: '#3a3a3b',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      Mesafeli Satış Sözleşmesi
    </button>
  </div>
);

export default function Checkout() {
  const [plan, setPlan] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState({ visible: false, msg: "", type: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const payBtnRef = useRef(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Terms and Contract components (copied/adapted)
  const TermsText = () => (
    <div style={{ fontSize: '14px', color: '#3a3a3b', maxHeight: '80vh', overflowY: 'auto', padding: '24px', fontFamily: 'inherit' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#3a3a3b', margin: 0 }}>ÖN BİLGİLENDİRME FORMU</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p>
            İş bu ön bilgilendirme formunun ve ardından dijital ortamda imzalanacak mesafeli satış sözleşmesinin konusunu oluşturan ürün/hizmetin SATICI'sı POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ olabileceği gibi SATICI www.osmovo.com internet sitesini ve elektronik altyapısını kullanan başkaca 3. Kişiler olabilir. SATICI ve SATICI'ya ait iletişim bilgileri bu ön bilgilendirme formunda ve www.osmovo.com internet sitesinde iş bu ön bilgilendirme formuna konu ürün veya hizmetin detaylarında belirtilir. SATICI'nın POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ olmadığı ürün satışı ve teslimine ilişkin sözleşmelerde sözleşme konusu ürün veya hizmetin satışında POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ herhangi bir şekilde sözleşmenin tarafı olmayıp TÜKETİCİ VE SATICI'nın yükümlülüklerini yerine getirmeleri ile ilgili herhangi bir sorumluluk ve taahhüt yükümlülüğü altında değildir.
          </p>
        </div>
        <div>
          <h2 style={{ fontWeight: '600', color: '#3a3a3b', marginBottom: '12px', fontSize: '16px' }}>2. SÖZLEŞMENİN KONUSU VE ÜRÜN</h2>
          <div style={{ marginLeft: '16px' }}>
            <p>
              İşbu Sözleşme'nin konusu, ALICI'nın SATICI'ya www.osmovo.com uzantılı web sitesi ve buna bağlı tüm uygulamalar ("İnternet Sitesi") üzerinden elektronik ortamda sipariş verdiği, osmovo Online Üyelik Sözleşmesi, Ön Bilgilendirme Formu ve internet sitesinde nitelikleri ve satış bedeli belirtilen hizmetin ("Hizmet") sunumu ve satışı ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun ("6502 Sayılı Kanun") ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince Taraflar'ın karşılıklı hak ve yükümlülüklerinin belirlenmesidir.
            </p>
          </div>
        </div>

        <div>
          <h2 style={{ fontWeight: '600', color: '#3a3a3b', marginBottom: '12px', fontSize: '16px' }}>3. SÖZLEŞMEYE KONU HİZMET BİLGİLERİ VE SATIŞ BEDELİ</h2>
          <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ fontWeight: '500' }}>3.1. Sözleşme konusu hizmetin nitelikleri, türü, satış bedeli ve ödeme koşulları ilgili faturada belirtilmektedir.</p>
              <table style={{ width: '100%', marginTop: '16px', marginBottom: '16px', borderCollapse: 'collapse', border: '1px solid #dee2e6' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'left', fontWeight: '600' }}>
                      Ürün Adı
                    </th>
                    <th style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'center', fontWeight: '600', width: '96px' }}>
                      Adet
                    </th>
                    <th style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'right', fontWeight: '600', width: '192px' }}>
                      Satış Tutarı (KDV dahil)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #dee2e6', padding: '16px' }}>
                      {plan?.name || '-'}
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'center' }}>
                      1
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'right' }}>
                      {plan?.price ? `₺${parseFloat(plan.price).toFixed(2)}` : '-'}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8f9fa', fontWeight: '600' }}>
                    <td colSpan={2} style={{ border: '1px solid #dee2e6', padding: '16px' }}>
                      Net Tutar
                    </td>
                    <td style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'right' }}>
                      {plan?.price ? `₺${parseFloat(plan.price).toFixed(2)}` : '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function getPlanIdFromPath() {
    const path = window.location.pathname || "";
    const m = path.match(/\/checkout\/(\d+)/);
    if (m) return m[1];
    const qp = new URLSearchParams(window.location.search).get("plan");
    return qp;
  }

  function formatStorage(s) {
    const n = parseFloat(s);
    if (isNaN(n)) return s;
    if (n >= 1024) {
      const g = n / 1024;
      return `${g.toFixed(2).replace(/\.00$/, "")} GB`;
    }
    return `${Math.round(n)} MB`;
  }

  useEffect(() => {
    async function loadPlan(planId) {
      try {
        const res = await fetch("https://api.osmovo.com/api/plans");
        const data = await res.json();
        const found = (data.plans || []).find((p) => String(p.id) === String(planId)) || (data.plans || [])[0];
        if (!found) return;
        setPlan(found);
      } catch (err) {
        console.error(err);
      }
    }

    const planId = getPlanIdFromPath() || new URLSearchParams(window.location.search).get('plan');
    loadPlan(planId);
  }, []);

  useEffect(() => {
    if (!plan) return;

    // Update plan details in the UI
    const nameEl = document.getElementById('plan-name');
    const descEl = document.getElementById('plan-desc');
    const storageEl = document.getElementById('plan-storage');
    const questionsEl = document.getElementById('plan-questions');
    const renewalEl = document.getElementById('plan-renewal');
    const priceEl = document.getElementById('plan-price');
    const summaryPlan = document.getElementById('summary-plan');
    const summaryPrice = document.getElementById('summary-price');
    const totalEl = document.getElementById('total-price');

    if (nameEl) nameEl.textContent = plan.name;
    if (descEl) descEl.textContent = plan.description || '';
    if (storageEl) storageEl.textContent = formatStorage(plan.storage_limit);
    if (questionsEl) questionsEl.textContent = plan.question_limit;
    if (renewalEl) renewalEl.textContent = plan.renewal_days;
    if (priceEl) priceEl.textContent = plan.is_free ? 'Ücretsiz' : (plan.price + ' ' + (plan.currency || 'TRY'));
    if (summaryPrice) summaryPrice.textContent = plan.is_free ? 'Ücretsiz' : (plan.price + ' ' + (plan.currency || 'TRY'));
    if (summaryPlan) summaryPlan.textContent = plan.name;
    if (totalEl) {
      const unit = plan.is_free ? 0 : (Number(plan.price) || 0);
      const total = unit * (Number(quantity) || 1);
      totalEl.textContent = plan.is_free ? 'Ücretsiz' : (total + ' ' + (plan.currency || 'TRY'));
    }
  }, [plan, quantity]);

  function isLoggedIn() {
    return Boolean(localStorage.getItem('authToken') || sessionStorage.getItem('authToken')) || /(^|; )\s*token=/.test(document.cookie);
  }

  useEffect(() => {
    if (!showIframe || !iframeSrc) return;

    // Add iframe resizer script if not present
    const scriptId = 'paytr-iframe-resizer';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://www.paytr.com/js/iframeResizer.min.js';
      s.async = true;
      s.onload = () => {
        try {
          if (window.iFrameResize) {
            window.iFrameResize({}, '#paytriframe');
          }
        } catch (e) {
          // ignore
        }
      };
      document.body.appendChild(s);
    } else {
      // script already loaded, try to call resizer
      try {
        if (window.iFrameResize) window.iFrameResize({}, '#paytriframe');
      } catch (e) {
        // ignore
      }
    }

    // scroll to iframe
    setTimeout(() => {
      const el = document.getElementById('paytriframe');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, [showIframe, iframeSrc, showPaymentModal]);

  const navigate = useNavigate();
  const location = useLocation();

  function showPaymentStatus(msg, type) {
    setPaymentStatus({ visible: true, msg, type });
  }

  async function handleCheckout(e) {
    e.preventDefault();
    if (!isLoggedIn()) {
      const target = location.pathname + location.search;
      navigate('/login?redirect=' + encodeURIComponent(target), { replace: true });
      return;
    }

    if (!name.trim() || !email.trim() || !address.trim()) {
      showPaymentStatus('Lütfen ad, e-posta ve adres bilgilerini doldurun.', 'error');
      return;
    }

    const payload = {
      user_basket: [{ id: plan.id, quantity: Number(quantity) || 1 }],
      user_name: name.trim(),
      user_address: address.trim(),
      user_phone: (phone || '').trim()
    };

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const payBtn = payBtnRef.current;
    if (payBtn) {
      payBtn.disabled = true;
      const origText = payBtn.textContent;
      payBtn.textContent = 'İşleniyor...';
      showPaymentStatus('Ödeme yönlendiriliyor...', 'loading');

      try {
        const res = await fetch('https://api.osmovo.com/api/payment/process', {
          method: 'POST',
          headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { 'Authorization': 'Bearer ' + token } : {}),
          body: JSON.stringify(payload)
        });

        const contentType = res.headers.get('content-type') || '';
        let data = null;
        let text = null;
        if (contentType.includes('application/json')) {
          data = await res.json().catch(() => null);
        } else {
          text = await res.text().catch(() => null);
        }

        if (res.ok) {
          // Try to extract iframe src from JSON or raw HTML
          let iframeUrl = null;

          if (data) {
            if (typeof data === 'string') text = data;
            if (data.iframe) iframeUrl = data.iframe;
            if (!iframeUrl && data.url) iframeUrl = data.url;
            if (!iframeUrl && data.redirect_url) iframeUrl = data.redirect_url;
            if (!iframeUrl && data.payment_url) iframeUrl = data.payment_url;
            if (!iframeUrl && data.html) text = data.html;
          }

          if (text && !iframeUrl) {
            const m = String(text).match(/<iframe[^>]*src=["']([^"']+)["']/i);
            if (m) iframeUrl = m[1];
          }

          if (iframeUrl) {
            setIframeSrc(iframeUrl);
            setShowIframe(true);
            setShowPaymentModal(true);
            showPaymentStatus((data && data.message) || 'Ödeme işlemi başlatıldı. Ödeme formu aşağıda açıldı.', 'success');
          } else {
            showPaymentStatus((data && (data.message || data.error)) || 'Ödeme işlemi başlatıldı. Yönlendiriliyorsunuz...', 'success');
            // If server returned a redirect url, navigate
            if (data && data.redirect_url) window.location.href = data.redirect_url;
          }
        } else {
          const err = (data && (data.error || data.message)) || 'Ödeme sırasında hata oluştu.';
          showPaymentStatus(err, 'error');
        }
      } catch (err) {
        console.error('Payment error', err);
        showPaymentStatus('Sunucuya bağlanırken hata oluştu. Lütfen tekrar deneyin.', 'error');
      } finally {
        if (payBtn) {
          payBtn.disabled = false;
          payBtn.textContent = 'Güvenli Ödeme';
        }
      }
    }
  }

  return (
    <CheckoutWrapper>
      <Container>
        <MainCard>
          <Header>
            <HeaderTitle>Güvenli Ödeme</HeaderTitle>
            <HeaderSubtitle>Plan seçiminizi tamamlayın ve güvenli ödeme yapın</HeaderSubtitle>
          </Header>

          <Content>
            <PlanHeader>
              <PlanInfo>
                <PlanTitle id="plan-name">Plan</PlanTitle>
                <PlanDescription id="plan-desc">Plan açıklaması</PlanDescription>
              </PlanInfo>
              <PlanPricing>
                <PriceDisplay id="plan-price">₺0.00</PriceDisplay>
                <PriceInterval id="plan-interval">Aylık</PriceInterval>
              </PlanPricing>
            </PlanHeader>

            <MainContent>
              <FormSection>
                <SectionTitle>Plan Özellikleri</SectionTitle>
                <PlanFeatures id="plan-features">
                  <FeatureItem>Depolama: <strong id="plan-storage">-</strong></FeatureItem>
                  <FeatureItem>Soru limiti: <strong id="plan-questions">-</strong></FeatureItem>
                  <FeatureItem>Yenileme: <strong id="plan-renewal">-</strong> gün</FeatureItem>
                </PlanFeatures>

                <SectionTitle>Fatura & Gönderim Bilgileri</SectionTitle>
                <form id="checkout-form" onSubmit={handleCheckout}>
                  <FormGroup>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input id="name" name="name" required placeholder="Ahmet Yılmaz" value={name} onChange={(e) => setName(e.target.value)} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">Email Adresi *</Label>
                    <Input id="email" type="email" name="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="address">Adres *</Label>
                    <Input id="address" name="address" type="text" required placeholder="Mah. Cad. No:..." value={address} onChange={(e) => setAddress(e.target.value)} />
                  </FormGroup>

                  <FieldRow>
                    <FormGroup>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" name="phone" type="text" placeholder="0555xxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </FormGroup>
                    <div></div>
                  </FieldRow>

                  <PrimaryButton id="pay-btn" type="submit" ref={payBtnRef}>
                    Güvenli Ödeme
                  </PrimaryButton>

                  <SecurityBadge>
                    256-bit SSL ile korunmaktadır
                  </SecurityBadge>
                </form>

                {showIframe && iframeSrc && !showPaymentModal && (
                  <div style={{ marginTop: '20px' }} className="paytr-container">
                    <iframe
                      src={iframeSrc}
                      id="paytriframe"
                      title="payment-iframe"
                      frameBorder="0"
                      scrolling="no"
                      style={{ width: '100%', minHeight: '640px', border: 'none' }}
                    />
                  </div>
                )}
              </FormSection>

              <CheckoutSummary>
                <SummaryHeader>Sipariş Özeti</SummaryHeader>

                <SummaryItem>
                  <span id="summary-plan">Plan</span>
                  <strong id="summary-price">₺0.00</strong>
                </SummaryItem>

                <SummaryTotal>
                  <TotalLabel>Toplam Tutar</TotalLabel>
                  <TotalPrice>
                    <span id="total-label">Ara Toplam</span>
                    <span id="total-price">₺0.00</span>
                  </TotalPrice>
                </SummaryTotal>

                <PaymentStatus
                  visible={paymentStatus.visible}
                  type={paymentStatus.type}
                  msg={paymentStatus.msg}
                />
              </CheckoutSummary>
            </MainContent>
          </Content>

          <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
            <TermsText />
          </Modal>

          <Modal isOpen={showContractModal} onClose={() => setShowContractModal(false)}>
            <ContractText plan={plan} name={name} address={address} phone={phone} email={email} />
          </Modal>

          {/* Payment modal - show iframe centered over the page */}
          <Modal isOpen={showPaymentModal} onClose={() => { setShowPaymentModal(false); setShowIframe(false); setIframeSrc(null); }}>
            <div style={{ width: '100%', maxWidth: '960px' }}>
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  id="paytriframe"
                  title="payment-iframe-modal"
                  frameBorder="0"
                  scrolling="no"
                  style={{ width: '100%', minHeight: '640px', border: 'none' }}
                />
              ) : (
                <div style={{ padding: '24px', textAlign: 'center' }}>Ödeme yükleniyor...</div>
              )}
            </div>
          </Modal>

          <ContractFooter
            onTermsClick={() => setShowTermsModal(true)}
            onContractClick={() => setShowContractModal(true)}
          />
        </MainCard>
      </Container>

      {/* Responsive Styles */}
      <style jsx>{`
                @media (max-width: 1024px) {
                    .main-content {
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                    .checkout-summary {
                        position: static !important;
                        order: -1;
                    }
                    .container {
                        padding: 20px 16px !important;
                    }
                    .content {
                        padding: 32px 24px !important;
                    }
                    .header {
                        padding: 24px !important;
                    }
                    .header-title {
                        font-size: 24px !important;
                    }
                }

                @media (max-width: 640px) {
                    .plan-header {
                        flex-direction: column !important;
                        gap: 16px !important;
                        text-align: center !important;
                    }
                    .field-row {
                        grid-template-columns: 1fr !important;
                    }
                    .header-title {
                        font-size: 22px !important;
                    }
                    .price-display {
                        font-size: 20px !important;
                    }
                    .main-card {
                        border-radius: 8px !important;
                        margin: 0 8px !important;
                    }
                    .form-section, .checkout-summary {
                        padding: 24px !important;
                    }
                }

                /* Focus and hover improvements */
                .primary-button:focus {
                    box-shadow: 0 0 0 3px rgba(58, 58, 59, 0.2) !important;
                    outline: none !important;
                }

                .input:hover {
                    border-color: #adb5bd !important;
                }

                /* Animation improvements */
                .main-card {
                    animation: slideInUp 0.6s ease-out !important;
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Print styles */
                @media print {
                    .container {
                        padding: 0 !important;
                        min-height: auto !important;
                    }
                    .main-card {
                        box-shadow: none !important;
                        border: 1px solid #000 !important;
                    }
                    .primary-button, .security-badge {
                        display: none !important;
                    }
                }

                /* Dark mode support (for future use) */
                @media (prefers-color-scheme: dark) {
                    .checkout-wrapper {
                        /* Keep light mode for now - uncomment when needed */
                        /* background-color: #1a1a1a !important; */
                    }
                }

                /* High contrast mode */
                @media (prefers-contrast: high) {
                    .main-card {
                        border: 2px solid #000 !important;
                    }
                    .input {
                        border: 2px solid #000 !important;
                    }
                    .primary-button {
                        border: 2px solid #fff !important;
                    }
                }

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .main-card {
                        animation: none !important;
                    }
                    .primary-button {
                        transition: none !important;
                    }
                    .input {
                        transition: none !important;
                    }
                }
            `}</style>
    </CheckoutWrapper>
  );
}

const ContractText = ({ plan, name, address, phone, email }) => (
  <div style={{ fontSize: '14px', color: '#3a3a3b', whiteSpace: 'pre-line', maxHeight: '80vh', overflowY: 'auto', padding: '24px' }}>
    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#3a3a3b', margin: 0 }}>MESAFELİ SATIŞ SÖZLEŞMESİ</h1>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontWeight: '600', color: '#3a3a3b', marginBottom: '12px', fontSize: '16px' }}>1. TARAFLAR</h2>
        <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontWeight: '500' }}>1.1 Satıcıya Ait Bilgiler</p>
            <div style={{ marginLeft: '16px', marginTop: '4px' }}>
              <p>Unvanı: POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ</p>
              <p>Adres: KINIKLI MAH. HÜSEYİN YILMAZ CAD. PAMUKKALE ÜNİVERSİTESİ NO: 67 İÇ KAPI NO: 17-18 PAMUKKALE/ DENİZLİ</p>
              <p>Telefon: 0 (258) 215 51 05</p>
              <p>E-posta: info@osmovo.com</p>
              <p>Mersis Numarası: 07322178480700001</p>
              <p>KEP Adresi: poloplus@hs03.kep.tr</p>
            </div>
          </div>
          <div>
            <p style={{ fontWeight: '500' }}>1.2 Alıcıya Ait Bilgiler</p>
            <div style={{ marginLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>
                <p>Adı Soyadı: {name || ''}</p>
                <p>Adresi: {address || ''}</p>
                <p>Telefon: {phone || ''}</p>
                <p>E-posta: {email || ''}</p>
                <p>Tarih: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontWeight: '600', color: '#3a3a3b', marginBottom: '12px', fontSize: '16px' }}>2. SÖZLEŞMENİN KONUSU VE ÜRÜN</h2>
        <div style={{ marginLeft: '16px' }}>
          <p>
            İşbu Sözleşme'nin konusu, ALICI'nın SATICI'ya www.osmovo.com uzantılı web sitesi ve buna bağlı tüm uygulamalar ("İnternet Sitesi") üzerinden elektronik ortamda sipariş verdiği, osmovo Online Üyelik Sözleşmesi, Ön Bilgilendirme Formu ve internet sitesinde nitelikleri ve satış bedeli belirtilen hizmetin ("Hizmet") sunumu ve satışı ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun ("6502 Sayılı Kanun") ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince Taraflar'ın karşılıklı hak ve yükümlülüklerinin belirlenmesidir.
          </p>
        </div>
      </div>

      <div>
        <h2 style={{ fontWeight: '600', color: '#3a3a3b', marginBottom: '12px', fontSize: '16px' }}>3. SÖZLEŞMEYE KONU HİZMET BİLGİLERİ VE SATIŞ BEDELİ</h2>
        <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontWeight: '500' }}>3.1. Sözleşme konusu hizmetin nitelikleri, türü, satış bedeli ve ödeme koşulları ilgili faturada belirtilmektedir.</p>
            <table style={{ width: '100%', marginTop: '16px', marginBottom: '16px', borderCollapse: 'collapse', border: '1px solid #dee2e6' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'left', fontWeight: '600' }}>
                    Ürün Adı
                  </th>
                  <th style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'center', fontWeight: '600', width: '96px' }}>
                    Adet
                  </th>
                  <th style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'right', fontWeight: '600', width: '192px' }}>
                    Satış Tutarı (KDV dahil)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #dee2e6', padding: '16px' }}>
                    {plan?.name || '-'}
                  </td>
                  <td style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'center' }}>
                    1
                  </td>
                  <td style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'right' }}>
                    {plan?.price ? `₺${parseFloat(plan.price).toFixed(2)}` : '-'}
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#f8f9fa', fontWeight: '600' }}>
                  <td colSpan={2} style={{ border: '1px solid #dee2e6', padding: '16px' }}>
                    Net Tutar
                  </td>
                  <td style={{ border: '1px solid #dee2e6', padding: '16px', textAlign: 'right' }}>
                    {plan?.price ? `₺${parseFloat(plan.price).toFixed(2)}` : '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <p>2. Satın alınacak aktivasyon kodu ayrıca ALICI'nın adresine gönderilmeyecektir.</p>
      </div>
      <div>
        <p>
          3. Tüketici (ALICI), 14 (ondört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin işbu Mesafeli Satış Sözleşmesi'nden cayma hakkına sahiptir. Cayma hakkı süresi, hizmet ifasına ilişkin sözleşmelerde sözleşmenin kurulduğu gün; mal teslimine ilişkin sözleşmelerde ise tüketicinin veya tüketici tarafından belirlenen üçüncü kişinin malı teslim aldığı gün başlar. Ancak tüketici, sözleşmenin kurulmasından malın teslimine kadar olan süre içinde de cayma hakkını kullanabilir. Cayma hakkı süresinin belirlenmesinde; SATICI 'nın POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ olmadığı ürün satışı ve teslimine ilişkin mesafeli satış sözleşmelerinde POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ sözleşmenin tarafı olmadığından TÜKETİCİ' nin POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ'ne karşı cayma hakkı, bedel iadesi veya ürün değişimi talep hakkı yoktur.
        </p>
      </div>
      <div>
        <h2 style={{ fontWeight: '600', color: '#3a3a3b', marginBottom: '12px', fontSize: '16px' }}>Cayma Bildirimi</h2>
        <div style={{ marginLeft: '16px' }}>
          <p>E-Posta: info@osmovo.com</p>
          <p>Posta Adresi: KINIKLI MAH. HÜSEYİN YILMAZ CAD. PAMUKKALE ÜNİVERSİTESİ NO: 67 İÇ KAPI NO: 17-18 PAMUKKALE/ DENİZLİ</p>
        </div>
      </div>
      <div>
        <p>
          Tüketici aşağıdaki sözleşmelerde cayma hakkını kullanamaz:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '24px', marginTop: '8px' }}>
          <li>Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve SATICI veya sağlayıcının kontrolünde olmayan mal veya hizmetlere ilişkin sözleşmeler.</li>
          <li>Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda, kişiye özel hazırlanan ürün ve mallara ilişkin sözleşmeler.</li>
          <li>Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.</li>
          <li>Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.</li>
          <li>Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler.</li>
        </ul>
      </div>
    </div>
  </div>
);