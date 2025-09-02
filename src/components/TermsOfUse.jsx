import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { FaGraduationCap } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: #f0f2f5; /* A very light grey background for modern feel */
  color: #343a40; /* Default text color for body */
`;

const Container = styled.div`
  width: 100%;
  max-width: 880px; /* Slightly narrower content area for better readability */
  margin: 0 auto;
  padding: 3rem 1.5rem; /* Adjusted padding */
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    max-width: 100%;
  }
`;

const Con = styled.div`
  /* This wrapper is kept for structural consistency, but its background properties are removed */
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif; /* Using Inter for a modern, clean look */
  font-size: clamp(2.8rem, 5vw, 3.8rem); /* Larger and more impactful title */
  font-weight: 800; /* Extra bold for prominence */
  color: #212529; /* Deep charcoal for strong contrast */
  margin: 2.5rem 0 4rem; /* Generous spacing */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem; /* Increased gap */

  svg {
    color: #007bff; /* Consistent primary accent color */
    font-size: clamp(3.2rem, 5vw, 4rem); /* Larger icon */
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
  border-radius: 16px; /* Slightly larger border-radius for a softer, modern feel */
  padding: 3.5rem; /* More padding for spacious layout */
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* More pronounced, yet soft shadow */
  border: 1px solid #e9ecef; /* Lighter, subtle border */
  transition: all 0.25s ease-in-out; /* Smoother transition */
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px); /* More noticeable lift on hover */
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12); /* Enhanced shadow on hover */
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px; /* Even thicker accent line */
    background: linear-gradient(90deg, #007bff, #20c997); /* Vibrant gradient for accent */
    border-radius: 16px 16px 0 0; /* Match card border-radius */
  }
  
  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2rem; /* Clear and prominent section titles */
  font-weight: 700;
  color: #007bff; /* Primary accent color */
  margin-top: 3.5rem; /* Increased space above sections */
  margin-bottom: 1.5rem; /* Consistent spacing below */
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  
  &:first-of-type {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-top: 2.5rem;
    margin-bottom: 1.2rem;
    gap: 0.8rem;
  }
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px; /* Larger icon */
  height: 42px; /* Larger icon */
  background: linear-gradient(135deg, #007bff, #20c997); /* Consistent vibrant gradient */
  border-radius: 10px; /* Soft corners */
  color: white;
  font-size: 1.1rem; /* Clearer number */
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3); /* Subtle shadow for icons */
`;

const Paragraph = styled.p`
  font-family: 'Inter', sans-serif;
  line-height: 1.9; /* Further increased line-height for maximum readability */
  color: #495057; /* Slightly darker grey for better contrast */
  margin: 1.2rem 0; /* More generous paragraph spacing */
  font-size: 1.05rem; /* Slightly larger base font size */
  font-weight: 400;
  text-align: justify;
  
  &:first-of-type {
    margin-top: 1.8rem;
  }
  
  strong {
    font-weight: 700;
    color: #343a40; /* Darker strong text */
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease-in-out;

    &:hover {
      text-decoration: underline;
      color: #0056b3;
    }
  }

  ul {
    list-style-type: disc;
    margin-left: 1.8rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  li {
    margin-bottom: 0.6rem;
    color: #495057;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HighlightBox = styled.div`
  background: #e0f2ff; /* Softer, lighter blue */
  border-left: 6px solid #007bff; /* More prominent accent border */
  padding: 2rem 2.5rem; /* Increased padding */
  border-radius: 0 10px 10px 0; /* Slightly sharper but still soft corners */
  margin: 2.5rem 0; /* Increased vertical spacing */
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); /* Subtle shadow for depth */
  
  &::before {
    content: 'ℹ️';
    position: absolute;
    top: -15px; /* Adjusted position for better visibility */
    left: 25px;
    background: #e0f2ff; /* Match background */
    padding: 0 10px;
    font-size: 1.4rem; /* Larger info icon */
  }

  ${Paragraph} {
    margin: 0;
    color: #212529; /* Darker text for high contrast */

    strong {
      color: #0056b3; /* Deeper blue for strong text in highlight box */
    }
  }

  @media (max-width: 768px) {
    padding: 1.8rem;
    margin: 2rem 0;
  }
`;

const TermOfUse = () => {
    return (
        <PageContainer>
            <Con>
                <Container>
                    <Title>
                        <FaGraduationCap /> Kullanım Koşulları
                    </Title>
                    <ContentCard>
                        <HighlightBox>
                            <Paragraph>
                                <strong>www.poloplus.com.tr</strong> adresli internet sitesini ziyaret ederek veya <strong>Osmovo</strong> platformuna üye olarak kullanmaya başladığınız andan itibaren,
                                işbu Kullanım Koşulları'nı, Gizlilik Politikası'nı ve Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni'ni bir bütün olarak kabul etmiş sayılırsınız.
                            </Paragraph>
                        </HighlightBox>
                        <SectionTitle>
                            <SectionIcon>1</SectionIcon>
                            Genel Hükümler
                        </SectionTitle>
                        <Paragraph>
                            <strong>Osmovo</strong> platformunda sunulan PDF analizi, yapay zeka destekli chatbot hizmetleri ve interaktif eğitim içerikleri başta olmak üzere tüm içeriklerin bir kısmı kullanıcılar tarafından yüklenmekte, bir kısmı ise sadece bilgilendirme amacıyla ve iyi niyet çerçevesinde <strong>PoloPlus</strong> tarafından sağlanmaktadır.
                            Platformu kullanarak, yürürlükteki tüm mevzuata ve genel ahlak kurallarına uygun hareket edeceğinizi kabul etmiş olursunuz.
                        </Paragraph>
                        <Paragraph>
                            18 yaşından küçük kullanıcılar, yasal temsilcilerinin izni olmaksızın hiçbir şekilde satın alma veya benzeri işlemlerde bulunamazlar.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>2</SectionIcon>
                            Telif Hakkı ve İçerik Kullanımı
                        </SectionTitle>
                        <Paragraph>
                            <strong>Osmovo</strong> platformu üzerinde yer alan yazılı, görsel, işitsel ve dijital tüm içerikler; 5846 Sayılı Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır.
                            Platform içerikleri, <strong>PoloPlus</strong>'ın yazılı izni olmadan ticari veya ticari olmayan herhangi bir amaçla kullanılamaz.
                        </Paragraph>
                        <Paragraph>
                            Kullanıcılar, platforma zarar verici herhangi bir yazılım veya kod yüklemeyeceklerini beyan ederler. <strong>PoloPlus</strong> ve <strong>Osmovo</strong> markaları tescilli markalardır ve izinsiz kullanımları hukuki yaptırımlar doğurabilir.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>3</SectionIcon>
                            Kullanıcı İçeriği ve Sorumluluklar
                        </SectionTitle>
                        <Paragraph>
                            <strong>Osmovo</strong> platformunda oluşturulan tüm içeriklerden kullanıcı sorumludur. Telif, gizlilik, kişilik hakları ve diğer yasal düzenlemelere aykırı içerikler yüklenemez.
                            Nefret söylemi, siyasi propaganda, müstehiller ve benzeri içeriklere kesinlikle izin verilmemektedir.
                        </Paragraph>
                        <Paragraph>
                            Yüklenen içeriklerin telif hakkı veya diğer yasal düzenlemelere uygunluğundan kullanıcı sorumludur. <strong>PoloPlus</strong>, bu tür içeriklerden kaynaklanan herhangi bir sorumluluk kabul etmez.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>4</SectionIcon>
                            Teknik Güvence ve Sorumluluk Reddi
                        </SectionTitle>
                        <Paragraph>
                            <strong>PoloPlus</strong>, <strong>Osmovo</strong> hizmetlerinin kesintisiz, hatasız ve güncel olacağına dair bir garanti vermez. Teknik aksaklıklar, bakım çalışmaları veya mücbir sebeplerle hizmetlerde kesinti yaşanabilir. 
                            Hizmetin geçici ya da kalıcı olarak durdurulmasından, veri kaybından veya sistem hatalarından kaynaklı oluşabilecek doğrudan veya dolaylı zararlardan <strong>PoloPlus</strong> sorumlu değildir.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>5</SectionIcon>
                            Üyelik ve Hizmet Koşulları
                        </SectionTitle>
                        <Paragraph>
                            <strong>PoloPlus</strong>, <strong>Osmovo</strong> platformunda ücretsiz olarak sunulan hizmetleri zamanla üyelik şartına bağlayabilir, ücretli hale getirebilir veya tamamen kaldırabilir.
                            Kullanıcılar, bu değişiklikleri platformda yayınlandığı andan itibaren kabul etmiş sayılırlar. Ücretli hizmetler için ayrı ödeme ve abonelik koşulları geçerlidir.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>6</SectionIcon>
                            Yasal Uyarı ve İhlal Bildirimi
                        </SectionTitle>
                        <Paragraph>
                            Telif hakkı veya diğer yasal hak ihlallerinde, <strong>PoloPlus</strong> ile hello@poloplus.com.tr e-posta adresi üzerinden resmi yollardan iletişime geçilerek içerik kaldırılması talep edilebilir. 5846 sayılı kanun gereği içerik kaldırma talepleri 3 gün içinde yapılmalıdır.
                            Hukuka aykırı içerik bildirimi için gerekli belgelerin eksiksiz sunulması gerekmektedir.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>7</SectionIcon>
                            Değişiklik Hakkı
                        </SectionTitle>
                        <Paragraph>
                            <strong>PoloPlus</strong>, bu Kullanım Koşulları dahil olmak üzere tüm metinlerde dilediği zaman değişiklik yapma hakkını saklı tutar.
                            Güncellenen içerikler platformda yayınlandığı andan itibaren geçerli sayılır. Kullanıcıların periyodik olarak bu sayfayı ziyaret ederek güncellemeleri takip etmeleri önerilir.
                        </Paragraph>

                        <SectionTitle>
                            <SectionIcon>8</SectionIcon>
                            Son Hükümler
                        </SectionTitle>
                        <Paragraph>
                            Kullanıcılar, <strong>Osmovo</strong> platformunu kullanmaya başladıklarında bu şartları tamamen okuduklarını, anladıklarını ve kabul ettiklerini beyan etmiş olurlar.
                            <strong>PoloPlus</strong>'ın içerik silme, kullanıcı engelleme, hesap dondurma ve platformu düzenleme hakkı saklıdır. İşbu koşulların ihlali durumunda yasal yollara başvurma hakkımız saklıdır.
                        </Paragraph>
                    </ContentCard>
                </Container>
            </Con>
            <Footer />
        </PageContainer>
    );
};

export default TermOfUse;