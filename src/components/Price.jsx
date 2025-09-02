import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(3deg); }
  50% { transform: translateY(-5px) rotate(0deg); }
`;

const slideIn = keyframes`
  0% { transform: translateX(-10px); opacity: 0.7; }
  100% { transform: translateX(0px); opacity: 1; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const CardContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  perspective: 1000px;
`;

const Card = styled.div`
  background: white;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  position: relative;
  min-height: 480px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, rgba(0,0,0,0.02), rgba(0,0,0,0.05), rgba(0,0,0,0.02), rgba(0,0,0,0.01));
    background-size: 400% 400%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: #1e293b;
    transform: translateY(-12px) rotateX(5deg);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  &:hover::before {
    opacity: 1;
    animation: ${gradientMove} 3s ease infinite;
  }
`;

const PriceBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #1e293b;
  color: white;
  padding: 16px 20px;
  border-radius: 50px;
  box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
  transform: rotate(3deg);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 10;
  min-width: 120px;
  text-align: center;

  ${Card}:hover & {
    animation: ${float} 2s ease-in-out infinite;
    box-shadow: 0 12px 35px rgba(30, 41, 59, 0.4);
  }
`;

const PriceAmount = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
`;

const PricePeriod = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 2px;
`;

const CardContent = styled.div`
  padding: 12px 18px;
  position: relative;
  z-index: 2;
  height: 100%;
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 16%;
`;

const PlanHeader = styled.div`
  margin-bottom: 32px;
  padding-top: 20px;
`;

const PlanName = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.3;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: #0f172a;
  }
`;

const PlanDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: #475569;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s ease;
  
  &:nth-child(1) { transition-delay: 0.1s; }
  &:nth-child(2) { transition-delay: 0.2s; }
  &:nth-child(3) { transition-delay: 0.3s; }

  ${Card}:hover & {
    animation: ${slideIn} 0.5s ease forwards;
  }
`;

const FeatureIcon = styled.div`
  width: 28px;
  height: 28px;
  background: #1e293b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    stroke: white;
    stroke-width: 3;
  }

  ${Card}:hover & {
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(30, 41, 59, 0.3);
  }
`;

const FeatureText = styled.span`
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  transition: color 0.3s ease;

  strong {
    color: #1e293b;
    font-weight: 700;
  }

  ${Card}:hover & {
    color: #334155;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: #1e293b;
  color: white;
  border: none;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(30, 41, 59, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: #0f172a;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
  }

  &:hover::before {
    animation: ${shimmer} 0.8s ease;
  }

  &:active {
    transform: translateY(0px) scale(0.98);
  }

  &:focus {
    outline: none;
    ring: 4px solid rgba(30, 41, 59, 0.2);
  }
`;

const DecorativeElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const DecorCircle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.5s ease;
  
  ${Card}:hover & {
    opacity: 0.6;
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: ${props => props.delay}s;
  }
`;

const BottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1e293b, #64748b, #1e293b);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  ${Card}:hover & {
    transform: scaleX(1);
  }
`;

const CornerAccent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 25px solid #1e293b;
  border-bottom: 25px solid transparent;
  opacity: 0;
  transition: opacity 0.4s ease 0.2s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Footer = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  z-index: 3;
`;

const Price = ({ plan, onSelect }) => {
  const handleSelect = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof onSelect === 'function') {
      onSelect(plan?.id);
      return;
    }
    if (plan?.id) {
      window.location.href = `/checkout/${plan.id}`;
    }
  };

  const displayPrice = plan?.is_free ? 'Ücretsiz' : `${plan?.price} ${plan?.currency}`;

  return (
    <CardContainer>
      <Card>
        <DecorativeElements>
          <DecorCircle size={8} color="#e2e8f0" style={{top: '20px', left: '20px'}} delay={0.3} />
          <DecorCircle size={6} color="#cbd5e1" style={{top: '60px', right: '30px'}} delay={0.5} />
          <DecorCircle size={10} color="#f1f5f9" style={{bottom: '40px', left: '25px'}} delay={0.7} />
          <DecorCircle size={7} color="#e2e8f0" style={{bottom: '80px', right: '20px'}} delay={0.4} />
        </DecorativeElements>

        <CornerAccent />
        
        <PriceBadge>
          <PriceAmount>{displayPrice}</PriceAmount>
          {!plan?.is_free && (
            <PricePeriod>/ {plan?.renewal_days} gün</PricePeriod>
          )}
        </PriceBadge>

        <CardContent>
          <PlanHeader>
            <PlanName>{plan?.name}</PlanName>
            <PlanDescription>{plan?.description}</PlanDescription>
          </PlanHeader>

          <FeaturesList>
            <FeatureItem>
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </FeatureIcon>
              <FeatureText>
                <strong>{plan?.storage_limit}</strong> MB depolama alanı
              </FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </FeatureIcon>
              <FeatureText>
                <strong>{plan?.question_limit}</strong> soru sorma hakkı
              </FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </FeatureIcon>
              <FeatureText>
                Her <strong>{plan?.renewal_days} günde</strong> yenilenir
              </FeatureText>
            </FeatureItem>
          </FeaturesList>

        </CardContent>

        <Footer>
          <ActionButton onClick={handleSelect}>
            {plan?.is_free ? 'Ücretsiz Başla' : 'Satın Al'}
          </ActionButton>
        </Footer>

        <BottomGradient />
      </Card>
    </CardContainer>
  );
};

export default Price;