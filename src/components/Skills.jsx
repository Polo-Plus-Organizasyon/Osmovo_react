import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SkillsContainer = styled.div`
  min-height: 60vh;
  background-color: #ffffff; /* bg-white */
  padding-top: 4rem; /* py-16 */
  padding-bottom: 4rem; /* py-16 */
  padding-left: 1.5rem; /* px-6 */
  padding-right: 1.5rem; /* px-6 */
`;

const MaxWidthWrapper = styled.div`
  max-width: 72rem; /* max-w-6xl */
  margin-left: auto; /* mx-auto */
  margin-right: auto; /* mx-auto */
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem; /* mb-16 */
`;

const Title = styled.h2`
  font-size: 3rem; /* text-4xl md:text-5xl */
  line-height: 1;
  font-weight: 700; /* font-bold */
  color: #1a202c; /* text-gray-900 */
  margin-bottom: 1.5rem; /* mb-6 */
  letter-spacing: -0.025em; /* tracking-tight */

  @media (min-width: 768px) {
    font-size: 3.75rem; /* md:text-5xl */
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem; /* text-lg */
  line-height: 1.625; /* leading-relaxed */
  color: #4a5568; /* text-gray-600 */
  max-width: 42rem; /* max-w-2xl */
  margin-left: auto; /* mx-auto */
  margin-right: auto; /* mx-auto */
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr)); /* grid-cols-1 */
  gap: 2rem; /* gap-8 */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* md:grid-cols-2 */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* lg:grid-cols-3 */
  }
`;

const FeatureCard = styled.div`
  position: relative;
  background-color: #ffffff; /* bg-white */
  border: 1px solid black; /* border border-gray, inline style */
  border-radius: 30px 30px 10px 10px; /* inline style */
  padding: 2rem; /* p-8 */
  transition: all 0.3s ease-in-out; /* transition-all duration-300 */
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* hover:shadow-xl */
    transform: translateY(-4px); /* hover:-translate-y-1 (original value was -4px for -translate-y-1, changing to -8px for a more noticeable lift) */
    border-color: #1a202c; /* hover:border-gray-900 */
  }
`;

const NumberBadge = styled.div`
  position: absolute;
  top: -1rem; /* -top-4 */
  right: -1rem; /* -right-4 */
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  background-color: #1a202c; /* bg-gray-900 */
  color: #ffffff; /* text-white */
  border-radius: 9999px; /* rounded-full */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700; /* font-bold */
  font-size: 0.875rem; /* text-sm */
  transition: transform 0.3s ease-in-out; /* group-hover:scale-110 transition-transform duration-300 */

  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
`;

const IconWrapper = styled.div`
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  color: #1a202c; /* text-gray-900 */
  margin-bottom: 1.5rem; /* mb-6 */
  transition: transform 0.3s ease-in-out; /* group-hover:scale-110 transition-transform duration-300 */

  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: #1a202c; /* text-gray-900 */
  margin-bottom: 1rem; /* mb-4 */
  transition: color 0.3s ease-in-out; /* group-hover:text-black transition-colors duration-300 */

  ${FeatureCard}:hover & {
    color: #000000; /* hover:text-black */
  }
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem; /* text-sm */
  line-height: 1.625; /* leading-relaxed */
  color: #4a5568; /* text-gray-600 */
  transition: color 0.3s ease-in-out; /* group-hover:text-gray-700 transition-colors duration-300 */

  ${FeatureCard}:hover & {
    color: #4a5568; /* hover:text-gray-700 */
  }
`;

const HoverIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px; /* h-0.5 was too small, increased to 2px for visibility */
  background-color: #1a202c; /* bg-gray-900 */
  transform: scaleX(0); /* transform scale-x-0 */
  transition: transform 0.3s ease-in-out; /* group-hover:scale-x-100 transition-transform duration-300 */
  transform-origin: left; /* origin-left */

  ${FeatureCard}:hover & {
    transform: scaleX(1);
  }
`;

const BottomAccent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem; /* mt-16 */
`;

const AccentLine = styled.div`
  width: 6rem; /* w-24 */
  height: 2px; /* h-0.5 was too small, increased to 2px for visibility */
  background-color: #1a202c; /* bg-gray-900 */
`;

const Features = () => {
  const featuresData = [
    {
      title: "Akıllı Soru-Cevap",
      description: "PDF'inizdeki herhangi bir konuda soru sorun, detaylı ve doğru yanıtlar alın. Doğal dil işleme ile konuşur gibi etkileşim kurun.",
      number: "01",
      svgIcon: (
       <svg class="w-16 h-16 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

      )
    },
    {
      title: "Hukuki Analiz",
      description: "Sözleşmeler, yasal belgeler ve mevzuat metinlerini analiz edin. Risk noktalarını ve önemli maddeleri otomatik tespit edin.",
      number: "02",
      svgIcon: (
    <svg class="w-[52px] h-[52px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z"/>
</svg>


      )
    },
    {
      title: "Özet ve Rapor",
      description: "Uzun belgelerin özetlerini çıkarın, anahtar noktaları vurgulayın ve özelleştirilmiş raporlar oluşturun.",
      number: "03",
      svgIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
        </svg>
      )
    },
    {
      title: "Gelişmiş Arama",
      description: "Belgenizde semantik arama yapın. Kelimelerin anlamını anlayan AI ile ilgili tüm bilgileri bulun.",
      number: "04",
      svgIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      )
    },
    {
      title: "Güvenli İşleme",
      description: "KVKK uyumlu, güvenli ve gizlilik odaklı çözüm. Verileriniz güvende tutulur ve korunur.",
      number: "05",
      svgIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    },
    {
      title: "Hızlı Yanıt",
      description: "Saniyeler içinde işlem tamamlama. Büyük belgeler bile anında analiz edilir ve sorularınız yanıtlanır.",
      number: "06",
      svgIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      )
    }
  ];

  return (
    <SkillsContainer>
      <MaxWidthWrapper>
        {/* Header */}
        <HeaderSection>
          <Title>
            PDF AI Özellikleri
          </Title>
          <Subtitle>
            Yapay zeka teknolojisiyle PDF belgelerinizi analiz edin, anlayın ve etkileşim kurun
          </Subtitle>
        </HeaderSection>

        {/* Features Grid */}
        <FeaturesGrid>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              className="group"
            >
              {/* Number Badge */}
              <NumberBadge>
                {feature.number}
              </NumberBadge>

              {/* Icon */}
              <IconWrapper>
                {feature.svgIcon}
              </IconWrapper>

              {/* Content */}
              <FeatureTitle>
                {feature.title}
              </FeatureTitle>
              
              <FeatureDescription>
                {feature.description}
              </FeatureDescription>

              {/* Hover indicator */}
              <HoverIndicator></HoverIndicator>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        {/* Bottom accent */}
        <BottomAccent>
          <AccentLine></AccentLine>
        </BottomAccent>
      </MaxWidthWrapper>
    </SkillsContainer>
  );
};

export default Features;