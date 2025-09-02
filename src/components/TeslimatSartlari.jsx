import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { FaShippingFast, FaUndo, FaHeadset } from 'react-icons/fa';

// Styled Components - Using the same design principles as TermsOfUse.jsx and PrivacyPolicy.jsx
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
    border-radius: 16px 16px 0 0; /* Match card border-radius */
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
  
  &:hover {
    background: rgba(0, 123, 255, 0.03);
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
  
  &:hover::before {
    opacity: 1;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.8rem;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #007bff, #20c997);
  border-radius: 12px;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Paragraph = styled.p`
  font-family: 'Inter', sans-serif;
  line-height: 1.9;
  color: #495057;
  margin: 1.2rem 0;
  font-size: 1.05rem;
  font-weight: 400;
  text-align: justify;
  
  &:first-of-type {
    margin-top: 1.8rem;
  }
  
  strong {
    font-weight: 700;
    color: #343a40;
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
  background: #e0f2ff;
  border-left: 6px solid #007bff;
  padding: 2rem 2.5rem;
  border-radius: 0 10px 10px 0;
  margin: 2.5rem 0;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  &::before {
    content: 'ℹ️';
    position: absolute;
    top: -15px;
    left: 25px;
    background: #e0f2ff;
    padding: 0 10px;
    font-size: 1.4rem;
  }

  ${Paragraph} {
    margin: 0;
    color: #212529;

    strong {
      color: #0056b3;
    }
  }

  @media (max-width: 768px) {
    padding: 1.8rem;
    margin: 2rem 0;
  }
`;

const TeslimatIade = () => {
  return (
    <PageContainer>
      <Con>
        <Container>
          <Title>
            <FaShippingFast /> Teslimat ve İade Şartları
          </Title>

          <ContentCard>
            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaShippingFast />
                </SectionIcon>
                <SectionTitle>1. Teslimat Koşulları</SectionTitle>
              </SectionHeader>
              <Paragraph>
                <strong>Osmovo</strong> platformundan satın alınan tüm dijital eğitim içerikleri (PDF dokümanları, interaktif materyaller, chatbot erişimleri vb.) ödeme onayının
                tamamlanmasının ardından, kullanıcı hesabınıza tanımlanır ve erişiminiz
                aktif hale gelir.
              </Paragraph>
              <Paragraph>
                Dijital içeriklere erişim genellikle anlık olarak gerçekleşir. Ödeme
                sistemlerindeki yoğunluk veya teknik aksaklıklar nedeniyle erişimde
                gecikme yaşanması durumunda en geç 24 saat içerisinde erişim sağlanacaktır. Bu tür durumlarda <strong>PoloPlus</strong> destek ekibi ile iletişime geçebilirsiniz.
              </Paragraph>
              <Paragraph>
                Kullanıcılar, platforma kayıtlı e-posta adresi ve şifreleri ile 7 gün 24 saat
                boyunca satın aldıkları dijital içeriklere erişebilirler. Erişim süresi, satın alınan ürün sayfasında belirtilen
                süre boyunca geçerlidir.
              </Paragraph>
              <HighlightBox>
                Fiziksel ürün teslimatı yapılmamaktadır; satın alma işlemi tamamen dijital ortamda gerçekleşir. Tüm hizmetler <strong>Osmovo</strong> platformu üzerinden sunulmaktadır.
              </HighlightBox>
            </PolicySection>

            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaUndo />
                </SectionIcon>
                <SectionTitle>2. İade Koşulları</SectionTitle>
              </SectionHeader>
              <Paragraph>
                Dijital içerikler, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili Mesafeli Sözleşmeler Yönetmeliği kapsamında özel düzenlemelere tabidir.
                <strong>Osmovo</strong> platformunda sunulan dijital hizmetlerde, niteliği gereği cayma hakkı kısıtlı olabilir.
              </Paragraph>
              <Paragraph>
                Eğitim içeriklerine erişim sağlanmış veya dijital ürünler kullanılmış olsa bile, kullanıcılar satın alma tarihinden itibaren 14 gün içinde iade talebinde bulunabilirler. Ancak, bu talepler <strong>PoloPlus</strong> tarafından değerlendirilerek, ürünün veya hizmetin kullanılma düzeyi ve iadeye uygunluk şartları göz önünde bulundurularak karara bağlanır. Uygun bulunan iadeler 7 iş günü içinde ödenir.
              </Paragraph>
              <Paragraph>
                İade taleplerinde, kullanıcıların satın alma bilgilerini ve hesap bilgilerini doğru ve eksiksiz sunmaları gerekmektedir. Aksi takdirde iade işlemi gerçekleştirilemeyebilir. İade süreci hakkında detaylı bilgi için lütfen destek ekibimizle iletişime geçiniz.
              </Paragraph>
              <Paragraph>
                İade talepleri ve süreçleri, satın alınan ürünün kampanya ya da indirim koşullarına bağlı olarak değişiklik gösterebilir. Özellikle kampanyalı veya paket ürün alımlarında kısmi iadeler mümkün olmayabilir.
              </Paragraph>
            </PolicySection>

            <PolicySection>
              <SectionHeader>
                <SectionIcon>
                  <FaHeadset />
                </SectionIcon>
                <SectionTitle>3. Teknik Destek ve Erişim Sorunları</SectionTitle>
              </SectionHeader>
              <Paragraph>
                <strong>Osmovo</strong> platformundaki eğitim içeriklerine veya yapay zeka hizmetlerine erişim sırasında yaşanabilecek teknik sorunlar için <strong>PoloPlus</strong> kullanıcı destek hattı hizmetinizdedir.
                Destek taleplerinizi hello@poloplus.com.tr adresine iletebilirsiniz.
              </Paragraph>
              <Paragraph>
                Herhangi bir teknik aksaklık nedeniyle dijital materyallere erişemeyen kullanıcılarımız, destek ekibimizle iletişime geçerek sorunun çözümü için yardım talep edebilirler. Teknik sorunların hızla giderilmesi için tüm çaba gösterilecektir.
              </Paragraph>
              <Paragraph>
                Erişim sorunları kullanıcı kaynaklı (örn. şifre unutma, internet bağlantısı problemleri) şifre veya internet bağlantısı problemlerinden kaynaklanmıyorsa ve sorun <strong>PoloPlus</strong> tarafından tespit edilirse, kullanıcıya sorunsuz erişim sağlanana kadar destek verilir veya gerekirse ücret iadesi yapılır. Kullanıcı kaynaklı sorunlarda destek sağlanır ancak iade yapılmaz.
              </Paragraph>
            </PolicySection>
          </ContentCard>
        </Container>
      </Con>
      <Footer />
    </PageContainer>
  );
};

export default TeslimatIade;
