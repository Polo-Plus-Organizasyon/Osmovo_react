import React from 'react';
import styled from 'styled-components';
import { XCircle } from 'lucide-react'; // Changed to XCircle for failure

const PayWrongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  color: #333333;
  font-family: 'Arial', sans-serif;
  padding: 2rem;
  text-align: center;
`;

const FailureCard = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const FailureIcon = styled.div`
  color: #333333; /* Changed from red to dark grey */
  margin-bottom: 1.5rem;
  svg {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #222222;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #555555;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const BackToHomeButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000000;
  }
`;

function PayWrong() {
  const handleGoHome = () => {
    // Navigate to home page or a retry page
    window.location.href = '/';
  };

  return (
    <PayWrongContainer>
      <FailureCard>
        <FailureIcon>
          <XCircle />
        </FailureIcon>
        <Title>Ödeme Başarısız!</Title>
        <Message>
          Ödeme işleminiz sırasında bir sorun oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin veya farklı bir ödeme yöntemi kullanın.
        </Message>
        <BackToHomeButton onClick={handleGoHome}>Anasayfaya Dön</BackToHomeButton>
      </FailureCard>
    </PayWrongContainer>
  );
}

export default PayWrong;