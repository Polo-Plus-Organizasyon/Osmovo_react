import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Prevent page-level scrolling and ensure full-viewport layout */
  html, body, #root {
    height: 100%;
    overflow: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(10px, 3vh, 20px);
  background: linear-gradient(135deg, #1a1a1b 0%, #2d2d30 25%, #3a3a3b 50%, #2d2d30 75%, #1a1a1b 100%);
  position: relative;
  overflow: auto; /* only scroll when necessary */

  &::after {
    content: '';
    position: absolute;
    top: 6%;
    right: 4%;
    width: clamp(120px, 16vh, 260px);
    height: clamp(120px, 16vh, 260px);
    background: radial-gradient(circle, rgba(58, 58, 59, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${pulse} 4s ease-in-out infinite;
    pointer-events: none;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    padding-top: 6vh; /* space for status bar / notch */
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(18px);
  border-radius: 20px;
  padding: clamp(14px, 3.5vh, 36px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: calc(100vh - 40px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
    border-radius: 20px;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 
      0 30px 50px rgba(0, 0, 0, 0.42),
      0 0 0 1px rgba(255, 255, 255, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 16px;
    border-radius: 14px;
    max-height: calc(100vh - 32px);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Logo = styled.div`
  width: clamp(48px, 7vh, 80px);
  height: clamp(48px, 7vh, 80px);
  background: linear-gradient(145deg, #3a3a3b, #2d2d30);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.08),
    0 10px 28px rgba(0,0,0,0.28);
  position: relative;
  cursor: pointer;
  transition: all 0.22s ease;

  &:hover {
    transform: rotate(4deg) scale(1.03);
    box-shadow: 
      inset 0 2px 4px rgba(255,255,255,0.12),
      0 14px 34px rgba(0,0,0,0.34);
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, rgba(255,255,255,0.06), transparent, rgba(255,255,255,0.06));
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const LogoIcon = styled.svg`
  width: 42px;
  height: 42px;
  color: #ffffff;
  transition: all 0.3s ease;
  
  ${Logo}:hover & {
    color: #f0f0f0;
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: clamp(18px, 3vh, 30px);
  font-weight: 700;
  color: #1a1a1b;
  margin-bottom: 10px;
  letter-spacing: -0.6px;
  background: linear-gradient(135deg, #1a1a1b 0%, #3a3a3b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: clamp(12px, 1.6vh, 15px);
  font-weight: 400;
  line-height: 1.4;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2.2vh, 20px);
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto; /* allow internal scroll on very small heights */
  padding-right: 4px; /* prevent layout shift when scroll appears */

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: clamp(10px, 1.6vh, 16px) clamp(10px, 2.2vw, 18px);
  font-size: clamp(13px, 1.6vh, 15px);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  color: #1f2937;
  transition: all 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3a3a3b;
    box-shadow: 0 0 0 4px rgba(58, 58, 59, 0.08);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-0.5px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  }
  
  &::placeholder {
    color: #9ca3af;
    transition: color 0.2s ease;
  }
  
  &:focus::placeholder {
    color: #d1d5db;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  background: rgba(248, 250, 252, 0.92);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(248, 250, 252, 1);
    border-color: #cbd5e1;
    transform: translateY(-0.5px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  cursor: pointer;
  accent-color: #3a3a3b;
  transform: scale(1.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  cursor: pointer;
  flex: 1;
  
  a {
    color: #3a3a3b;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
    
    &:hover {
      color: #2d2d30;
      text-decoration: underline;
    }
  }
`;

const CheckboxDescription = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: clamp(10px, 2.2vh, 16px);
  font-size: clamp(14px, 1.8vh, 16px);
  font-weight: 700;
  color: white;
  background: linear-gradient(145deg, #3a3a3b, #2d2d30);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  min-height: 44px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(58, 58, 59, 0.34);
    background: linear-gradient(145deg, #2d2d30, #1a1a1b);
  }
  
  &:hover:not(:disabled)::before {
    left: 100%;
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 15px;
  }
`;

const LoadingSpinner = styled.svg`
  animation: ${spin} 1s linear infinite;
  width: 20px;
  height: 20px;
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 22px;
  border-radius: 14px;
  margin-top: 24px;
  font-size: 15px;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease-out;
  
  ${props => {
    switch(props.type) {
      case 'success':
        return `
          background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
          color: #047857;
          border: 1px solid #a7f3d0;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
        `;
      case 'error':
        return `
          background: linear-gradient(135deg, #fef2f2, #fef7f7);
          color: #dc2626;
          border: 1px solid #fecaca;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
        `;
      default:
        return '';
    }
  }}
`;

const StatusIcon = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
  
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  
  p {
    font-size: clamp(11px, 1.6vh, 13px);
    color: #9ca3af;
    margin-bottom: 12px;
  }
  
  a {
    color: #3a3a3b;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s ease;
    
    &:hover {
      color: #2d2d30;
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    p { margin-bottom: 8px; }
  }
`;

/* Responsive adjustments for short viewports so nothing requires scrolling */
const SmallHeightAdjustments = styled.div`
  @media (max-height: 760px) {
    ${RegisterCard} {
      padding: 12px;
    }
    ${Logo} { margin-bottom: 12px; }
    ${Title} { margin-bottom: 6px; }
    ${Subtitle} { font-size: 13px; }
  }

  @media (max-height: 600px) {
    ${RegisterCard} {
      transform: scale(0.98);
      transform-origin: top center;
    }
    ${FormContainer} {
      max-height: calc(100vh - 220px);
    }
  }
`;

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [kvkk, setKvkk] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', text: '' });

    function showMessage(type, text) {
        setFeedback({ type, text });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
            showMessage('error', 'Lütfen tüm alanları doldurun.');
            return;
        }
        if (!kvkk) {
            showMessage('error', 'KVKK onayı gereklidir.');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('https://api.osmovo.com/api/register', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password,kvkk })
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                showMessage('success', data.message || 'Kayıt başarılı. E-postanızı kontrol edin.');
                setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setKvkk(false);

                try {
                    let target = data && data.redirect ? data.redirect : null;
                    if (!target) {
                        target = new URLSearchParams(window.location.search).get('redirect');
                    }
                    if (!target) target = 'index.html';

                    setTimeout(() => {
                        try {
                            window.location.href = new URL(target, window.location.href).href;
                        } catch (err) {
                            window.location.href = target;
                        }
                    }, 1400);
                } catch (err) {
                    // ignore redirect errors
                }
            } else {
                const err = data.error || data.message || 'Kayıt sırasında bir hata oluştu.';
                showMessage('error', err);
            }
        } catch (err) {
            showMessage('error', 'Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
        } finally {
            setSubmitting(false);
        }
    }

    const renderStatusIcon = () => {
        switch(feedback.type) {
            case 'success':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <RegisterCard>
                    <Header>
                        <Logo>
                            <LogoIcon 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                            </LogoIcon>
                        </Logo>
                        <Title>Kayıt Ol</Title>
                        <Subtitle>PDF Sohbet Robotu'na katılın ve deneyimi başlayın</Subtitle>
                    </Header>

                    <div onSubmit={handleSubmit}>
                        <FormContainer>
                            <FormRow>
                                <InputGroup>
                                    <Label htmlFor="first_name">Ad</Label>
                                    <Input 
                                        id="first_name" 
                                        name="first_name" 
                                        type="text" 
                                        required 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Adınızı girin"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="last_name">Soyad</Label>
                                    <Input 
                                        id="last_name" 
                                        name="last_name" 
                                        type="text" 
                                        required 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Soyadınızı girin"
                                    />
                                </InputGroup>
                            </FormRow>

                            <InputGroup>
                                <Label htmlFor="email">E-posta</Label>
                                <Input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    required 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label htmlFor="password">Parola</Label>
                                <Input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Güvenli bir parola oluşturun"
                                />
                            </InputGroup>

                            <CheckboxContainer onClick={() => setKvkk(!kvkk)}>
                                <Checkbox 
                                    id="kvkk" 
                                    name="kvkk" 
                                    type="checkbox" 
                                    required 
                                    checked={kvkk} 
                                    onChange={(e) => setKvkk(e.target.checked)} 
                                />
                                <div>
                                    <CheckboxLabel htmlFor="kvkk">
                                        KVKK ve Gizlilik Politikası'nı okudum, onaylıyorum.
                                    </CheckboxLabel>
                                    <CheckboxDescription>
                                        Kişisel verileriniz, KVKK kapsamına uygun olarak işlenecek ve saklanacaktır. 
                                        Daha fazla bilgi için <a href="#">Gizlilik Politikası</a>'nı inceleyin.
                                    </CheckboxDescription>
                                </div>
                            </CheckboxContainer>

                            <RegisterButton 
                                onClick={handleSubmit} 
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <LoadingSpinner xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </LoadingSpinner>
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    'Kayıt Ol'
                                )}
                            </RegisterButton>
                        </FormContainer>
                    </div>

                    {feedback.text && (
                        <StatusMessage type={feedback.type}>
                            <StatusIcon>
                                {renderStatusIcon()}
                            </StatusIcon>
                            {feedback.text}
                        </StatusMessage>
                    )}

                    <Footer>
                        <p>Zaten hesabınız var mı? <a href="/login">Giriş Yap</a></p>
                        <p>© 2025 PDF Sohbet Robotu. Tüm hakları saklıdır.</p>
                    </Footer>
                </RegisterCard>
            </Container>
        </>
    );
}