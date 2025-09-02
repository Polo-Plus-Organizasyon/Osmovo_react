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

  return (
    <MainContainer>
      <ContentWrapper>
        <Title>Planınızı Yükseltin</Title>
     
        <PricingGrid>
          {plansLoading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#111827'}}>
              Planlar yükleniyor...
            </div>
          ) : (
            plans.length === 0 ? (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#111827'}}>
                Hiç plan bulunamadı.
              </div>
            ) : (
              plans.map((plan) => (
                <Price key={plan.id} plan={plan} onSelect={checkout} />
              ))
            )
          )}
        </PricingGrid>
      </ContentWrapper>
    </MainContainer>
  )
}