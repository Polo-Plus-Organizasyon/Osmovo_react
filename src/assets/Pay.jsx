import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Calendar, Lock, Shield, CheckCircle, ShoppingCart } from 'lucide-react';
import styled, { createGlobalStyle } from 'styled-components';
import iyzico from "../assets/images/iyzico.png"
import { useParams } from 'react-router-dom';
import axios from 'axios';


const GlobalStyle = createGlobalStyle`

  p,h1,h2 {
  font-family: 'Poppins', sans-serif;
  }
  
 
`;

const ModernCheckout = () => {
    // Demo için planId'yi sabit değer olarak ayarlıyorum
    const planId = '1';

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const [showExpiryDropdown, setShowExpiryDropdown] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [showingMonths, setShowingMonths] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showContractModal, setShowContractModal] = useState(false);
    const expiryRef = useRef(null);
    const param = useParams();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`https://api.robark.com.tr/api/plans`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.status) {
                    setPlans(response.data.plans[param.planId - 1]);
                    console.log("Fetched Plans:", response.data.plans[param.planId - 1]);
                }
            } catch (error) {
                if (error.response) {
                    console.log("xxxxxxxxx:", error.response.status);
                } else {
                    console.error("Error fetching plans:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const TermsText = () => (
        <div className="text-sm text-gray-700 max-h-[80vh] overflow-y-auto p-6 font-sans" >
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900">ÖN BİLGİLENDİRME FORMU</h1>
            </div>
            <div className="space-y-6">
                <div>
                    <p>
                        İş bu ön bilgilendirme formunun ve ardından dijital ortamda imzalanacak mesafeli satış sözleşmesinin konusunu oluşturan ürün/hizmetin SATICI‘sı POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ olabileceği gibi SATICI www.robark.com.tr internet sitesini ve elektronik altyapısını kullanan başkaca 3. Kişiler olabilir. SATICI ve SATICI’ya ait iletişim bilgileri bu ön bilgilendirme formunda ve www.robark.com.tr internet sitesinde iş bu ön bilgilendirme formuna konu ürün veya hizmetin detaylarında belirtilir. SATICI‘nın POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ olmadığı ürün satışı ve teslimine ilişkin sözleşmelerde sözleşme konusu ürün veya hizmetin satışında POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ herhangi bir şekilde sözleşmenin tarafı olmayıp TÜKETİCİ VE SATICI‘nın yükümlülüklerini yerine getirmeleri ile ilgili herhangi bir sorumluluk ve taahhüt yükümlülüğü altında değildir.
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">1. Sözleşme konusu mal veya hizmetin adı, adeti, KDV dahil satış fiyatı, ödeme şekli ve temel nitelikleri</h2>
                    <div className="ml-4">
                        <p>
                            Yukarıdaki bölümde bankanıza iletilecek sipariş toplamının kaç taksitle ödeneceği bilgisi bulunmaktadır. Bankanız kampanyalar düzenleyerek sizin seçtiğiniz taksit adedinin daha üstünde bir taksit adedi uygulayabilir, taksit öteleme gibi hizmetler sunulabilir. Bu tür kampanyalar bankanızın inisiyatifindedir ve şirketimizin bilgisi dâhilinde olması durumunda sayfalarımızda kampanyalar hakkında bilgi verilmektedir. Kredi kartınızın hesap kesim tarihinden itibaren sipariş toplamı taksit adedine bölünerek kredi kartı özetinize bankanız tarafından yansıtılacaktır. Banka taksit tutarlarını küsurat farklarını dikkate alarak aylara eşit olarak dağıtmayabilir. Detaylı ödeme planınızın oluşturulması bankanız inisiyatifindedir.
                        </p>
                        <table className="w-full mt-4 mb-4 border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                                        Ürün Adı
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold w-24">
                                        Adet
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-right font-semibold w-48">
                                        Satış Tutarı (KDV dahil)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {plans?.plan_name || '-'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        1
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {plans?.price ? `₺${parseFloat(plans.price).toFixed(2)}` : '-'}
                                    </td>
                                </tr>
                                <tr className="bg-gray-50 font-semibold">
                                    <td colSpan={2} className="border border-gray-300 px-4 py-2">
                                        Net Tutar
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {plans?.price ? `₺${parseFloat(plans.price).toFixed(2)}` : '-'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <p>2. Satın alınacak aktivasyon kodu ayrıca ALICI’nın adresine gönderilmeyecektir.</p>
                </div>
                <div>
                    <p>
                        3. Tüketici (ALICI), 14 (ondört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin işbu Mesafeli Satış Sözleşmesi’nden cayma hakkına sahiptir. Cayma hakkı süresi, hizmet ifasına ilişkin sözleşmelerde sözleşmenin kurulduğu gün; mal teslimine ilişkin sözleşmelerde ise tüketicinin veya tüketici tarafından belirlenen üçüncü kişinin malı teslim aldığı gün başlar. Ancak tüketici, sözleşmenin kurulmasından malın teslimine kadar olan süre içinde de cayma hakkını kullanabilir. Cayma hakkı süresinin belirlenmesinde; SATICI ‘nın POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ olmadığı ürün satışı ve teslimine ilişkin mesafeli satış sözleşmelerinde POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ sözleşmenin tarafı olmadığından TÜKETİCİ’ nin POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ’ne karşı cayma hakkı, bedel iadesi veya ürün değişimi talep hakkı yoktur.
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">Cayma Bildirimi</h2>
                    <div className="ml-4">
                        <p>E-Posta: hello@robark.com.tr</p>
                        <p>Posta Adresi: KINIKLI MAH. HÜSEYİN YILMAZ CAD. PAMUKKALE ÜNİVERSİTESİ NO: 67 İÇ KAPI NO: 17-18 PAMUKKALE/ DENİZLİ</p>
                    </div>
                </div>
                <div>
                    <p>
                        Tüketici aşağıdaki sözleşmelerde cayma hakkını kullanamaz:
                        <ul className="list-disc ml-6 mt-2">
                            <li>Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve SATICI veya sağlayıcının kontrolünde olmayan mal veya hizmetlere ilişkin sözleşmeler.</li>
                            <li>Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda, kişiye özel hazırlanan ürün ve mallara ilişkin sözleşmeler.</li>
                            <li>Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.</li>
                            <li>Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.</li>
                            <li>Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler.</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <p>
                        4. Tüketicinin herhangi bir dijital içerik satın alması halinde dijital içeriklerin işlevselliğini etkileyecek teknik koruma önlemleri ve SATICI’nın bildiği ya da makul olarak bilmesinin beklendiği, dijital içeriğin hangi donanım ya da yazılımla birlikte çalışabileceğine ilişkin bilgiler satın alınan ürünün www.robark.com.tr'da satışa sunulduğu sayfadaki tanıtım içeriğinde yer almaktadır.
                    </p>
                </div>
                <div>
                    <p>
                        5. Tüketicilerin şikayet ve itirazları: Siparişinize ve/veya siparişinize konu ürüne ve/veya şiparişinizle ilgili herhangi bir konuda şikayetinizin olması halinde şikayetlerinizi
                        <br />
                        E-posta: hello@robark.com.tr
                        <br />
                        Adres: KINIKLI MAH. HÜSEYİN YILMAZ CAD. PAMUKKALE ÜNİVERSİTESİ NO: 67 İÇ KAPI NO: 17-18 PAMUKKALE/ DENİZLİ
                        <br />
                        iletişim kanallarından SATICI’ya iletebilirsiniz. İletmiş olduğunuz şikayet başvurularınız derhal kayıtlara alınacak, yetkili birimler tarafından değerlendirilerek çözümlenmeye çalışılacak ve en kısa sürede size geri dönüş sağlanacaktır.
                    </p>
                    <p>
                        Ayrıca, İş bu Sözleşme ile ilgili çıkacak ihtilaflarda; her yıl Gümrük ve Ticaret Bakanlığı tarafından ilan edilen değere kadar olan ihtilaflar için TÜKETİCİ işleminin yapıldığı veya TÜKETİCİ ikametgahının bulunduğu yerdeki İl veya İlçe Tüketici Hakem Heyetleri, söz konusu değerin üzerindeki ihtilaflarda ise TÜKETİCİ işleminin yapıldığı veya TÜKETİCİ ikametgahının bulunduğu yerdeki Tüketici Mahkemeleri yetkili olacaktır.
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">SATICI</h2>
                    <div className="ml-4 space-y-1">
                        <p>Unvanı: POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ</p>
                        <p>Adres: KINIKLI MAH. HÜSEYİN YILMAZ CAD. PAMUKKALE ÜNİVERSİTESİ NO: 67 İÇ KAPI NO: 17-18 PAMUKKALE/ DENİZLİ</p>
                        <p>Telefon: 0 (258) 215 51 05</p>
                        <p>E-posta: hello@robark.com.tr</p>
                        <p>Mersis Numarası: 07322178480700001</p>
                        <p>KEP Adresi: poloplus@hs03.kep.tr</p>
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">ALICI</h2>
                    <div className="ml-4 space-y-1">
                        <p>Ad Soyad / Unvan: {formData.firstName} {formData.lastName}</p>
                        <p>Adres: {formData.address}</p>
                        <p>Telefon: {formData.phone}</p>
                        <p>E-posta: {formData.email}</p>
                        <p>Tarih: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
                  {/* Teslimat ve İade Şartları Başlangıcı */}
      <div>
           <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900">Teslimat ve İade Şartları</h1>
            </div>
        <h3 className="font-semibold text-gray-800 mb-2">1. Teslimat Koşulları</h3>
        <p>
          Satın alınan tüm dijital eğitim içerikleri (video dersler, e-kitaplar, pdf dokümanlar, interaktif materyaller vb.) ödeme onayının tamamlanmasının ardından, kullanıcı hesabınıza tanımlanır ve erişiminiz aktif hale gelir.
        </p>
        <p>
          Dijital içeriklere erişim genellikle anlık olarak gerçekleşir. Ödeme sistemlerindeki yoğunluk veya teknik aksaklıklar nedeniyle erişimde gecikme yaşanması durumunda en geç 24 saat içerisinde erişim sağlanacaktır.
        </p>
        <p>
          Kullanıcılar, siteye kayıtlı mail adresi ve şifreleri ile 7 gün 24 saat boyunca satın aldıkları eğitim içeriklerine erişebilirler.
        </p>
        <p>
          Eğitim materyallerine erişim süresi, satın alınan ürün sayfasında belirtilen süre boyunca geçerlidir. Bazı eğitimler sınırsız erişim hakkı sunabilir.
        </p>
        <p>
          Fiziksel ürün teslimatı yapılmamaktadır; satın alma işlemi tamamen dijital ortamda gerçekleşir.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">2. İade Koşulları</h3>
        <p>
          Dijital içerikler, Tüketicinin Korunması Hakkında Kanun ve ilgili mesafeli satış yönetmelikleri kapsamında özel düzenlemelere tabidir.
        </p>
     
        <p>
Eğitim içeriklerine erişim sağılmış olsa bile, kullanıcılar satın alma tarihinden itibaren 14 gün içinde iade talebinde bulunabilirler. İade talepleri değerlendirildikten sonra, uygun bulunan iadeler 7 iş günü içinde ödenir.

        </p>
        <p>
          İade taleplerinde, kullanıcıların satın alma bilgilerini ve hesap bilgilerini doğru ve eksiksiz sunmaları gerekmektedir. Aksi takdirde iade işlemi gerçekleştirilemeyebilir.
        </p>
        <p>
          İade talepleri ve süreçleri, satın alınan ürünün kampanya ya da indirim koşullarına bağlı olarak değişiklik gösterebilir.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">3. Teknik Destek ve Erişim Sorunları</h3>
        <p>
          Eğitim içeriklerine erişim sırasında yaşanabilecek teknik sorunlar için kullanıcı destek hattımız hizmetinizdedir.
        </p>
        <p>
          Herhangi bir teknik aksaklık nedeniyle eğitim materyallerine erişemeyen kullanıcılarımız, destek ekibimizle iletişime geçerek sorunun çözümü için yardım talep edebilirler.
        </p>
        <p>
          Erişim sorunları kullanıcı kaynaklı şifre veya internet bağlantısı problemlerinden kaynaklanmıyorsa ve sorun tarafımızca tespit edilirse, kullanıcıya sorunsuz erişim sağlanana kadar destek verilir veya gerekirse ücret iadesi yapılır.
        </p>
      </div>
        </div>
    );

    const ContractText = () => (
        <div className="text-sm text-gray-700 whitespace-pre-line max-h-[80vh] overflow-y-auto p-6">
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900">MESAFELİ SATIŞ SÖZLEŞMESİ</h1>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">1. TARAFLAR</h2>
                    <div className="ml-4 space-y-4">
                        <div>
                            <p className="font-medium">1.1 Satıcıya Ait Bilgiler</p>
                            <div className="ml-4 mt-1">
                                <p>Unvanı: POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ</p>
                                <p>Adres: KINIKLI MAH. HÜSEYİN YILMAZ CAD. PAMUKKALE ÜNİVERSİTESİ NO: 67 İÇ KAPI NO: 17-18 PAMUKKALE/ DENİZLİ</p>
                                <p>Telefon: 0 (258) 215 51 05</p>
                                <p>E-posta: hello@robark.com.tr</p>
                                <p>Mersis Numarası: 07322178480700001</p>
                                <p>KEP Adresi: poloplus@hs03.kep.tr</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">1.2 Alıcıya Ait Bilgiler</p>
                            <div className="ml-4 mt-1 space-y-1">
                                <p>Adı Soyadı: {formData.firstName} {formData.lastName}</p>
                                <p>Adresi: {formData.address}</p>
                                <p>Telefon: {formData.phone}</p>
                                <p>E-posta: {formData.email}</p>
                                <p>Tarih: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">2. SÖZLEŞMENİN KONUSU VE ÜRÜN</h2>
                    <div className="ml-4">
                        <p>
                            İşbu Sözleşme’nin konusu, ALICI'nın SATICI'ya www.robark.com.tr uzantılı web sitesi ve buna bağlı tüm uygulamalar ("İnternet Sitesi") üzerinden elektronik ortamda sipariş verdiği, Robark Online Üyelik Sözleşmesi, Ön Bilgilendirme Formu ve internet sitesinde nitelikleri ve satış bedeli belirtilen hizmetin ("Hizmet") sunumu ve satışı ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun ("6502 Sayılı Kanun") ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince Taraflar’ın karşılıklı hak ve yükümlülüklerinin belirlenmesidir.
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">3. SÖZLEŞMEYE KONU HİZMET BİLGİLERİ VE SATIŞ BEDELİ</h2>
                    <div className="ml-4 space-y-4">
                        <div>
                            <p className="font-medium">3.1. Sözleşme konusu hizmetin nitelikleri, türü, satış bedeli ve ödeme koşulları ilgili faturada belirtilmektedir.</p>
                            <table className="w-full mt-4 mb-4 border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                                            Ürün Adı
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-center font-semibold w-24">
                                            Adet
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-right font-semibold w-48">
                                            Satış Tutarı (KDV dahil)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {plans?.plan_name || '-'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            1
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {plans?.price ? `₺${parseFloat(plans.price).toFixed(2)}` : '-'}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50 font-semibold">
                                        <td colSpan={2} className="border border-gray-300 px-4 py-2">
                                            Net Tutar
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {plans?.price ? `₺${parseFloat(plans.price).toFixed(2)}` : '-'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p className="font-medium">3.2. SATICI tarafından sunulan tüm Hizmetler mesafeli sözleşmeler hükümlerine tabi olacaktır.</p>
                        </div>
                        <div>
                            <p className="font-medium">3.3. SATICI tarafından ALICI’ya ödeme yapabileceği tek bir yöntem sunulmuştur. ALICI tarafından İnternet Sitesi üzerinden Hizmet alınması halinde altyapısı iyzico tarafından sağlanan online ödeme yöntemiyle kredi kartı bilgilerini girerek ödeme gerçekleştirilecektir.</p>
                        </div>
                        <div>
                            <p className="font-medium">3.4. Sözleşme konusu hizmetin süresi ve kapsamı, ALICI’nın, SATICI tarafından İnternet Sitesi’nde sunulan eğitimlerin tamamına aktivasyon kodunu aktif ettikten sonra belirtilen süre boyunca erişim hakkı olacaktır. Süre boyunca yeni eklenen eğitimler de otomatik olarak ALICI’nın hesabına eklenecektir.</p>
                        </div>
                        <div>
                            <p className="font-medium">Fatura Bilgileri:</p>
                            <p>Ad Soyad / Unvan: {formData.firstName} {formData.lastName}</p>
                            <p>Adres: {formData.address}</p>
                            <p>Telefon: {formData.phone}</p>
                            <p>E-posta: {formData.email}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">4. GENEL ŞARTLAR</h2>
                    <div className="ml-4 space-y-2">
                        <p>4.1. Hizmet, İnternet Sitesı’nde veya değişiklik durumunda SATICI tarafından belirlenecek olan internet sitesinde ifa edilecektir.</p>
                        <p>4.2. ALICI, SATICI’dan satın aldığı aktivasyon kodunu kullanabilmek için internet sitesine üye olmalıdır.</p>
                        <p>4.3. Sözleşmesi onaylanan ve ödemesi yapılan üyeye, satın alma işleminin şirkete ulaştığını gösteren bilgi mesajı e-posta adresine gönderilecektir.</p>
                        <p>4.4. Ürün/hizmet alımının eksiksiz olarak gerçekleşmesi halinde, e-fatura veya e-arşiv fatura en geç 30 iş günü içinde ALICI’nın sözleşmede belirtilen adresine gönderilecektir.</p>
                        <p>4.5. Kredi kartı ödeme tarihi banka ile ALICI arasındaki sözleşme hükümlerince belirlenir. ALICI, bankanın gönderdiği hesap özetinden ödemelerini takip edebilir.</p>
                        <p>4.6. ALICI'nın kredi kartı ile yapmış olduğu işlemlerde temerrüde düşmesi halinde, ALICI bankanın kendisi ile yapmış olduğu kredi kartı sözleşmesi çerçevesinde faiz ödeyecek ve bankaya karşı sorumlu olacaktır. ALICI'nın borcundan dolayı temerrüde düşmesi halinde, borcun gecikmeli ifasından dolayı SATICI'nın hiçbir sorumluluğu olmayacaktır.</p>
                        <p>4.7. SATICI, haklı bir sebebe dayanmak suretiyle sözleşmeden doğan ifa yükümlülüğünü ALICI'ya eşit kalite ve/veya fiyatta farklı bir hizmet sunmak suretiyle yerine getirebilir.</p>
                        <p>4.8. ALICI, işbu Sözleşme ve Robark Üyelik Sözleşmesi’nden doğan haklarını ve üyeliğini üçüncü kişilere devir ve temlik edemez.</p>
                        <p>4.9. ALICI, satın aldığı eğitim programının SATICI tarafından siteden kaldırılabileceğini ve SATICI’nın internet sitesini kapatma hakkının saklı bulunduğunu, bu durumlarda SATICI’dan herhangi bir talepte bulunamayacağını kabul, beyan ve taahhüt eder. Bu durumlar hariç olmak üzere SATICI, aktivasyon kodunun geçerlilik süresi boyunca içerik ve özelliklere erişim hakkı sağlar.</p>
                        <p>4.10. SATICI, İnternet Sitesi’nde oluşabilecek dizgi ve sistem hatalarından kaynaklanan fiyat ve içerik hatalarından sorumlu değildir.</p>
                        <p>4.11. ALICI, online ödeme yöntemi sırasında verilecek kart bilgilerinin doğruluğundan sorumludur.</p>
                        <p>4.12. Kartın hamili haricinde bir başkası tarafından hukuka aykırı şekilde kullanılması halinde Banka Kartları ve Kredi Kartları Kanunu ve ilgili yönetmelik hükümlerine göre işlem yapılır. Sipariş karşılığı fiş/fatura/e-fatura SATICI tarafından düzenlenir.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">5. ALICININ BEYAN VE TAAHHÜTLERİ</h2>
                    <div className="ml-4 space-y-2">
                        <p>5.1. ALICI, satın aldığı ürün/hizmet içeriğinde yer alan tüm materyallerin telif haklarının SATICI’ya ait olduğunu kabul eder ve SATICI’dan izin almadan şifrelerini ve eğitim içeriklerini başkalarıyla paylaşmayacağını, içerikleri kopyalayıp çoğaltmayacağını taahhüt eder.</p>
                        <p>5.2. ALICI’nın siparişe konu olan ürüne/hizmete çok sayıda farklı IP adresinden ulaştığı tespit edilirse, ALICI şirket tarafından uyarılır ya da ürüne/hizmete erişimi iptal edilebilir. Bu durumda ödenen ücret iade edilmez.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">6. SATICININ BEYAN VE TAAHHÜTLERİ</h2>
                    <div className="ml-4 space-y-2">
                        <p>6.1. SATICI, sözleşme konusu ürünü/hizmeti Tüketici Mevzuatı'na uygun olarak, eksiksiz, siparişte belirtilen niteliklere uygun olarak ALICI’ya sunmakla mükelleftir.</p>
                        <p>6.2. SATICI, mücbir sebepler ya da olağanüstü durumlarda sözleşme konusu ürünü/hizmeti ALICI’ya sunamazsa bu durumu mümkün olan en kısa sürede ALICI’ya bildirmekle mükelleftir.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">7. CAYMA HAKKI VE İSTİSNALARI</h2>
                    <div className="ml-4 space-y-2">
                        <p>7.1. ALICI, Tüketici Mevzuatı uyarınca, işbu Sözleşme’nin onaylanarak, Hizmeti satın alma tarihinden itibaren 14 (ondört) gün içinde İnternet Sitesi üzerinden ya da hello@robark.com.tr adresine e-posta göndererek, cayma bildirimini SATICI’ya bildirmek kaydıyla sözleşmeden cayma ve üyeliğini iptal ettirme hakkına sahiptir. Bu durumda söz konusu satın alma 14 (ondört) gün içerisinde herhangi bir kesinti yapılmaksızın ALICI’ya iade edilecektir.</p>
                        <p>7.2. 14 (on dört) günlük cayma süresi dolmadan önce ALICI’nın, SATICI’dan satın aldığı aktivasyon kodunu kullanması Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi uyarınca “Cayma Hakkının İstisnası” niteliği taşıdığından, ilgili aktivasyon kodunun aktifleştirilmesi ile birlikte ALICI cayma hakkını kullanamayacaktır.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">8. MÜCBİR SEBEP</h2>
                    <div className="ml-4 space-y-2">
                        <p>8.1. Şirketin çalışma imkânlarını kısmen veya tamamen, geçici veya daimi olarak durduracak şekilde ve derecede meydana gelen kanunlarla belirlenmiş doğal afetler, harp, seferberlik, yangın, infilak, grev, lokavt, yetki iptali, durdurma, resmi merciler tarafından alınmış kararlar ve şirketin kontrolü haricinde meydana gelen haller mücbir sebep sayılır. Bu gibi durumlarda mücbir sebebin devamı süresince şirket yükümlülüklerini yerine getirmemesi veya geç yerine getirmesi sebebiyle sorumlu olmayacaktır. Kurum mücbir sebebin meydana gelişini müteakip derhal yazılı veya diğer iletişim kanalları ile üyeye durumu bildirecektir.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">9. KREDİ KARTINA İADE PROSEDÜRÜ</h2>
                    <div className="ml-4 space-y-2">
                        <p>9.1. ALICI'nın cayma hakkını kullandığı durumlarda ya da siparişe konu olan ürünün çeşitli sebeplerle tedarik edilememesi veya Hakem heyeti kararları ile Tüketiciye bedel iadesine karar verilen durumlarda, kredi kartına iade prosedürü aşağıda belirtilmiştir:</p>
                        <p>9.2. ALICI hello@robark.com.tr adresine e-posta göndererek iade talebinde bulunur.</p>
                        <p>9.3. SATICI, ödenen tutarın tamamının, ALICI’ya ödenmesi için, web sitesindeki ödeme sistemi üzerinden iade işlemini başlatır.</p>
                        <p>9.4. SATICI, bir iade işlemi söz konusu olduğunda ilgili yazılım aracılığı ile ödemenin iadesini yapacak olup, Üye işyeri yani SATICI ilgili tutarı Bankaya nakden veya mahsuben ödemekle yükümlü olduğundan yukarıda bahsedilen prosedür gereğince ALICI’ya nakit olarak ödeme yapılamamaktadır. İade işleminin sonuçlanması, bankanın hızına bağlı olarak birkaç iş günü sürebilir.</p>
                        <p>9.5. Kredi kartına iade, SATICI tarafından sağlanan online ödeme sistemi üzerinden bankaya bedeli tek seferde ödemesinden sonra, Banka tarafından yukarıdaki prosedür gereğince yapılacaktır. ALICI, bu prosedürü okuduğunu ve kabul ettiğini kabul ve taahhüt eder.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">10. İHTİLAFLARIN HALLİ</h2>
                    <div className="ml-4">
                        <p>İşbu Sözleşme’nin uygulanmasından doğan uyuşmazlıklarda Ticaret Bakanlığı tarafından belirlenen parasal sınırlar dâhilinde ALICI'nın hizmet satın aldığı veya ikametgâhının bulunduğu yerdeki Tüketici Sorunları Hakem Heyeti veya Tüketici Mahkemeleri yetkilidir.</p>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900 mb-3">11. YÜRÜRLÜK</h2>
                    <div className="ml-4 space-y-2">
                        <p>11.1. İşbu Sözleşme’nin kabul edilerek onaylanması ve internet sitesi üzerinden verilen siparişe ait ödemenin gerçekleşmesi ile birlikte ALICI, işbu Sözleşme’nin tüm koşullarını kabul etmiş sayılacak ve işbu Sözleşme yürürlüğe girecektir.</p>
                        <p>11.2. ALICI, SATICI’nın isim, unvan, açık adres, telefon ve diğer erişim bilgileri, Sözleşme konusu hizmetin temel nitelikleri, vergiler dahil olmak üzere satış fiyatı, ödeme şekli, satışa konu hizmet ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı, şikayet ve itirazlarını iletebilecekleri resmi makamlar ve sözleşmenin getirdiği tüm hak ve yükümlülükler konusunda anlaşılır, internet ortamına ve 6502 Sayılı Kanun’a uygun şekilde SATICI tarafından bilgilendirildiğini, bu hususlarda doğru ve eksiksiz olarak bilgi sahibi olduğunu, bu ön bilgileri elektronik ortamda teyit ettiğini ve sonrasında hizmet siparişi verdiğini kabul, beyan ve taahhüt eder.</p>
                        <p>11.3. www.robark.com.tr sitesinde yer alan KVKK Aydınlatma Metni ve Gizlilik Sözleşmesi, Ön Bilgilendirme Formu, Robark Üyelik Sözleşmesi ve ALICI tarafından verilen sipariş üzerine düzenlenen fatura işbu Sözleşme’nin ayrılmaz parçalarıdır.</p>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t">
                    <div className="space-y-2">
                        <p className="font-medium">SATICI: POLO PLUS MAKİNA ARGE DANIŞMANLIK İMALAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ</p>
                        <p className="font-medium">ALICI:  {formData.firstName} {formData.lastName}</p>
                        <p>Tarih: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
                              {/* Teslimat ve İade Şartları Başlangıcı */}
      <div>
           <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900">Teslimat ve İade Şartları</h1>
            </div>
        <h3 className="font-semibold text-gray-800 mb-2">1. Teslimat Koşulları</h3>
        <p>
          Satın alınan tüm dijital eğitim içerikleri (video dersler, e-kitaplar, pdf dokümanlar, interaktif materyaller vb.) ödeme onayının tamamlanmasının ardından, kullanıcı hesabınıza tanımlanır ve erişiminiz aktif hale gelir.
        </p>
        <p>
          Dijital içeriklere erişim genellikle anlık olarak gerçekleşir. Ödeme sistemlerindeki yoğunluk veya teknik aksaklıklar nedeniyle erişimde gecikme yaşanması durumunda en geç 24 saat içerisinde erişim sağlanacaktır.
        </p>
        <p>
          Kullanıcılar, siteye kayıtlı mail adresi ve şifreleri ile 7 gün 24 saat boyunca satın aldıkları eğitim içeriklerine erişebilirler.
        </p>
        <p>
          Eğitim materyallerine erişim süresi, satın alınan ürün sayfasında belirtilen süre boyunca geçerlidir. Bazı eğitimler sınırsız erişim hakkı sunabilir.
        </p>
        <p>
          Fiziksel ürün teslimatı yapılmamaktadır; satın alma işlemi tamamen dijital ortamda gerçekleşir.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">2. İade Koşulları</h3>
        <p>
          Dijital içerikler, Tüketicinin Korunması Hakkında Kanun ve ilgili mesafeli satış yönetmelikleri kapsamında özel düzenlemelere tabidir.
        </p>
     
        <p>
Eğitim içeriklerine erişim sağılmış olsa bile, kullanıcılar satın alma tarihinden itibaren 14 gün içinde iade talebinde bulunabilirler. İade talepleri değerlendirildikten sonra, uygun bulunan iadeler 7 iş günü içinde ödenir.

        </p>
        <p>
          İade taleplerinde, kullanıcıların satın alma bilgilerini ve hesap bilgilerini doğru ve eksiksiz sunmaları gerekmektedir. Aksi takdirde iade işlemi gerçekleştirilemeyebilir.
        </p>
        <p>
          İade talepleri ve süreçleri, satın alınan ürünün kampanya ya da indirim koşullarına bağlı olarak değişiklik gösterebilir.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">3. Teknik Destek ve Erişim Sorunları</h3>
        <p>
          Eğitim içeriklerine erişim sırasında yaşanabilecek teknik sorunlar için kullanıcı destek hattımız hizmetinizdedir.
        </p>
        <p>
          Herhangi bir teknik aksaklık nedeniyle eğitim materyallerine erişemeyen kullanıcılarımız, destek ekibimizle iletişime geçerek sorunun çözümü için yardım talep edebilirler.
        </p>
        <p>
          Erişim sorunları kullanıcı kaynaklı şifre veya internet bağlantısı problemlerinden kaynaklanmıyorsa ve sorun tarafımızca tespit edilirse, kullanıcıya sorunsuz erişim sağlanana kadar destek verilir veya gerekirse ücret iadesi yapılır.
        </p>
      </div>
        </div>
    );
    // Şehirleri API'den çek
    useEffect(() => {
        const fetchCities = async () => {
            try {
                setCitiesLoading(true);
                const response = await fetch('https://api.robark.com.tr/api/cities');
                const result = await response.json();

                if (result.status && result.cities) {
                    setCities(result.cities);
                } else {
                    console.error('Şehirler yüklenemedi:', result.message);
                    // Fallback olarak eski şehirler listesi kullanılabilir
                }
            } catch (error) {
                console.error('Şehirler yüklenirken hata oluştu:', error);
            } finally {
                setCitiesLoading(false);
            }
        };

        fetchCities();
    }, []);

    const months = [
        { value: '01', label: '1' },
        { value: '02', label: '2' },
        { value: '03', label: '3' },
        { value: '04', label: '4' },
        { value: '05', label: '5' },
        { value: '06', label: '6' },
        { value: '07', label: '7' },
        { value: '08', label: '8' },
        { value: '09', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' }
    ];

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year <= currentYear + 20; year++) {
            years.push({
                value: year.toString().slice(-2),
                label: year.toString()
            });
        }
        return years;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            const formatted = value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            const matches = formatted.match(/\d{4,16}/g);
            const match = matches && matches[0] || '';
            const parts = [];

            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }

            setFormData(prev => ({
                ...prev,
                [name]: parts.length ? parts.join(' ') : formatted
            }));
        } else if (name === 'phone') {
            let phoneValue = value.replace(/\D/g, '');
            if (phoneValue.length > 10) phoneValue = phoneValue.substring(0, 10);

            if (phoneValue.length > 0) {
                if (phoneValue.length <= 3) {
                    phoneValue = phoneValue;
                } else if (phoneValue.length <= 6) {
                    phoneValue = phoneValue.substring(0, 3) + ' ' + phoneValue.substring(3);
                } else {
                    phoneValue = phoneValue.substring(0, 3) + ' ' + phoneValue.substring(3, 6) + ' ' + phoneValue.substring(6);
                }
            }
            setFormData(prev => ({ ...prev, [name]: phoneValue }));
        } else if (name === 'cvv') {
            let cvvValue = value.replace(/\D/g, '');
            if (cvvValue.length > 3) cvvValue = cvvValue.substring(0, 3);
            setFormData(prev => ({ ...prev, [name]: cvvValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleExpiryClick = () => {
        setShowExpiryDropdown(true);
        setShowingMonths(true);
    };

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        setShowingMonths(false);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setFormData(prev => ({
            ...prev,
            expiryDate: `${selectedMonth}/${year}`
        }));
        setShowExpiryDropdown(false);
        setShowingMonths(true);
    };

    const validateStep = (step) => {
        if (step === 1) {
            const required = ['firstName', 'lastName', 'email', 'phone', 'city', 'address'];
            for (let field of required) {
                if (!formData[field].trim()) {
                    alert('Lütfen tüm zorunlu alanları doldurun.');
                    return false;
                }
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return false;
            }

            const phoneNumber = formData.phone.replace(/\s/g, '');
            if (phoneNumber.length !== 10) {
                alert('Lütfen geçerli bir telefon numarası girin (10 hane).');
                return false;
            }
        }

        return true;
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) return;

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const submitPayment = async () => {
        if (!validateStep(1)) return;

        setIsLoading(true);

        try {
            const paymentData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone.replace(/\s/g, ''),
                city: formData.city,
                address: formData.address,
                plan_id: planId,
            };

            const response = await fetch('https://api.robark.com.tr/api/payment/activation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });
            const result = await response.json();

            if (result.status && result.paymentUrl) {
                window.location.href = result.paymentUrl;
            } else {
                alert('Ödeme başlatılamadı: ' + result.message);
            }

        } catch (error) {
            console.error('Payment error:', error);
            alert('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    const restartProcess = () => {
        setCurrentStep(1);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            address: '',
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: ''
        });
        setSelectedMonth('');
        setSelectedYear('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (expiryRef.current && !expiryRef.current.contains(event.target)) {
                setShowExpiryDropdown(false);
                setShowingMonths(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <GlobalStyle />
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
                                Robark Sipariş Tamamlama
                            </h1>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span>Güvenli Ödeme</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Progress Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <span className="mt-3 text-lg font-semibold text-gray-800">
                                    Fatura Bilgileri
                                </span>
                                <span className="text-sm text-gray-600">
                                    Siparişinizi tamamlamak için bilgilerinizi girin
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <div className="space-y-6">
                            {/* İsim Soyisim */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ad <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Adınızı girin"
                                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Soyad <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Soyadınızı girin"
                                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* E-posta */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    E-posta Adresi <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="ornek@email.com"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Telefon */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Cep Telefonu <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="555 555 55 55"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Şehir */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Şehir <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-gray-900 appearance-none cursor-pointer"
                                        required
                                        disabled={citiesLoading}
                                    >
                                        <option value="">
                                            {citiesLoading ? 'Şehirler yükleniyor...' : 'Şehir seçin...'}
                                        </option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Adres */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Adres Bilgisi <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Mahalle, sokak, apartman no ve diğer adres detayları..."
                                        rows={4}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-gray-900 placeholder-gray-400 resize-none"
                                        required
                                    />
                                </div>
                            </div>



                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    onClick={submitPayment}
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            İşlem Yapılıyor...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-5 h-5" />
                                            Güvenli Satın Al
                                        </>
                                    )}
                                </button>
                                <img src={iyzico} style={{ height: "30px", margin: "15px auto" }} />
                            </div>

                            {/* Alt Bilgi */}
                            <div className=" pt-4" >
                                <p className="text-s text-gray-500" style={{ fontFamily: "Poppins" }}>
                                    Satın Al butonuna tıklayarak{" "}
                                    <span
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => setShowTermsModal(true)}
                                    >
                                        Ön Bilgilendirme Koşulları
                                    </span>{" "}
                                    ve{" "}
                                    <span
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => setShowContractModal(true)}
                                    >
                                        Mesafeli Satış Sözleşmesi
                                    </span>
                                    'ni kabul etmiş olursunuz.
                                </p>

                                {/* Ön Bilgilendirme Formu Modalı */}
                                {showTermsModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative max-h-[90vh] overflow-y-auto">
                                            <button
                                                onClick={() => setShowTermsModal(false)}
                                                className="absolute top-2 right-3 text-gray-500 text-2xl"
                                            >
                                                &times;
                                            </button>
                                            <TermsText />
                                        </div>
                                    </div>
                                )}

                                {/* Mesafeli Satış Sözleşmesi Modalı */}
                                {showContractModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative max-h-[90vh] overflow-y-auto">
                                            <button
                                                onClick={() => setShowContractModal(false)}
                                                className="absolute top-2 right-3 text-gray-500 text-2xl"
                                            >
                                                &times;
                                            </button>
                                            <ContractText />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernCheckout;

