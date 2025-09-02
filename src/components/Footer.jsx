import React from "react";
import styled from "styled-components";
import { HiMail } from "react-icons/hi";
import { IoMdCall } from "react-icons/io";
import logo from "../assets/images/polo2.png"
import iyzico from "../assets/images/logo_band_colored.svg";
import paytr from "../assets/images/paytr.svg";
import mastercard from "../assets/images/mastercard-svgrepo-com.svg";
import visa from "../assets/images/visa-svgrepo-com.svg";
import troy from "../assets/images/troy-svgrepo-com.svg";

// Footer Styled Components
const FooterContainer = styled.footer`
  padding: 3rem 1.5rem;
  background-color: #ffffff;
  color: #333333;
  font-family: 'Arial', sans-serif;
  border-top: 1px solid #eeeeee;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Four columns as per image */
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogoWrapper = styled.div`
  margin-bottom: 1.5rem;

  img {
    height: 40px; /* Adjust as needed */
    width: auto;
  }
`;

const FooterTagline = styled.p`
  font-size: 0.8rem;
  color: #666666;
  margin-top: -10px;
  margin-bottom: 1.5rem;
`;

const AboutUsText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 2rem;
`;

const FooterHeading = styled.h4`
  font-size: 1.1rem;
  color: #333333;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const FooterLink = styled.a`
  color: #666666;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: block;
  text-decoration: none;

  &:hover {
    color: #000000;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #666666;

  svg {
    margin-right: 0.8rem;
    color: #666666;
  }
`;

const SubscribeSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-bottom: 0.8rem;
  background-color: #f9f9f9;
`;

const EmailInputIcon = styled.div`
  padding: 0.5rem 0.8rem;
  color: #666666;
  display: flex;
  align-items: center;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 0.5rem 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 0.9rem;
  color: #333333;

  &::placeholder {
    color: #999999;
  }
`;

const SubscribeButtonModern = styled.button`
  background-color: #333333;
  color: #ffffff;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #000000;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid #eeeeee;
  text-align: center;
  font-size: 0.8rem;
  color: #666666;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PaymentLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  img {
    height: 30px;
    width: auto;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.1);
  }
`;

const CopyrightText = styled.p`
  margin: 0;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        {/* Column 1: Logo, About Us, Contact Us */}
        <FooterColumn>
          <FooterLogoWrapper>
            <img src={logo} alt="PoloPlus Logo" />
          </FooterLogoWrapper>
          <FooterHeading>Hakkımızda</FooterHeading>
          <AboutUsText>
            PoloPlus Osmovo, kişiselleştirilmiş öğrenme deneyimi sunan modern bir eğitim platformudur. Başarıya giden yolda yanınızdayız.
          </AboutUsText>
          <FooterHeading>İletişim</FooterHeading>
          <ContactItem>
            <IoMdCall size={16} />
            <span>+90 (258) 215 51 05</span>
          </ContactItem>
          <ContactItem>
            <HiMail size={16} />
            <span>info@osmovo.com</span>
          </ContactItem>
        </FooterColumn>

        {/* Column 2: Information */}
        <FooterColumn>
          <FooterHeading>Kurumsal</FooterHeading>
          <FooterLink href="/faq">Sık Sorulan Sorular</FooterLink>
          <FooterLink href="/about">Hakkımızda</FooterLink>
          <FooterLink href="/iletisim">İletişim</FooterLink>
          <FooterLink href="/kvkk">KVKK Aydınlatma Metni</FooterLink>
          <FooterLink href="/teslimat-iade">Teslimat ve İade Şartları</FooterLink>
        </FooterColumn>

        {/* Column 3: Helpful Links */}
        <FooterColumn>
          <FooterHeading>Faydalı Linkler</FooterHeading>
          <FooterLink href="/kullanim">Şartlar ve Koşullar</FooterLink>
          <FooterLink href="/gizlilik">Gizlilik Politikası</FooterLink>
        </FooterColumn>

        {/* Column 4: Subscribe For More */}
        <FooterColumn>
          <FooterHeading>Daha Fazlası İçin Abone Olun</FooterHeading>
          <SubscribeSection>
            <EmailInputGroup>
              <EmailInputIcon><HiMail size={18} /></EmailInputIcon>
              <EmailInput type="email" placeholder="E-postanızı Girin" />
            </EmailInputGroup>
            <SubscribeButtonModern>Abone Ol</SubscribeButtonModern>
          </SubscribeSection>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <PaymentLogos>
          <img src={paytr} alt="Paytr" />
          <img src={mastercard} alt="Mastercard" />
          <img src={visa} alt="Visa" />
          <img src={troy} alt="Troy" />
        </PaymentLogos>
        <CopyrightText>&copy; {currentYear} Polo Plus Tüm Hakları Saklıdır.</CopyrightText>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;