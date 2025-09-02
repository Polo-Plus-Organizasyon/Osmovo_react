import React from 'react';
import styled from 'styled-components';
import { FaMailBulk, FaPhone, FaMapMarkerAlt, FaBuilding, FaHashtag, FaFileContract, FaInfoCircle } from 'react-icons/fa';
import Footer from './Footer';

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
  &:last-child {
    border-bottom: none;
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

const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const ContactDetail = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.8rem;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-color: #007bff;
  }

  svg {
    color: #007bff;
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  h4 {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.2rem;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #495057;
    line-height: 1.5;
    margin: 0;
  }
`;

const ContactPage = () => {
    const contactInfo = [
        {
            icon: FaBuilding,
            label: "İşletme Adı",
            value: "Polo Plus Makina Ar-Ge Danışmanlık İmalat Sanayi ve Ticaret Limited Şirketi"
        },
        {
            icon: FaMapMarkerAlt,
            label: "Adres",
            value: "Kınıklı Mahallesi Hüseyin Yılmaz Caddesi PAÜ B Blok No:67/2 Ofis No: Z-18 Pamukkale/DENİZLİ"
        },
        {
            icon: FaPhone,
            label: "Telefon",
            value: "+90 (258) 215 51 05"
        },
        {
            icon: FaMailBulk,
            label: "E-Posta",
            value: "hello@poloplus.com.tr"
        },
        {
            icon: FaMailBulk,
            label: "KEP Adresi",
            value: "poloplus@hs03.kep.tr"
        },
        {
            icon: FaBuilding,
            label: "Vergi Dairesi",
            value: "Pamukkale"
        },
        {
            icon: FaHashtag,
            label: "Vergi Kimlik No",
            value: "7321784807"
        },
        {
            icon: FaFileContract,
            label: "MERSİS No",
            value: "0732178480700001"
        }
    ];

    return (
        <PageContainer>
            <Con>
                {/* Removed Navbar usage */}
                <Container>
                    <Title>
                        <FaInfoCircle /> İletişim Bilgileri
                    </Title>
                    <ContentCard>
                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaInfoCircle />
                                </SectionIcon>
                                <SectionTitle>Kurumsal İletişim</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                **PoloPlus Makina Ar-Ge Danışmanlık İmalat Sanayi ve Ticaret Limited Şirketi** olarak, **Osmovo** platformu ile ilgili tüm kurumsal iletişim ve destek ihtiyaçlarınız için buradayız. Aşağıda detaylı iletişim bilgilerimizi bulabilirsiniz.
                            </Paragraph>
                            <ContactInfoGrid>
                                {contactInfo.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <ContactDetail key={index}>
                                            <IconComponent />
                                            <div>
                                                <h4>{item.label}</h4>
                                                <p>{item.value}</p>
                                            </div>
                                        </ContactDetail>
                                    );
                                })}
                            </ContactInfoGrid>
                        </PolicySection>
                    </ContentCard>
                </Container>
            </Con>
            <Footer />
        </PageContainer>
    );
};

export default ContactPage;