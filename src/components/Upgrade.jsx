import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Price from './Price'

const PricingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 40px;
    justify-content: center; /* Center items in the grid */
    width: 100%;
`;

const MainContainer = styled.div`
  padding: 60px 20px;
  min-height: 100vh;
  background: #f0f2f5; /* Light gray background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  color: #333;
`;

const ContentWrapper = styled.div`
  max-width: 70%;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1a202c;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 800;
`;

export default function Upgrade() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        const res = await axios.get('https://api.osmovo.com/api/plans');
        if (res.data && Array.isArray(res.data.plans)) {
          setPlans(res.data.plans);
        } else {
          setPlans([]);
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setPlans([]);
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const checkout = async (id) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || (/token=/.test(document.cookie) ? 'cookie' : null);
    const target = `/checkout/${id}`;
    if (!token) {
      navigate('/login?redirect=' + encodeURIComponent(target), { replace: true });
      return;
    }
    navigate(target);
  };

  // Determine filtered plans based on renewal_days when available.
  // Fallback: if no plan includes renewal_days, show all plans for both tabs.
  const hasRenewalInfo = plans.some(p => p && (p.renewal_days !== undefined && p.renewal_days !== null));

  const filteredPlans = (() => {
    if (!hasRenewalInfo) return plans;

    return plans.filter(p => {
      if (!p) return false;
      const rd = Number(p.renewal_days);
      if (!isFinite(rd)) return false;
      if (billingCycle === 'monthly') {
        // treat <= 31 days as monthly
        return rd <= 31;
      }
      // treat >= 360 days as yearly
      return rd >= 360;
    });
  })();

  return (
    <MainContainer>
      <ContentWrapper>
        <Title>Planınızı Yükseltin</Title>

        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
          <div style={{display: 'inline-flex', background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: billingCycle === 'monthly' ? '#0f1724' : 'transparent',
                color: billingCycle === 'monthly' ? '#fff' : '#0f1724',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Aylık Planlar
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: billingCycle === 'yearly' ? '#0f1724' : 'transparent',
                color: billingCycle === 'yearly' ? '#fff' : '#0f1724',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Yıllık Planlar
            </button>
          </div>
        </div>

        <PricingGrid>
          {plansLoading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#111827'}}>
              Planlar yükleniyor...
            </div>
          ) : (
            filteredPlans.length === 0 ? (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#111827'}}>
                Hiç plan bulunamadı.
              </div>
            ) : (
              filteredPlans.map((plan) => (
                <Price key={plan.id} plan={plan} onSelect={checkout} />
              ))
            )
          )}
        </PricingGrid>
      </ContentWrapper>
    </MainContainer>
  )
}