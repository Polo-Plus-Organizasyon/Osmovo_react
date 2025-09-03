import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: ${props => props.bg || "#017399"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SocialMedias = () => {
  return (
    <SocialIcons>
      <SocialIcon href="https://www.facebook.com/poloplusofficial" target="_blank" rel="noopener noreferrer" bg="#3b5998">
        <FaFacebookF />
      </SocialIcon>
      <SocialIcon href="https://twitter.com/poloplusofficial" target="_blank" rel="noopener noreferrer" bg="#00acee">
        <FaTwitter />
      </SocialIcon>
      <SocialIcon href="https://www.instagram.com/poloplusofficial" target="_blank" rel="noopener noreferrer" bg="#e4405f">
        <FaInstagram />
      </SocialIcon>
      <SocialIcon href="https://www.linkedin.com/company/poloplus" target="_blank" rel="noopener noreferrer" bg="#0077b5">
        <FaLinkedinIn />
      </SocialIcon>
      <SocialIcon href="https://www.youtube.com/poloplusofficial" target="_blank" rel="noopener noreferrer" bg="#c4302b">
        <FaYoutube />
      </SocialIcon>
    </SocialIcons>
  );
};

export default SocialMedias;






