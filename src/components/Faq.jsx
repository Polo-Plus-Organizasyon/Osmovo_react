import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { LuGraduationCap } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { FiPlus, FiMinus } from "react-icons/fi";

// Styled Components (Mirroring design from other policy pages)
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
  width: 100%; /* Ensure ContentCard takes full width within Container */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
  
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

const TabNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3.5rem; /* More spacing */
  width: 100%;
`;

const TabContainer = styled.div`
  background: #e9ecef; /* Lighter background for tabs */
  border-radius: 12px; /* Softer rounded corners */
  padding: 8px; /* More padding */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Softer shadow */
  border: 1px solid #dee2e6; /* Subtle border */
  display: flex;
  gap: 6px; /* Slightly more gap */

  @media (max-width: 640px) {
    flex-direction: column; /* Stack tabs on small screens */
    padding: 6px;
    gap: 4px;
    width: 100%;
    border-radius: 10px;
  }
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px; /* Adjusted padding */
  border-radius: 10px; /* Softer border-radius */
  font-weight: 600;
  font-size: 1.05rem; /* Slightly larger font size */
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  white-space: nowrap; /* Prevent text wrapping */
  
  ${props => props.active ? `
    background: linear-gradient(135deg, #007bff 0%, #20c997 100%); /* Vibrant active gradient */
    color: white;
    box-shadow: 0 6px 15px rgba(0, 123, 255, 0.25); /* Accent shadow */
    transform: translateY(-1px); /* Subtle lift */
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%);
    }
  ` : `
    background: transparent;
    color: #6c757d; /* Softer grey for inactive */
    
    &:hover {
      color: #212529; /* Darker on hover */
      background: #f8f9fa; /* Lighter background on hover */
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
  `} 

  @media (max-width: 640px) {
    padding: 10px 18px;
    font-size: 1rem;
    gap: 8px;
    justify-content: center;
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Increased gap between FAQ items */
  width: 100%;
`;

const FAQItem = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06); /* Softer shadow */
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
  
  ${props => props.isOpen && `
    box-shadow: 0 15px 35px rgba(0, 123, 255, 0.2);
    border-color: #007bff; /* Accent border when open */
    transform: translateY(-3px);
  `}
`;

const TopGradient = styled.div`
  height: 4px; /* Thicker gradient line */
  background: linear-gradient(90deg, #007bff, #20c997); /* Vibrant gradient */
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 24px 32px;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  
  &:focus {
    outline: none;
  }
  
  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(0, 123, 255, 0.2); /* Subtle focus ring */
    border-radius: 12px; /* Match item border radius */
  }

  @media (max-width: 768px) {
    padding: 18px 24px;
  }
`;

const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem; /* Increased gap */
`;

const QuestionText = styled.h3`
  font-size: 1.15rem; /* Slightly larger text */
  font-weight: 600;
  color: #212529;
  line-height: 1.6;
  transition: color 0.15s ease-in-out;
  margin: 0;
  font-family: 'Inter', sans-serif; /* Consistent font */

  ${FAQItem}:hover & {
    color: #007bff; /* Accent color on item hover */
  }
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const IconButton = styled.div`
  width: 40px; /* Slightly smaller icon button */
  height: 40px; /* Slightly smaller icon button */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  
  ${props => props.isOpen ? `
    background: linear-gradient(135deg, #007bff, #20c997);
    color: white;
    transform: rotate(180deg); /* Smooth rotation */
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  ` : `
    background: #f8f9fa; /* Light background for closed state */
    color: #6c757d; /* Softer grey */
    border: 1px solid #e9ecef; /* Subtle border */
    
    ${FAQItem}:hover & {
      background: #e2f0ff; /* Lighter blue on item hover */
      color: #007bff;
      transform: scale(1.05); /* Gentle scale */
    }
  `}
`;

const AnswerContainer = styled.div`
  overflow: hidden;
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
  
  ${props => props.isOpen ? `
    max-height: 500px; /* Increased max-height for longer answers */
    opacity: 1;
  ` : `
    max-height: 0;
    opacity: 0;
  `}
`;

const AnswerContent = styled.div`
  padding: 0 32px 28px; /* Adjusted padding */

  @media (max-width: 768px) {
    padding: 0 24px 20px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e9ecef; /* Solid light grey divider */
  margin-bottom: 20px; /* More space */
  margin-top: 10px; /* Space above divider */
`;

const AnswerText = styled.p`
  color: #495057;
  line-height: 1.8;
  font-size: 1.05rem;
  margin: 0;
  font-family: 'Inter', sans-serif; /* Consistent font */
`;

const CTASection = styled.div`
  margin-top: 5rem; /* More space above CTA */
  text-align:center;
  width: 100%;
`;

const CTACard = styled.div`
  background: linear-gradient(135deg, #007bff 0%, #20c997 100%); /* Vibrant gradient */
  border-radius: 16px;
  padding: 4rem 3.5rem; /* Generous padding */
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.3); /* Stronger accent shadow */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%); /* Stronger overlay */
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const CTATitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.2rem, 4vw, 2.8rem); /* Larger CTA title */
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.2rem);
    margin-bottom: 1rem;
  }
`;

const CTAText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.15rem; /* Slightly larger text */
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.7;
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled.button`
  background: #ffffff; /* White button */
  color: #007bff; /* Primary accent text */
  padding: 18px 36px; /* More prominent button */
  border-radius: 12px; /* Softer corners */
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  
  &:hover {
    background: #f8f9fa; /* Slightly off-white on hover */
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const FAQSection = () => {
    const [activeTab, setActiveTab] = useState('general'); // Changed initial tab
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const generalFAQs = [
        {
            question: 'Osmovo platformuna nasıl kayıt olabilirim?',
            answer: `<strong>Osmovo</strong> platformuna kayıt olmak çok kolay! Ana sayfamızdaki "Kayıt Ol" butonuna tıklayarak veya <a href="/register">buraya tıklayarak</a> gerekli bilgileri doldurarak hızlıca üye olabilirsiniz.`
        },
        {
            question: 'Osmovo\'da hangi tür içerikler bulunmaktadır?',
            answer: `<strong>Osmovo</strong>, PDF doküman analizi, yapay zeka destekli chatbot, interaktif eğitim materyalleri, ders videoları ve özel olarak hazırlanmış testler gibi zengin içerikler sunar. Amacımız, öğrenmeyi kişiselleştirilmiş ve etkileşimli hale getirmektir.`
        },
        {
            question: 'Paket satın almadan önce deneme yapabilir miyim?',
            answer: `Evet, <strong>Osmovo</strong> yeni kullanıcılar için sınırlı özelliklere sahip bir deneme süresi sunmaktadır. Deneme sürümü ile platformumuzu keşfedebilir ve temel özelliklerimizi deneyimleyebilirsiniz. Tam erişim için size uygun paketi satın alabilirsiniz.`
        },
        {
            question: 'Ödeme yöntemleri nelerdir?',
            answer: `<strong>Osmovo</strong>, PayTR güvencesiyle kredi kartı (Visa, Mastercard, Troy) ve banka kartı ile güvenli ödeme seçenekleri sunmaktadır. Diğer ödeme yöntemleri için destek ekibimizle iletişime geçebilirsiniz.`
        },
        {
            question: 'Mobil cihazlardan Osmovo\'ya erişebilir miyim?',
            answer: `Evet, <strong>Osmovo</strong> platformu tamamen duyarlı bir tasarıma sahiptir. Akıllı telefonlarınızdan veya tabletlerinizden kolayca erişebilir, derslere katılabilir ve tüm özelliklerimizi sorunsuz bir şekilde kullanabilirsiniz.`
        },
    ];

    const technicalSupportFAQs = [
        {
            question: 'Şifremi unuttum, ne yapmalıyım?',
            answer: `Şifrenizi unutmanız durumunda, giriş sayfasındaki "Şifremi Unuttum" bağlantısına tıklayarak kayıtlı e-posta adresinize yeni bir şifre belirleme bağlantısı gönderebilirsiniz.`
        },
        {
            question: 'PDF yüklemede sorun yaşıyorum, ne yapmalıyım?',
            answer: `PDF yükleme sırasında bir sorunla karşılaşırsanız, dosya boyutunun veya formatının desteklendiğinden emin olun (maksimum 50MB, sadece PDF). Sorun devam ederse, teknik destek ekibimizle <a href="mailto:hello@poloplus.com.tr">hello@poloplus.com.tr</a> adresinden iletişime geçebilirsiniz.`
        },
        {
            question: 'Chatbot yanıt vermiyor veya hatalı yanıtlar veriyor.',
            answer: `Chatbotun yanıtlarında bir sorun olduğunu düşünüyorsanız, lütfen sorunuzu daha açık bir şekilde ifade etmeyi deneyin. Eğer sorun devam ederse, karşılaştığınız durumu ve hata mesajını ekran görüntüsü ile birlikte teknik destek ekibimize bildirin.`
        },
        {
            question: 'Canlı derslere katılımda bağlantı sorunları yaşıyorum.',
            answer: `Canlı derslere katılım sırasında bağlantı sorunları yaşıyorsanız, internet bağlantınızın stabil olduğundan emin olun. Tarayıcınızın güncel olduğundan ve gerekli izinleri verdiğinizden emin olun. Sorun devam ederse, destek ekibimize başvurabilirsiniz.`
        },
    ];

    const activeFAQs = activeTab === 'general' ? generalFAQs : technicalSupportFAQs;

    return (
        <div>
            <PageContainer>
                {/* Removed Navbar usage */}
                <Container>
                    <Title>
                        <LuGraduationCap /> Sıkça Sorulan Sorular
                    </Title>

                    <TabNavigation>
                        <TabContainer>
                            <TabButton
                                active={activeTab === 'general'}
                                onClick={() => { setActiveTab('general'); setOpenIndex(null); }}
                            >
                                <LuGraduationCap size={20} />
                                <span>Genel Sorular</span>
                            </TabButton>
                            <TabButton
                                active={activeTab === 'technicalSupport'}
                                onClick={() => { setActiveTab('technicalSupport'); setOpenIndex(null); }}
                            >
                                <BsPeople size={20} />
                                <span>Teknik Destek</span>
                            </TabButton>
                        </TabContainer>
                    </TabNavigation>

                    <FAQContainer>
                        {activeFAQs.map((item, index) => (
                            <FAQItem key={index} isOpen={openIndex === index}>
                                <TopGradient show={openIndex === index} />
                                <QuestionButton onClick={() => toggleQuestion(index)}>
                                    <QuestionContent>
                                        <QuestionText>{item.question}</QuestionText>
                                        <IconButton isOpen={openIndex === index}>
                                            {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
                                        </IconButton>
                                    </QuestionContent>
                                </QuestionButton>

                                <AnswerContainer isOpen={openIndex === index}>
                                    <AnswerContent>
                                        <Divider />
                                        <AnswerText dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </AnswerContent>
                                </AnswerContainer>
                            </FAQItem>
                        ))}
                    </FAQContainer>

                    <CTASection>
                        <CTACard>
                            <CTATitle>Hala sorularınız mı var?</CTATitle>
                            <CTAText>
                                Aradığınız cevabı bulamadıysanız, <strong>PoloPlus</strong> destek ekibimiz size yardımcı olmaktan memnuniyet duyar. Kurumsal eğitim kurumları için özel paketler ve toplu lisans çözümleri de sunmaktayız.
                            </CTAText>
                            <CTAButton>
                                Destek Ekibiyle İletişime Geçin
                            </CTAButton>
                        </CTACard>
                    </CTASection>
                </Container>
            </PageContainer>
            <Footer />
        </div>
    );
};

export default FAQSection;