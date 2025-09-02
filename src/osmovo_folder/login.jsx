import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/* Design tokens */
const accent = 'rgb(58, 58, 59)';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #1a1a1b 0%, #2d2d30 25%, #3a3a3b 50%, #2d2d30 75%, #1a1a1b 100%);
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  max-width: 460px;
  background: #ffffff;
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const HeaderBox = styled.div`
  text-align: center;
  margin-bottom: 18px;
`;

const LogoBox = styled.div`
  width: 64px;
  height: 64px;
  background: ${accent};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`;

const H1 = styled.h1`
  font-size: 22px;
  color: ${accent};
  margin: 0 0 6px 0;
  font-weight: 700;
`;

const H2 = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 13px;
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 14px;
  font-size: 14px;
  border: 1px solid ${p => p.type === 'success' ? '#a7f3d0' : p.type === 'error' ? '#fecaca' : '#e2e8f0'};
  background: ${p => p.type === 'success' ? '#ecfdf5' : p.type === 'error' ? '#fff1f2' : '#f8fafc'};
  color: ${p => p.type === 'success' ? '#065f46' : p.type === 'error' ? '#991b1b' : '#334155'};
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const LabelStyled = styled.label`
  font-size: 13px;
  color: #374151;
  margin-bottom: 6px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  color: #111827;
  background: #fff;
  box-sizing: border-box;
  &:focus{ outline: none; box-shadow: 0 6px 18px rgba(16,24,40,0.06); border-color: ${accent}; }
`;

const PasswordWrapper = styled.div`position:relative;`;

const ToggleButton = styled.button`
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #6b7280; cursor: pointer;
`;

const Row = styled.div`display:flex;align-items:center;justify-content:space-between;gap:12px;`;

const CheckboxLabel = styled.label`display:flex;align-items:center;gap:8px;color:#4b5563;font-size:14px;`;

const CheckboxStyled = styled.input``;

const PrimaryButton = styled.button`
  width:100%;padding:12px 16px;border-radius:12px;border:none;background: linear-gradient(90deg, ${accent} 0%, #2c2c2c 100%);color:#fff;font-weight:600;cursor:pointer;box-shadow: 0 10px 24px rgba(44,44,44,0.12);
  &:disabled{ opacity:0.6; cursor:not-allowed; }
`;

const Divider = styled.div`display:flex;align-items:center;gap:12px;margin: 10px 0;`;
const Line = styled.div`flex:1;height:1px;background:#e6e6e6;`;
const SocialGrid = styled.div`display:flex;  justify-content: center;
align-items: center;
`;
const SocialButton = styled.button`padding:10px;border-radius:10px;border:1px solid #e6e6e6;background:#fff;cursor:pointer;`;
const FooterStyled = styled.div`text-align:center;margin-top:14px;color:#6b7280;font-size:13px;`;

const login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingSession();
    processOAuthCallback();
  }, []);

  const checkExistingSession = () => {
    // Eğer localStorage veya sessionStorage'da token varsa hemen yönlendir
    try {
      const token = localStorage?.getItem('authToken') || sessionStorage?.getItem('authToken');
      if (token) {
        setStatus({ message: 'Mevcut oturum bulundu. Yönlendiriliyorsunuz...', type: 'loading' });
        try {
          navigate('/dashboard');
          return;
        } catch (e) {
          window.location.href = '/dashboard';
          return;
        }
      }
    } catch (e) {
      // Storage desteği yok
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch('/auth/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data.valid === true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const clearSessionData = () => {
    try {
      localStorage?.removeItem('authToken');
      localStorage?.removeItem('userData');
      sessionStorage?.removeItem('authToken');
      sessionStorage?.removeItem('userData');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } catch (e) {
      // Storage desteği yok
    }
  };

  const processOAuthCallback = () => {
    try {
      // Check query params first
      const params = new URLSearchParams(window.location.search);
      let token = params.get('token') || params.get('authToken') || params.get('access_token');
  
      // If not in search, check hash (some providers return token in hash)
      if (!token && window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        token = hashParams.get('token') || hashParams.get('authToken') || hashParams.get('access_token');
      }
  
      console.log('Found token:', token); // Debug için
  
      if (token) {
        try {
          localStorage.setItem('authToken', token);
          console.log('Token saved to localStorage'); // Debug için
        } catch (e) {
          console.error('Token storage error:', e);
        }
  
        // Email ve name parametrelerini de kaydet (isteğe bağlı)
        const email = params.get('email');
        const name = params.get('name');
        if (email || name) {
          const userData = {};
          if (email) userData.email = decodeURIComponent(email);
          if (name) userData.name = decodeURIComponent(name);
          try {
            localStorage.setItem('userData', JSON.stringify(userData));
          } catch (e) {
            console.error('User data storage error:', e);
          }
        }
  
        setStatus({ message: 'Giriş başarılı! Yönlendiriliyorsunuz...', type: 'success' });
  
        // Get redirect parameter and decode it
        const redirectParam = params.get('redirect');
        let target = redirectParam ? decodeURIComponent(redirectParam) : '/dashboard';
        
        console.log('Redirect target:', target); // Debug için
  
        // if location.state.from exists (rare after full OAuth roundtrip) try to use it
        try {
          if (!redirectParam && location && location.state && location.state.from) {
            const from = location.state.from;
            target = typeof from === 'string' ? from : (from.pathname || '/') + (from.search || '');
          }
        } catch (e) { 
          console.error('Location state error:', e);
        }
  
        // Clean URL after processing
        try {
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        } catch (e) {
          console.error('URL cleanup error:', e);
        }
  
        // Navigate to target
        setTimeout(() => {
          try {
            navigate(target, { replace: true });
            console.log('Navigated using React Router to:', target);
          } catch (e) {
            console.log('React Router failed, using window.location to:', target);
            window.location.href = target;
          }
        }, 100); // Kısa gecikme ile navigate et
  
        return;
      }
    } catch (err) {
      console.error('OAuth callback processing error:', err);
      setStatus({ message: 'Giriş işlemi sırasında hata oluştu.', type: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };




  const handleGoogleAuth = () => {
    setIsLoading(true);
    setStatus({ message: 'Google ile giriş yönlendiriliyorsunuz...', type: 'loading' });
    try {
      // preserve redirect target (either query or location.state.from)
      const params = new URLSearchParams(location.search || '');
      const qsRedirect = params.get('redirect');
      let redirectTarget = qsRedirect || '/dashboard';
      if (location && location.state && location.state.from) {
        const from = location.state.from;
        redirectTarget = typeof from === 'string' ? from : (from.pathname || '/') + (from.search || '');
      }

      const oauthUrl = 'https://api.osmovo.com/api/auth/google/redirect?redirect=' + encodeURIComponent(redirectTarget);
      window.location.href = oauthUrl;
      
    } catch (err) {
      console.error('Google auth redirect error', err);
      setStatus({ message: 'Google ile giriş sırasında hata oluştu.', type: 'error' });
      setIsLoading(false);
    }
  };



  const performLogin = async () => {
    const { email, password } = formData;

    if (!email.trim() || !password) {
      setStatus({ message: "Email ve şifre giriniz.", type: "error" });
      return;
    }

    setIsLoading(true);
    setStatus({ message: "Giriş yapılıyor...", type: "loading" });

    try {
      const response = await fetch("https://api.osmovo.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // normalize token key names from API response
        const tokenValue =
          data.token ||
          data.access_token ||
          data.authToken ||
          data.accessToken;

        if (tokenValue) {
          localStorage.setItem("authToken", tokenValue);
        }

        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
        }

        setStatus({
          message: "Giriş başarılı! Yönlendiriliyorsunuz...",
          type: "success",
        });

        window.location.href="/dashboard";
        
        let target = null;

        if (data.redirect) {
          target = data.redirect;
        } else {
          const params = new URLSearchParams(window.location.search);
          target = params.get("redirect");
        }

        if (!target && location?.state?.from) {
          const from = location.state.from;
          target =
            typeof from === "string"
              ? from
              : (from.pathname || "/") + (from.search || "");
        }

        if (!target) target = "/dashboard";

        // normalize route
        if (target === "/dashboard") {
          target = "/dashboard";
        }

        if (target === "/checkout") {
          target = "/checkout";
        }

        try {
          navigate(target, { replace: true });
        } catch {
          window.location.href = target;
        }
      } else {
        const message =
          data.message ||
          "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";
        setStatus({ message, type: "error" });
      }
    } catch (err) {
      console.error("Login error", err);
      setStatus({
        message:
          "Sunucuya bağlanırken hata oluştu. Lütfen tekrar deneyin.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performLogin();
  };

  const StatusMessage = ({ message, type }) => {
    if (!message) return null;

    const getIcon = () => {
      if (type === 'success') {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      }
      if (type === 'error') {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      }
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    };

    return (
      <StatusBox type={type}>
        {getIcon()}
        <span style={{ fontSize: 14, fontWeight: 500 }}>{message}</span>
      </StatusBox>
    );
  };

  return (
    <PageWrapper>
      <Card>
        <HeaderBox>
          <LogoBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
            </svg>
          </LogoBox>
          <H1>Hoş Geldiniz</H1>
          <H2>PDF Sohbet Robotu'na giriş yapın</H2>
        </HeaderBox>

        <StatusMessage message={status.message} type={status.type} />

        <FormStyled onSubmit={handleSubmit}>
          <div>
            <LabelStyled>Email veya kullanıcı adı</LabelStyled>
            <StyledInput name="email" type="text" placeholder="ornek@email.com" value={formData.email} onChange={handleInputChange} />
          </div>

          <div>
            <LabelStyled>Şifre</LabelStyled>
            <PasswordWrapper>
              <StyledInput name="password" type={showPassword ? 'text' : 'password'} placeholder="Şifrenizi girin" value={formData.password} onChange={handleInputChange} />
              <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? 'Gizle' : 'Göster'}
              </ToggleButton>
            </PasswordWrapper>
          </div>

          <Row>
            <CheckboxLabel>
              <CheckboxStyled id="rememberMe" name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={handleInputChange} />
              Beni hatırla
            </CheckboxLabel>
            <a href="#" style={{ color: accent, fontWeight: 600, textDecoration: 'none' }}>Şifremi unuttum</a>
          </Row>

          <PrimaryButton type="submit" disabled={isLoading}>{isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</PrimaryButton>

          <Divider>
            <Line />
            <div style={{ color: '#6b7280', fontSize: 13 }}>veya</div>
            <Line />
          </Divider>

          <SocialGrid>
            <SocialButton onClick={handleGoogleAuth} type="button">Google</SocialButton>
          </SocialGrid>

          <FooterStyled>Hesabınız yok mu? <a href="/register" style={{ color: accent, fontWeight: 600, textDecoration: 'none' }}>Kayıt Ol</a></FooterStyled>
        </FormStyled>

        <FooterStyled style={{ marginTop: 18, fontSize: 12 }}>© 2025 PDF Sohbet Robotu. Tüm hakları saklıdır.</FooterStyled>
      </Card>
    </PageWrapper>
  );
};

export default login;