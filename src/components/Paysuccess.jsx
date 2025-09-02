import React from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'lucide-react'; // Using lucide-react for icons, as it's in package.json

const PaysuccessContainer = styled.div`
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

const SuccessCard = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const SuccessIcon = styled.div`
  color: #333333; /* Changed from green to dark grey */
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

const OrderDetailsContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: left;
`;

const OrderDetailsTitle = styled.h2`
  font-size: 1.4rem;
  color: #333333;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 0.8rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 1rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #444444;
`;

const DetailValue = styled.span`
  color: #666666;
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

function Paysuccess() {
  // Placeholder order data
  const orderDetails = {
    orderId: 'OSM-123456789',
    date: '2023-10-27',
    totalAmount: '249.99 TL',
    paymentMethod: 'Credit Card',
    status: 'Confirmed',
  };

  const handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  return (
    <PaysuccessContainer>
      <SuccessCard>
        <SuccessIcon>
          <CheckCircle />
        </SuccessIcon>
        <Title>Ödeme Başarılı!</Title>
        <Message>
          Siparişiniz başarıyla alınmıştır. En kısa sürede size ulaşacaktır.
          Bizi tercih ettiğiniz için teşekkür ederiz.
        </Message>


        <BackToHomeButton onClick={handleGoHome}>Anasayfaya Dön</BackToHomeButton>
      </SuccessCard>
    </PaysuccessContainer>
  );
}

export default Paysuccess;