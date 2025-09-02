import React, { useState } from 'react';
import styled from 'styled-components';

import Footer from './Footer';
// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 4rem ;
  position: relative;
  z-index: 1;
  width: 60%;
`;
const Con = styled.div`
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;
background-color: #fcfdff;
overflow-x: hidden;
background-image: radial-gradient(rgba(12, 12, 12, 0.075) 2px, transparent 0);
background-size: 30px 30px;
background-position: -5px -5px;

`;

const HeroSection = styled.div`
  text-align:center;
  margin-bottom: 4rem;
  font-family: Poppins;
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.1;
    font-family: Poppins;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #017399 0%, #0296c7 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
    font-family: Poppins;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #017399, #0296c7);
    border-radius: 2px;
    opacity: 0.3;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
    font-family: Poppins;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #017399, #0296c7, #38bdf8);
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Poppins;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #017399, #0296c7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px -8px rgba(1, 115, 153, 0.5);
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 1.5rem;
    font-family: Poppins;
  strong {
    color: #1e293b;
    font-weight: 600;
  }
  
  a {
    color: #017399;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    
    &:hover {
      color: #0296c7;
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background: rgba(255, 255, 255, 0.95);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #017399, #0296c7);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(1, 115, 153, 0.1), rgba(2, 150, 199, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  svg {
    color: #017399;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }
  
  ${FeatureCard}:hover & {
    background: linear-gradient(135deg, #017399, #0296c7);
    transform: scale(1.1);
    
    svg {
      color: white;
      transform: scale(1.1);
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
    font-family: Poppins;
`;

const FeatureDescription = styled.p`
  font-size: 15px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
    font-family: Poppins;
`;

const CTASection = styled.div`
  margin-top: 4rem;
`;

const CTACard = styled.div`
  background: linear-gradient(135deg, #017399 0%, #0296c7 50%, #38bdf8 100%);
  border-radius: 24px;
  padding: 3rem;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(1, 115, 153, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
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
    padding: 2rem;
  }
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #017399;
  padding: 16px 32px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #017399, #0296c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
`;

const Kvkk = () => {



  return (
    <PageContainer>
      <Con >


        <Container>

          <Section>
            <SectionCard>
              <SectionTitle>
                
                KVKK Aydınlatma Metni
              </SectionTitle>
              <Paragraph>
                KİŞİSEL VERİLERİN KORUNMASI HAKKINDA AYDINLATMA METNİ

                Bu metin, PoloPlus tarafından işletilen Osmovo platformu kapsamında, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca sizleri kişisel verilerinizin toplanma şekli, işlenme amacı, aktarımı ve haklarınız hakkında bilgilendirmek amacıyla hazırlanmıştır.

                Şirketimiz PoloPlus olarak, kişisel verilerinizin gizliliğine büyük önem veriyor, verilerinizi KVKK ve ilgili diğer mevzuata uygun şekilde işliyoruz. www.poloplus.com.tr veya osmovo.com internet sitemizi ziyaret ettiğinizde, Osmovo platformumuza üye olduğunuzda, yapay zeka destekli PDF sohbet robotumuzu kullandığınızda, interaktif eğitim içeriklerinden faydalandığınızda, ödev ve test yüklemeleri yaptığınızda, iletişim formlarını kullandığınızda, e-posta, telefon veya diğer yollarla bize ulaştığınızda bize ilettiğiniz veya sistemlerimiz aracılığıyla elde ettiğimiz veriler, veri sorumlusu sıfatıyla tarafımızca kaydedilmekte, saklanmakta ve gerektiğinde işlenmektedir.

                Kişisel verileriniz; Osmovo platformunun sunduğu PDF analizi, yapay zeka destekli chatbot hizmetleri, interaktif eğitim içeriklerinin sunulabilmesi, kullanıcı deneyiminizin iyileştirilmesi, ödev ve test takibinin yapılması, detaylı öğrenci istatistiklerinin oluşturulması, öğretmen paneli aracılığıyla dijital yönetim, esnek paket sisteminden faydalanmanız, talep ve başvurularınıza yanıt verilebilmesi, yasal yükümlülüklerimizin yerine getirilebilmesi, ticari faaliyetlerimizin yürütülebilmesi, finansal süreçlerin takibi, sistem güvenliğinin sağlanması ve sizlere özel içerik, kampanya ve bilgilendirmelerin sunulabilmesi gibi amaçlarla işlenebilir.

                Şirketimiz PoloPlus, elde edilen kişisel verileri yalnızca yukarıda belirtilen amaçlar doğrultusunda ve ilgili mevzuatta öngörülen çerçevede, gerekli görüldüğü durumlarda yurt içinde veya yurt dışında iş ortaklarıyla (örneğin yapay zeka hizmet sağlayıcıları), tedarikçilerle, yetkili kamu kurumlarıyla ve kanunen yetkilendirilmiş özel kişi veya kuruluşlarla paylaşabilir. Bu paylaşımlar sırasında veri güvenliğine ilişkin her türlü teknik ve idari tedbir alınmaktadır.

                Kişisel verileriniz, Şirketimize ait Osmovo dijital platformu, elektronik formlar, e-posta yazışmaları, çağrı merkezi görüşmeleri, fiziksel formlar ve benzeri çeşitli yollarla, otomatik ya da otomatik olmayan yöntemlerle toplanabilir. Veriler, yasal süreler boyunca saklanmakta olup, işlenmesini gerektiren nedenlerin ortadan kalkması halinde, şirket politikaları ve KVKK’ya uygun şekilde silinir, yok edilir veya anonim hale getirilir.

                KVKK’nın 11. maddesi uyarınca, kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, verilerin eksik ya da yanlış işlenmiş olması hâlinde düzeltilmesini isteme, verilerin silinmesini ya da yok edilmesini talep etme, verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve zarara uğramanız hâlinde bu zararın giderilmesini talep etme haklarına sahipsiniz.

                Bu haklarınızı kullanmak üzere hello@poloplus.com.tr e-posta adresine başvurabilir ya da Kınıklı Mahallesi Hüseyin Yılmaz Caddesi PAÜ B Blok No:67/2 Ofis No: Z-18 Pamukkale/DENİZLİ adresine yazılı olarak başvuruda bulunabilirsiniz. Talebiniz, niteliğine göre mümkün olan en kısa sürede ve en geç KVKK’da belirtilen süreler içinde yanıtlanacaktır.

                Saygılarımızla,
                PoloPlus

              </Paragraph>

            </SectionCard>
          </Section>

        </Container>


      </Con>
      <Footer />
    </PageContainer>
  );
};

export default Kvkk;