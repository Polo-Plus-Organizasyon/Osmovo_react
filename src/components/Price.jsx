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

// New Styled Components for Pricing Cards
const PricingCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0; /* Softer border color */
  border-radius: 16px;
  padding: 32px 24px;
  position: relative;
  transition: all 0.3s ease;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Subtle shadow */

  &:hover {
    border-color: #cbd5e0; /* Slightly darker border on hover */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); /* More pronounced shadow on hover */
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    stroke: none; /* Remove stroke */
    stroke-width: 0;
    fill: #1a202c; /* Dark fill color */
  }
`;

const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const PlanDescription = styled.p`
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const PriceSection = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid #e2e8f0;
`;

const PriceDisplay = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
`;

const Currency = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #111827;
`;

const Amount = styled.span`
  font-size: 36px;
  font-weight: 600;
  color: #111827;
`;

const FromText = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #111827;
  margin-right: 8px;
`;

const BillingPeriod = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const CtaButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;

  &.primary {
    background: #1a202c; /* Dark background */
    color: #ffffff;
  }

  &.primary:hover {
    background: #2d3748; /* Slightly darker on hover */
  }

  &.secondary {
    background: #ffffff;
    color: #111827;
    border: 1.5px solid #e5e7eb;
  }

  &.secondary:hover {
    background: #f9fafb;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px; /* Consistent gap between icon and text */
  margin-bottom: 16px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`;

const CheckIcon = styled.span`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    width: 100%;
    height: 100%;
    stroke: #10b981; /* Green checkmark color */
    stroke-width: 2.5;
  }
`;

const DiamondIcon = styled.span`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    width: 100%;
    height: 100%;
    fill: #3b82f6;
  }
`;

// Styled Components
// const CardContainer = styled.div`
//   max-width: 400px;
//   margin: 0 auto;
//   position: relative;
//   perspective: 1000px;
// `;

// const Card = styled.div`
//   background: white;
//   border: 2px solid #f1f5f9;
//   border-radius: 20px;
//   overflow: hidden;
//   transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
//   transform-style: preserve-3d;
//   position: relative;
//   min-height: 480px;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(-45deg, rgba(0,0,0,0.02), rgba(0,0,0,0.05), rgba(0,0,0,0.02), rgba(0,0,0,0.01));
//     background-size: 400% 400%;
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   &:hover {
//     border-color: #1e293b;
//     transform: translateY(-12px) rotateX(5deg);
//     box-shadow: 
//       0 25px 50px -12px rgba(0, 0, 0, 0.15),
//       0 0 0 1px rgba(0, 0, 0, 0.05);
//   }

//   &:hover::before {
//     opacity: 1;
//     animation: ${gradientMove} 3s ease infinite;
//   }
// `;

// const PriceBadge = styled.div`
//   position: absolute;
//   top: -5px;
//   right: -5px;
//   background: #1e293b;
//   color: white;
//   padding: 16px 20px;
//   border-radius: 50px;
//   box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
//   transform: rotate(3deg);
//   transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
//   z-index: 10;
//   min-width: 120px;
//   text-align: center;

//   ${Card}:hover & {
//     animation: ${float} 2s ease-in-out infinite;
//     box-shadow: 0 12px 35px rgba(30, 41, 59, 0.4);
//   }
// `;

// const PriceAmount = styled.div`
//   font-size: 1.25rem;
//   font-weight: 700;
//   line-height: 1.2;
// `;

// const PricePeriod = styled.div`
//   font-size: 0.75rem;
//   opacity: 0.8;
//   margin-top: 2px;
// `;

// const CardContent = styled.div`
//   padding: 12px 18px;
//   position: relative;
//   z-index: 2;
//   height: 100%;
//   width: 350px;
//   display: flex;
//   flex-direction: column;
//   margin-top: 16%;
// `;

// const PlanHeader = styled.div`
//   margin-bottom: 32px;
//   padding-top: 20px;
// `;

// const PlanName = styled.h3`
//   font-size: 1.75rem;
//   font-weight: 800;
//   color: #1e293b;
//   margin-bottom: 12px;
//   line-height: 1.3;
//   transition: color 0.3s ease;

//   ${Card}:hover & {
//     color: #0f172a;
//   }
// `;

// const PlanDescription = styled.p`
//   color: #64748b;
//   font-size: 0.95rem;
//   line-height: 1.6;
//   transition: color 0.3s ease;

//   ${Card}:hover & {
//     color: #475569;
//   }
// `;

// const FeaturesList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   margin-bottom: 32px;
// `;

// const FeatureItem = styled.li`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   transition: transform 0.3s ease;
  
//   &:nth-child(1) { transition-delay: 0.1s; }
//   &:nth-child(2) { transition-delay: 0.2s; }
//   &:nth-child(3) { transition-delay: 0.3s; }

//   ${Card}:hover & {
//     animation: ${slideIn} 0.5s ease forwards;
//   }
// `;

// const FeatureIcon = styled.div`
//   width: 28px;
//   height: 28px;
//   background: #1e293b;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);
//   transition: all 0.3s ease;
//   flex-shrink: 0;

//   svg {
//     width: 16px;
//     height: 16px;
//     stroke: white;
//     stroke-width: 3;
//   }

//   ${Card}:hover & {
//     transform: scale(1.15);
//     box-shadow: 0 6px 20px rgba(30, 41, 59, 0.3);
//   }
// `;

// const FeatureText = styled.span`
//   color: #475569;
//   font-size: 0.95rem;
//   font-weight: 500;
//   line-height: 1.4;
//   transition: color 0.3s ease;

//   strong {
//     color: #1e293b;
//     font-weight: 700;
//   }

//   ${Card}:hover & {
//     color: #334155;
//   }
// `;

// const ActionButton = styled.button`
//   width: 100%;
//   background: #1e293b;
//   color: white;
//   border: none;
//   padding: 18px 24px;
//   border-radius: 12px;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
//   position: relative;
//   overflow: hidden;
//   box-shadow: 0 4px 15px rgba(30, 41, 59, 0.2);

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(
//       90deg,
//       transparent,
//       rgba(255, 255, 255, 0.2),
//       transparent
//     );
//     transition: left 0.5s ease;
//   }

//   &:hover {
//     background: #0f172a;
//     transform: translateY(-2px) scale(1.02);
//     box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
//   }

//   &:hover::before {
//     animation: ${shimmer} 0.8s ease;
//   }

//   &:active {
//     transform: translateY(0px) scale(0.98);
//   }

//   &:focus {
//     outline: none;
//     ring: 4px solid rgba(30, 41, 59, 0.2);
//   }
// `;

// const DecorativeElements = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
//   overflow: hidden;
// `;

// const DecorCircle = styled.div`
//   position: absolute;
//   width: ${props => props.size}px;
//   height: ${props => props.size}px;
//   background: ${props => props.color};
//   border-radius: 50%;
//   opacity: 0;
//   transition: opacity 0.5s ease;
  
//   ${Card}:hover & {
//     opacity: 0.6;
//     animation: ${fadeIn} 0.8s ease forwards;
//     animation-delay: ${props => props.delay}s;
//   }
// `;

// const BottomGradient = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 4px;
//   background: linear-gradient(90deg, #1e293b, #64748b, #1e293b);
//   transform: scaleX(0);
//   transform-origin: left;
//   transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);

//   ${Card}:hover & {
//     transform: scaleX(1);
//   }
// `;

// const CornerAccent = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 0;
//   height: 0;
//   border-left: 25px solid #1e293b;
//   border-bottom: 25px solid transparent;
//   opacity: 0;
//   transition: opacity 0.4s ease 0.2s;

//   ${Card}:hover & {
//     opacity: 1;
//   }
// `;

// const Footer = styled.div`
//   position: absolute;
//   left: 18px;
//   right: 18px;
//   bottom: 18px;
//   z-index: 3;
// `;

const Main = styled.div`
,
`

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

  return (
    <Main>
    <PricingCard>
      <CardIcon>
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v10M8 13l4 4 4-4"/>
          <circle cx="8" cy="9" r="1.5"/>
          <circle cx="16" cy="9" r="1.5"/>
          <circle cx="8" cy="15" r="1.5"/>
          <circle cx="16" cy="15" r="1.5"/>
        </svg>
      </CardIcon>
      
      <PlanName>{plan?.name}</PlanName>
      <PlanDescription>{plan?.description}</PlanDescription>
      
      <PriceSection>
        <PriceDisplay>
          {plan?.is_free ? (
            <Amount>Ücretsiz</Amount>
          ) : (
            <>
              <Currency>{plan?.currency}</Currency>
              <Amount>{plan?.price}</Amount>
            </>
          )}
        </PriceDisplay>
        {!plan?.is_free && (
          <BillingPeriod>/ {plan?.renewal_days} gün</BillingPeriod>
        )}
      </PriceSection>
      
   
      
      <FeaturesList>
      <CtaButton className="primary" onClick={handleSelect}>
        {plan?.is_free ? 'Ücretsiz Başla' : 'Satın Al'}
      </CtaButton>
        <FeatureItem>
          <CheckIcon>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </CheckIcon>
          <span><strong>{plan?.storage_limit}</strong> MB depolama alanı</span>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </CheckIcon>
          <span><strong>{plan?.question_limit}</strong> soru sorma hakkı</span>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </CheckIcon>
          <span>Her <strong>{plan?.renewal_days} günde</strong> yenilenir</span>
        </FeatureItem>
        {plan?.features && plan.features.map((feature, index) => (
          <FeatureItem key={index}>
            <CheckIcon>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </CheckIcon>
            <span>{feature}</span>
          </FeatureItem>
        ))}
      </FeaturesList>
    </PricingCard>
    </Main>
  );
};

export default Price;