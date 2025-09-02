import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import { FaGraduationCap, FaCookie, FaDatabase, FaChartBar, FaGavel, FaUserShield, FaFileContract, FaSync } from 'react-icons/fa';

// Styled Components - Using the same design principles as TermsOfUse.jsx
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
  padding: 2.5rem 0; /* Adjusted padding */
  border-bottom: 1px solid #e9ecef; /* Lighter border */
  position: relative;
  transition: all 0.2s ease-in-out;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(0, 123, 255, 0.03); /* Subtle blue highlight on hover */
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px; /* Thicker accent line */
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
  gap: 1.2rem; /* Increased gap */
  margin-bottom: 1.8rem; /* Adjusted margin */
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px; /* Larger icon */
  height: 48px; /* Larger icon */
  background: linear-gradient(135deg, #007bff, #20c997); /* Consistent vibrant gradient */
  border-radius: 12px; /* Soft corners */
  color: white;
  font-size: 1.2rem; /* Clearer icon size */
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3); /* Subtle shadow */
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05); /* Gentle scale on hover */
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif; /* Consistent font */
  font-size: 1.6rem; /* Clear and prominent title */
  font-weight: 700; /* Bolder */
  color: #212529; /* Darker for better readability */
  margin: 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Paragraph = styled.p`
  font-family: 'Inter', sans-serif;
  line-height: 1.9; /* Further increased line-height */
  color: #495057; /* Slightly darker grey */
  margin: 1.2rem 0; /* More generous spacing */
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

const TagChip = styled.span`
  display: inline-block;
  background: #e9f5ff; /* Lighter blue for tags */
  color: #007bff;
  padding: 0.6rem 1.2rem; /* More padding */
  border-radius: 25px; /* Fully rounded for a modern look */
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.4rem 0.6rem 0.4rem 0; /* Adjusted margins */
  border: 1px solid #cce5ff; /* Light blue border */
`;

const LastUpdated = styled.div`
  text-align: center;
  padding: 2.5rem; /* More padding */
  background: #e9f5ff; /* Light blue background */
  border-top: 1px solid #cce5ff; /* Matching light blue border */
  font-family: 'Inter', sans-serif;
  color: #5a6268; /* Softer grey */
  font-size: 0.95rem; /* Slightly larger */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  svg {
    color: #007bff; /* Accent color for icon */
    font-size: 1.1rem;
  }
`;

const PrivacyPolicy = () => {
    return (
        <PageContainer>
            <Con>
                {/* Removed Navbar usage */}
                <Container>
                    <Title>
                        <FaUserShield /> Gizlilik Politikası
                    </Title>
                    <ContentCard>
                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaCookie />
                                </SectionIcon>
                                <SectionTitle>Çerez Politikası</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                <strong>PoloPlus</strong> tarafından işletilen <strong>Osmovo</strong> platformunu ziyaret ettiğinizde, kullanıcı deneyiminizi geliştirmek ve platformun daha verimli çalışmasını sağlamak amacıyla bazı küçük veri dosyaları, yani <strong>"çerezler" (cookies)</strong>, cihazınıza yerleştirilebilir.
                                <br /><br />
                                Bu dosyalar, kişisel bilgi içermez; yalnızca oturum süreciyle ilgili bazı teknik verileri barındırır ve sizi bir sonraki ziyaretinizde tanımamıza yardımcı olur. Bu kapsamda kullanılan çerezlerin içerikleri konusunda <strong>PoloPlus</strong> herhangi bir garanti vermez.
                            </Paragraph>
                            <div style={{marginTop: '1.5rem'}}>
                                <TagChip>Teknik Çerezler</TagChip>
                                <TagChip>Oturum Yönetimi</TagChip>
                                <TagChip>Kullanıcı Deneyimi</TagChip>
                            </div>
                        </PolicySection>

                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaDatabase />
                                </SectionIcon>
                                <SectionTitle>Veri Toplama ve İşleme</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                <strong>Osmovo</strong> platformunu kullanırken, <strong>üyelik</strong>, <strong>iletişim formları</strong>, <strong>yapay zeka destekli PDF analizi</strong>, <strong>interaktif eğitim içerikleri</strong> veya <strong>sosyal medya entegrasyonları</strong> üzerinden bize ilettiğiniz ya da platformu kullanım süresince otomatik olarak toplanan tüm bilgiler; veri güvenliği ilkeleri doğrultusunda saklanabilir, analiz edilebilir ve gerektiğinde kullanılabilir.
                                <br /><br />
                                <strong>PoloPlus</strong>, bu verileri yasal sınırlar içinde ve kullanıcı haklarına saygılı şekilde işler. Toplanan veriler arasında ad-soyad, e-posta adresi, kullanım verileri (ziyaret edilen sayfalar, platformda geçirilen süre, etkileşimler) ve teknik veriler (IP adresi, cihaz bilgileri) bulunabilir.
                            </Paragraph>
                            <HighlightBox>
                                <strong>Veri Güvenliği:</strong> Tüm kişisel verileriniz, modern şifreleme yöntemleri ve güvenlik protokolleri kullanılarak güvenli sunucularda saklanır ve yetkisiz erişime, değiştirilmeye veya açıklanmaya karşı korunur. Veri ihlallerine karşı gerekli idari ve teknik tedbirler alınmaktadır.
                            </HighlightBox>
                        </PolicySection>

                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaChartBar />
                                </SectionIcon>
                                <SectionTitle>Veri Kullanım Amaçları</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                Toplanan kişisel verileriniz başlıca şu amaçlarla işlenir:
                                <ul>
                                    <li><strong>Hizmet Sunumu:</strong> Osmovo platformunun sunduğu PDF analizi, chatbot, eğitim ve ödev takip hizmetlerini sağlamak.</li>
                                    <li><strong>Kullanıcı Deneyimi:</strong> Platformu kişiselleştirmek, içerikleri iyileştirmek ve kullanım kolaylığı sağlamak.</li>
                                    <li><strong>İletişim:</strong> Taleplerinize yanıt vermek, bilgilendirmeler ve duyurular göndermek.</li>
                                    <li><strong>Pazarlama:</strong> İzin vermeniz halinde size özel kampanya ve teklifler sunmak.</li>
                                    <li><strong>Analiz ve Geliştirme:</strong> Platformun performansını ölçmek, yeni özellikler geliştirmek ve istatistiksel analizler yapmak (anonimleştirilmiş verilerle).</li>
                                    <li><strong>Yasal Yükümlülükler:</strong> İlgili yasal mevzuattan kaynaklanan yükümlülükleri yerine getirmek.</li>
                                </ul>
                            </Paragraph>
                            <div style={{marginTop: '1.5rem'}}>
                                <TagChip>Hizmet Sunumu</TagChip>
                                <TagChip>Deneyim İyileştirme</TagChip>
                                <TagChip>Yasal Uyum</TagChip>
                            </div>
                        </PolicySection>

                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaGavel />
                                </SectionIcon>
                                <SectionTitle>Veri Paylaşımı</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                <strong>PoloPlus</strong>, kişisel verilerinizi yalnızca yasal zorunluluklar çerçevesinde, hizmet sağlayıcıları ile (örn. ödeme sistemleri, bulut hizmetleri, yapay zeka altyapısı sağlayıcıları) veya açık rızanızla üçüncü taraflarla paylaşabilir. 
                                Bu paylaşımlar sırasında veri güvenliği ve gizliliği en üst düzeyde tutulur ve ilgili sözleşmelerle güvence altına alınır. Hiçbir durumda verileriniz izinsiz olarak pazarlama amacıyla satılmaz veya kiralanmaz.
                            </Paragraph>
                        </PolicySection>

                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaUserShield />
                                </SectionIcon>
                                <SectionTitle>Kullanıcı Hakları</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                KVKK'nın 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
                                <ul>
                                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
                                    <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
                                    <li>Verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
                                    <li>Verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.</li>
                                    <li>Verilerin eksik ya da yanlış işlenmiş olması hâlinde düzeltilmesini isteme.</li>
                                    <li>Verilerin silinmesini ya da yok edilmesini talep etme.</li>
                                    <li>Verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
                                    <li>Zarara uğramanız hâlinde bu zararın giderilmesini talep etme.</li>
                                </ul>
                                Bu haklarınızı kullanmak için hello@poloplus.com.tr adresine e-posta gönderebilir veya Kınıklı Mahallesi Hüseyin Yılmaz Caddesi PAÜ B Blok No:67/2 Ofis No: Z-18 Pamukkale/DENİZLİ adresine yazılı olarak başvuruda bulunabilirsiniz.
                            </Paragraph>
                        </PolicySection>

                        <PolicySection>
                            <SectionHeader>
                                <SectionIcon>
                                    <FaSync />
                                </SectionIcon>
                                <SectionTitle>Politika Güncellemeleri</SectionTitle>
                            </SectionHeader>
                            <Paragraph>
                                <strong>PoloPlus</strong>, bu Gizlilik Politikası'nda herhangi bir zamanda, önceden bildirim yapmaksızın değişiklik yapma hakkını saklı tutar. Politika üzerinde yapılan her değişiklik, <strong>Osmovo</strong> platformunda yayınlandığı andan itibaren yürürlüğe girer.
                                <br /><br />
                                Kullanıcıların, güncel versiyonu düzenli olarak takip etmesi kendi sorumluluğundadır.
                            </Paragraph>
                            <HighlightBox>
                                <strong>Önemli Not:</strong> Gizliliğiniz bizim için esastır. Verileriniz, sadece belirtilen amaçlar doğrultusunda ve en yüksek güvenlik standartlarında işlenmektedir.
                            </HighlightBox>
                        </PolicySection>
                        <LastUpdated>
                            <FaSync />
                            Son güncelleme: 18 Haziran 2025
                        </LastUpdated>
                    </ContentCard>
                </Container>
            </Con>
            <Footer />
        </PageContainer>
    );
};

export default PrivacyPolicy;