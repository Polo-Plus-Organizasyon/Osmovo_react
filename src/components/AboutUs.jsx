import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { FaRobot, FaBolt, FaChalkboardTeacher, FaChartBar, FaTasks, FaPuzzlePiece, FaGraduationCap, FaUsers, FaHeart, FaUniversalAccess, FaSatellite, FaRadiation, FaCheckDouble, FaQuestion } from 'react-icons/fa';

// Styled Components (Consistent with other policy pages)
const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: #f0f2f5; /* Consistent light grey background */
  color: #343a40;
`;

const Container = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    max-width: 100%;
  }
`;

const Con = styled.div`
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.8rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #212529;
  margin: 2.5rem 0 4rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  svg {
    color: #007bff;
    font-size: clamp(3.2rem, 5vw, 4rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(2.2rem, 5vw, 3rem);
    margin: 2rem 0 2.5rem;
    gap: 1rem;

    svg {
      font-size: clamp(2.5rem, 5vw, 3.2rem);
    }
  }
`;

const ContentCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 3.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.25s ease-in-out;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #007bff, #20c997);
    border-radius: 16px 16px 0 0;
  }
  
  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }
`;

const PolicySection = styled.div`
  padding: 2.5rem 0;
  border-bottom: 1px solid #e9ecef;
  position: relative;
  transition: all 0.2s ease-in-out;
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: 700;
  color: #212529;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  }
`;

const SectionIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #007bff, #20c997);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }
`;

const Paragraph = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #495057;
  margin-bottom: 1.2rem;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #212529;
    font-weight: 600;
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HighlightBox = styled.div`
  background: #e2f0ff; /* Light blue background */
  border-left: 5px solid #007bff; /* Accent border */
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #0056b3; /* Darker blue text */
  line-height: 1.7;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.1);

  strong {
    color: #004085;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem; /* Increased gap */
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2.2rem;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: #007bff; /* Accent border on hover */
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #20c997);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  @media (max-width: 768px) {
    padding: 1.8rem;
  }
`;

const FeatureIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: #e2f0ff; /* Light blue background */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  transition: all 0.2s ease-in-out;
  
  svg {
    color: #007bff;
    font-size: 1.6rem;
    transition: transform 0.2s ease-in-out;
  }
  
  ${FeatureCard}:hover & {
    background: linear-gradient(135deg, #007bff, #20c997);
    transform: scale(1.08);
    
    svg {
      color: white;
      transform: scale(1.08);
    }
  }
`;

const FeatureTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.6rem;
  line-height: 1.5;
  transition: color 0.2s ease-in-out;

  ${FeatureCard}:hover & {
    color: #007bff;
  }
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #495057;
  line-height: 1.7;
  margin: 0;
`;

const AboutSection = () => {
  const features = [
    {
      icon: <FaBolt />,
      title: "Hızlı ve Akıllı PDF Analizi",
      description: "Yapay zeka destekli altyapımız sayesinde PDF belgelerinizi anında analiz eder, önemli bilgileri çıkarır ve size hızlı çözümler sunar."
    },
    {
      icon: <FaRobot />,
      title: "Yapay Zeka Destekli Belge Sohbeti",
      description: "Yüklediğiniz PDF'ler hakkında doğal dilde sorular sorabilir, akıllı chatbotumuzdan anında, doğru ve bağlam bazlı yanıtlar alabilirsiniz."
    },
    {
      icon: <FaTasks />,
      title: "Gelişmiş Belge Yönetimi ve Takibi",
      description: "Platforma yüklediğiniz tüm PDF belgelerini kolayca yönetebilir, her bir belge üzerindeki analiz geçmişinizi ve önemli notlarınızı takip edebilirsiniz."
    },
    {
      icon: <FaChartBar />,
      title: "Detaylı İçerik ve Kullanım Raporları",
      description: "PDF belgelerinizle etkileşim geçmişinizi, sık sorulan soruları ve elde edilen analiz verilerini detaylı raporlar halinde görüntüleyerek verimliliğinizi artırabilirsiniz."
    },
    {
      icon: <FaGraduationCap />,
      title: "Kapsamlı İçerik Kütüphanesi Entegrasyonu",
      description: "Kendi PDF'lerinizi analiz etmenin yanı sıra, platformumuzun geniş ve sürekli güncellenen dijital kütüphanesinden faydalanarak bilgi birikiminizi zenginleştirebilirsiniz."
    },
    {
      icon: <FaPuzzlePiece />,
      title: "Esnek Erişim ve Özelleştirilebilir Paketler",
      description: "İhtiyaçlarınıza özel aylık veya yıllık abonelik seçenekleriyle Osmovo'nun tüm PDF analiz ve chatbot özelliklerine esnek ve ekonomik bir şekilde erişim sağlayabilirsiniz."
    }
  ];

  return (
    <PageContainer>
      <Con >
        {/* Removed Navbar usage */}
        <Container>
          <Title>
            <FaGraduationCap /> Hakkımızda
          </Title>
          <ContentCard>
            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaQuestion />
                </SectionIcon>
                <SectionTitle>Biz Kimiz?</SectionTitle>
              </SectionHeader>
              <Paragraph>
                Dijital eğitimde çığır açan platform **Osmovo**, öğrenmeyi daha erişilebilir, etkileşimli ve kişiselleştirilmiş hale getirme misyonuyla **PoloPlus** tarafından geliştirilmiştir. Bir Ar-Ge, yazılım ve danışmanlık şirketi olan PoloPlus, teknoloji ve inovasyonu odağına alarak, web tabanlı uygulamalardan yapay zekâ destekli sistemlere kadar geniş bir yelpazede çözümler sunar. Amacımız, her kullanıcının potansiyelini en üst düzeye çıkarmasına yardımcı olmaktır.
              </Paragraph>
              <Paragraph>
                **PoloPlus Makina Ar-Ge Danışmanlık İmalat Sanayi ve Ticaret Limited Şirketi** çatısı altında geliştirilen Osmovo, web tabanlı uygulamalardan yapay zekâ destekli sistemlere, veri analitiğinden makine öğrenmesine kadar pek çok alanda çağın gereksinimlerine uygun projeler üretmektedir. Amacımız, her kullanıcının potansiyelini en üst düzeye çıkarmasına yardımcı olmaktır.
              </Paragraph>
            </PolicySection>

            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaPuzzlePiece />
                </SectionIcon>
                <SectionTitle>Vizyonumuz</SectionTitle>
              </SectionHeader>
              <Paragraph>
                **PoloPlus** olarak vizyonumuz; teknolojiyi insan hayatını dönüştüren bir güç olarak kullanmak ve sürdürülebilir, etkili çözümlerle geleceği şekillendirmektir. Bu doğrultuda, **Osmovo** ile eğitimde yeni nesil öğrenme deneyimleri sunarak dijital devrime liderlik etmekten gurur duyuyoruz.
              </Paragraph>
            </PolicySection>

            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaCheckDouble />
                </SectionIcon>
                <SectionTitle>Osmovo ile Dijital Dönüşüm Hikayemiz</SectionTitle>
              </SectionHeader>
              <Paragraph>
                **Osmovo**’nun yenilikçi öğrenme yaklaşımı ve kullanıcı odaklı dijital çözümleri, **PoloPlus**’ın teknik uzmanlığı ve mühendislik gücüyle hayat bulmuştur. Eğitimde dijitalleşmeyi temel alan bu projede, sezgisel arayüzlerden güçlü veri analiz altyapısına, mobil uyumluluktan yapay zekâ destekli interaktif uygulamalara kadar birçok öncü teknolojik çözüm geliştirdik.
              </Paragraph>
            </PolicySection>

            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaBolt />
                </SectionIcon>
                <SectionTitle>Farkımız Ne?</SectionTitle>
              </SectionHeader>
              <FeaturesGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index}>
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureCard>
                ))}
              </FeaturesGrid>
            </PolicySection>
          </ContentCard>
        </Container>
      </Con>
      <Footer />
    </PageContainer>
  );
};

export default AboutSection;