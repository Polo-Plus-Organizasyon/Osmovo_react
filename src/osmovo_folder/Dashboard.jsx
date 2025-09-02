import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import osmovo_logo from '../assets/images/osmovo_logo.svg'
import styled, { keyframes } from 'styled-components';
import osmovo_amblem from '../assets/images/osmovo_amblem.svg'
import { Route, Routes } from 'react-router-dom';
import Tickets from '../components/Tickets';
import formatStorageSize from '../../src/utils/formatStorageSize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb; /* bg-gray-50 */
  font-family: sans-serif; /* font-sans */
  overflow:hidden;
`;

const ConversationSidebar = styled.div`
  width: ${props => props.isOpen ? '320px' : '64px'}; /* w-80 vs w-16 */
  transition: all 0.3s ease-in-out; /* transition-all duration-300 */
  background-color: #ffffff; /* bg-white */
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-shadow: ${props => props.isOpen ? '2px 0 15px rgba(0,0,0,0.05)' : 'none'};
  border-right: ${props => props.isOpen ? '1px solid #e5e7eb' : 'none'};

  @media (max-width: 768px) {
    position: fixed;
    height: 100vh;
    z-index: 50;
  }
`;

const SidebarHeader = styled.div`
  height: 64px; /* h-16 */
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px; /* px-4 */
  padding-right: 16px; /* px-4 */
  border-bottom: 1px solid #f3f4f6; /* Lighter border */
  background-color: #ffffff; /* Ensure white background */
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* space-x-3 */
`;

const LogoImage = styled.img`
  height: 40px; /* h-10 */
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
`;

const ToggleSidebarButton = styled.button`
  padding: 8px;
  color: #9ca3af;
  &:hover { color: #4b5563; background-color: #f3f4f6; } /* Stronger hover background */
  border-radius: 8px;
  transition: all 0.2s ease-in-out; /* Smoother transition */
  ${props => props.isCollapsed && `
    margin-left: auto;
    margin-right: auto;
  `}
`;

const SidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NewChatButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background:#111827 ; /* Modern gradient */
  color: #ffffff;
  border-radius: 8px;
  border: none; /* Ensure no border */
  font-weight: 600; /* Bolder text */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* More prominent shadow */
  &:hover { 
    background: linear-gradient(to right, #5a60c8, #7a5cd0); /* Slightly different gradient on hover */
    transform: translateY(-2px); /* Slight lift effect */
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
  }
  transition: all 0.2s ease-in-out; /* Smoother transition */
`;

const NewChatButtonContainer = styled.div`
  padding: 16px; /* p-4 */
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px; /* Increased padding */
  font-size: 14px;
  border: 1px solid #d1d5db; /* Lighter border */
  border-radius: 10px; /* More rounded corners */
  background-color: #f9fafb; /* Light background */
  &:focus { 
    outline: none; 
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2); /* Custom focus ring color */
    border-color: #4f46e5; /* Custom border color on focus */
    background-color: #ffffff; /* White background on focus */
  }
  transition: all 0.2s ease-in-out; /* Smoother transition */
`;

const SearchInputContainer = styled.div`
  padding: 0 16px 8px 16px; /* px-4 pb-2 */
`;

const ConversationsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-left: 8px; /* px-2 */
  padding-right: 8px; /* px-2 */
  padding-bottom: 16px; /* pb-4 */
  min-height: 0;
  max-height: calc(100vh - 280px); /* Adjust based on header/footer height */
`;

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px; /* Slightly reduced padding */
  border-radius: 10px; /* Slightly less rounded */
  cursor: pointer;
  transition: all 0.2s ease-in-out; /* Smoother transition */
  background-color: ${props => props.isSelected ? '#eef2ff' : 'transparent'}; /* Light indigo for selected */
  border: ${props => props.isSelected ? '1px solid #c7d2fe' : '1px solid transparent'}; /* Border for selected */
  &:hover { 
    background-color: ${props => props.isSelected ? '#e0e7ff' : '#f3f4f6'}; /* Darker indigo or light gray on hover */
    transform: translateY(-1px); /* Subtle lift on hover */
  }
`;

const ConversationTitle = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 14px; /* text-s */
  font-weight: 500; /* font-medium */
  color: #111827; /* text-gray-900 */
  white-space: nowrap; /* truncate */
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px; /* mt-0.5 */
`;

const ConversationDate = styled.div`
  font-size: 12px; /* text-xs */
  color: #9ca3af; /* text-gray-400 */
  margin-top: 2px; /* mt-0.5 */
`;

const DeleteConversationButton = styled.button`
  margin-left: 8px; /* Slightly reduced margin */
  padding: 6px; /* Slightly reduced padding */
  width: 28px; /* Smaller button */
  height: 28px; /* Smaller button */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  &:hover { 
    color: #ef4444; 
    background-color: #fee2e2; /* Light red on hover */
    transform: translateY(-1px); /* Subtle lift on hover */
  }
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
`;

const NoConversationsMessage = styled.div`
  color: #6b7280; /* text-gray-500 */
  font-size: 14px; /* text-sm */
  text-align: center;
  padding-top: 32px; /* py-8 */
  padding-bottom: 32px; /* py-8 */
`;

const UserProfileContainer = styled.div`
  border-top: 1px solid #f3f4f6; /* Lighter border */
  padding: 16px; /* Adjusted padding */
  margin-top: auto;
  flex-shrink: 0;
  background-color: #ffffff;
  position: relative;
`;

const UserProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* space-x-3 */
`;

const UserAvatar = styled.div`
  width: 32px; /* w-8 */
  height: 32px; /* h-8 */
  background-color: #e5e7eb; /* bg-gray-200 */
  border-radius: 9999px; /* rounded-full */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 14px; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #111827; /* text-gray-900 */
  white-space: nowrap; /* truncate */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  font-size: 12px; /* text-xs */
  color: #6b7280; /* text-gray-500 */
  &:hover { color: #374151; } /* hover:text-gray-700 */
`;

const UserProfileDropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex; /* Make it a flex container */
  align-items: center; /* Vertically align items */
  justify-content: space-between; /* Space out content and dropdown arrow */
  padding: 10px 12px; /* Add padding to the clickable area */
  border-radius: 10px; /* Rounded corners */
  &:hover {
    background-color: #f3f4f6; /* Light gray background on hover */
  }
  transition: all 0.2s ease-in-out;
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 10px; /* More space between profile and dropdown */
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px; /* More rounded */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* Softer, larger shadow */
  border: 1px solid #e5e7eb;
  padding: 8px 0;
  z-index: 20; /* Higher z-index to ensure it's on top */
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(15px)'}; /* Larger slide effect */
  transition: opacity 0.3s ease-out, transform 0.3s ease-out, visibility 0.3s;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  background: none;
  border: none;
  font-size: 14px;
  color: #374151; /* Darker gray text */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px; /* Increased gap for icon and text */
  &:hover {
    background-color: #eef2ff; /* Light indigo background on hover */
    color: #4f46e5; /* Indigo text on hover */
  }
  transition: all 0.15s ease-in-out;
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #f3f4f6;
  margin: 8px 0;
`;

const SettingsButton = styled(DropdownItem)`
  color: #374151;
`;

const CreateTicketButton = styled(DropdownItem)`
  color: #374151;
`;


const MainChatArea = styled.div`
  flex: 1; /* flex-1 */
  display: flex;
  flex-direction: column;
  min-height: 0;
  
`;

const ChatHeader = styled.div`
  height: 64px; /* h-16 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px; /* px-6 */
  padding-right: 24px; /* px-6 */
  border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
  background-color: #ffffff; /* bg-white */
  
`;

const ChatTitle = styled.h2`
  font-size: 18px; /* text-lg */
  font-weight: 600; /* font-semibold */
  color: #111827; /* text-gray-900 */
`;

const UpgradeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px; /* space-x-2 */
  padding: 6px 12px; /* px-3 py-1.5 */
  background-color: #000000; /* bg-black */
  color: #ffffff; /* text-white */
  font-size: 14px; /* text-sm */
  font-weight: 500; /* font-medium */
  border-radius: 9999px; /* rounded-full */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  &:hover { background-color: #1f2937; } /* hover:bg-gray-900 */
  &:focus { outline: none; ring: 2px solid rgba(0,0,0,0.2); } /* focus:outline-none focus:ring-2 focus:ring-black/20 */
  transition: all 0.15s ease-in-out; /* transition-all */
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px; /* p-6 */
  background-color: #f9fafb; /* bg-gray-50 */
  scroll-behavior: smooth;
  

`;

const WelcomeMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 32px;
  border-radius: 16px;
  backdrop-filter: blur(5px); /* Subtle blur effect */
  color: #2c3e50; /* Darker text for contrast */
`;

const WelcomeContent = styled.div`
  text-align: center;
  max-width: 700px; /* Increased max-width */
  padding: 40px;
  border-radius: 12px;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const WelcomeIconWrapper = styled.div`
  width: 140px; /* Larger icon */
  height: 140px; /* Larger icon */
  border-radius: 50%; /* Circular */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px auto; /* Centered, more space below */
  color: #ffffff;
  font-size: 36px; /* Larger icon size */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const WelcomeTitle = styled.h3`
  font-size: 32px; /* Larger title */
  font-weight: 700; /* Bolder */
  color: #1a202c; /* Very dark text */
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`;

const WelcomeSubtitle = styled.p`
  color: #4a5568; /* Medium-dark gray */
  font-size: 18px; /* Larger subtitle */
  line-height: 1.6;
  margin-bottom: 32px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive grid */
  gap: 20px; /* Increased gap */
  text-align: center;
  margin-top: 24px;
`;

const FeatureCard = styled.div`
  padding: 20px;
  background: #f8faff; /* Very light blue background */
  border-radius: 10px;
  border: 1px solid #e2e8f0; /* Soft border */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  cursor: pointer;


  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #a7b7ff; /* Blue border on hover */
  }
`;

const FeatureIconWrapper = styled.div`
  width: 48px; /* Larger icon */
  height: 48px; /* Larger icon */
  background-color: ${props => props.iconBg || '#cbd5e0'}; /* Dynamic or default light gray */
  border-radius: 8px; /* Rounded square */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #ffffff;
  font-size: 24px;
`;

const FeatureTitle = styled.h4`
  font-weight: 600;
  font-size: 18px;
  color: #2d3748; /* Darker gray */
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  font-size: 15px;
  color: #718096; /* Medium gray */
  line-height: 1.5;
`;

const ChatMessagesWrapper = styled.div`
  space-y: 24px; /* space-y-6 */
  max-width: 50%; /* max-w-3xl */
  margin-left: auto; /* mx-auto */
  margin-right: auto; /* mx-auto */
`;

const MessageBubble = styled.div`
  display: flex;
  justify-content: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};

`;

const MessageContent = styled.div`
  max-width: 1024px; /* max-w-lg */
  padding: 12px 16px; /* px-4 py-3 */
  border-radius: 16px; /* rounded-2xl */
  background-color: ${props => props.sender === 'user' ? '#111827' : '#ffffff'}; /* bg-gray-900 vs bg-white */
  color: ${props => props.sender === 'user' ? '#ffffff' : '#111827'}; /* text-white vs text-gray-900 */
  border: ${props => props.sender === 'user' ? 'none' : '1px solid #e5e7eb'}; /* border border-gray-200 */
  box-shadow: ${props => props.sender === 'user' ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}; /* shadow-sm */
  word-break: break-word; /* wordBreak: 'break-word' */
  display: flex;
  flex-direction: column;
  align-items: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
      margin-top: 50px; /* mx-auto */

`;

const MessageText = styled.div`
  font-size: 14px; /* text-sm */
  white-space: pre-wrap;
  width: 100%;

  /* Better table styles for rendered markdown */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 14px;
    overflow: auto;
  }

  th, td {
    border: 1px solid #e5e7eb;
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #f3f4f6;
    font-weight: 600;
  }

  /* Responsive wrapper fallback: allow horizontal scroll on small screens */
  .md-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

// Render markdown with KaTeX support for math blocks and inline math
const RenderMarkdownWithMath = ({ content }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const value = String(children).replace(/\n$/, '');
      if (!inline && className === 'language-math') {
        return <BlockMath>{value}</BlockMath>;
      }
      return <code className={className} {...props}>{children}</code>;
    }
  };

  const renderWithInlineMath = (text) => {
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        return <InlineMath key={idx}>{math}</InlineMath>;
      }
      return <ReactMarkdown key={idx} children={part} components={components} />;
    });
  };

  if (typeof content === 'string' && content.includes('$')) {
    return <div>{renderWithInlineMath(content)}</div>;
  }

  // Wrap rendered markdown tables in a responsive wrapper
  return (
    <div className="md-table-wrapper">
      <ReactMarkdown children={content} components={components} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

const MessageTimestamp = styled.div`
  font-size: 12px; /* text-xs */
  margin-top: 8px; /* mt-2 */
  opacity: 0.7;
`;

const ChatInputSection = styled.div`
  border-top: 1px solid #e5e7eb; /* border-t border-gray-200 */
  background-color: #ffffff; /* bg-white */
  padding: 24px; /* py-6 px-6 */
`;

const ChatInputForm = styled.form`
  max-width: 896px; /* max-w-4xl */
  margin-left: auto; /* mx-auto */
  margin-right: auto; /* mx-auto */
`;

const ChatInputFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px; /* space-x-4 */
`;

const ChatInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0; /* No gap for the input and send button */
  flex: 1;
  border: 1px solid #e5e7eb; /* Light border for the whole input group */
  border-radius: 12px; /* Rounded corners for the whole group */
  background-color: #ffffff; /* White background */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* subtle shadow */
  &:focus-within {
    outline: none;
    border-color: #007bff; /* Blue border on focus */
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2); /* Blue focus ring */
  }
`;

const AttachButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b7280; /* text-gray-500 */
  &:hover { color: #4b5563; } /* hover:text-gray-700 */
  padding: 8px; /* p-2 */
  border-radius: 9999px; /* rounded-full */
  background-color: #f9fafb; /* bg-gray-50 */
  &:hover { background-color: #f3f4f6; } /* hover:bg-gray-100 */
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px; /* px-4 py-3 */
  border: none; /* Remove individual border */
  border-radius: 12px 12px 0 0; /* Top-left rounded, top-right rounded, no bottom */
  &:focus { outline: none; } /* Remove focus ring */
  background-color: transparent; /* Transparent background */
  color: #111827; /* Dark text */
  &::placeholder { color: #888; } /* Gray placeholder */
`;

const SendMessageButton = styled.button`
  width: 48px; /* w-12 */
  height: 48px; /* h-12 */
  background-color: #111827; /* bg-gray-900 */
  border-radius: 12px; /* rounded-xl */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff; /* text-white */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md */
  &:hover { background-color: #1f2937; } /* hover:bg-gray-800 */
  transition: background-color 0.15s ease-in-out; /* transition-colors */
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ChatInputBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6; /* Light gray border */
  margin-top: 8px; /* Space from the input field */
`;

const ChatInputButtons = styled.div`
  display: flex;
  gap: 16px; /* space-x-4 */
`;

const ChatActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px; /* space-x-1 */
  color: #6b7280; /* text-gray-500 */
  
  border-right: 1px solid black ;
  font-size: 14px;
  &:hover { color: #4b5563; } /* hover:text-gray-700 */
`;

const ChatCharacterCount = styled.div`
  font-size: 12px;
  color: #9ca3af; /* text-gray-400 */
`;

const PdfSidebar = styled.div`
  width: ${props => props.isOpen ? '384px' : '64px'}; /* w-96 vs w-16 */
  transition: all 0.3s ease-in-out; /* transition-all duration-300 */
  background-color: #ffffff; /* bg-white */
  border-left: 1px solid #e5e7eb; /* border-l border-gray-200 */
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 768px) {
    position: fixed;
    right: 0;
    height: 100vh;
    z-index: 50;
  }
`;

const PdfSidebarHeader = styled(SidebarHeader)`
  justify-content: ${props => props.isOpen ? 'space-between' : 'center'};
`;

const UploadSection = styled.div`
  padding: 0 24px 16px 24px; /* px-6 mb-4 */
`;

const UploadForm = styled.form`
  space-y: 12px; /* space-y-3 */
`;

const PdfUploadCard = styled.div`
  background-color: #ffffff; /* bg-white */
  padding: 16px; /* p-4 */
  border-radius: 16px; /* rounded-2xl */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  border: 1px solid #f3f4f6; /* border border-gray-100 */
`;

const PdfUploadLabel = styled.label`
  display: block;
  font-size: 14px; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
  margin-bottom: 8px; /* mb-2 */
`;

const FileInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* space-x-3 */
`;

const PdfSelectButton = styled.button`
  flex: 1;
  padding: 8px 16px; /* px-4 py-2 */
  font-size: 14px; /* text-sm */
  border: 1px solid #e5e7eb; /* border border-gray-200 */
  border-radius: 12px; /* rounded-xl */
  color: #374151; /* text-gray-700 */
  background-color: #ffffff; /* bg-white */
  &:hover { background-color: #f9fafb; } /* hover:bg-gray-50 */
  transition: background-color 0.15s ease-in-out; /* transition-colors */
  white-space: nowrap; /* truncate */
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PdfUploadButton = styled.button`
  padding: 8px 16px; /* px-4 py-2 */
  background-color: #4f46e5; /* bg-indigo-600 */
  color: #ffffff; /* text-white */
  border-radius: 12px; /* rounded-xl */
  &:hover { background-color: #4338ca; } /* hover:bg-indigo-700 */
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  transition: background-color 0.15s ease-in-out; /* transition-colors */
  display: flex;
  align-items: center;
`;

const ProjectListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 16px; /* px-4 */
  padding-right: 16px; /* px-4 */
  padding-bottom: 16px; /* pb-4 */
  min-height: 0;
`;

const ProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px; /* mb-3 */
`;

const ProjectsTitle = styled.h3`
  font-size: 14px; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
`;

const ViewAllButton = styled.button`
  font-size: 12px; /* text-xs */
  color: #6b7280; /* text-gray-500 */
  &:hover { color: #374151; } /* hover:text-gray-700 */
`;

const ProjectCardsWrapper = styled.div`
  overflow-y: auto;
  space-y: 12px; /* space-y-3 */
  max-height: calc(100vh - 320px); /* Adjust based on header/upload/footer height */
`;

const NoProjectMessage = styled.div`
  text-align: center;
  padding-top: 32px; /* py-8 */
`;

const NoProjectIconWrapper = styled.div`
  width: 64px; /* w-16 */
  height: 64px; /* h-16 */
  background-color: #f3f4f6; /* bg-gray-100 */
  border-radius: 16px; /* rounded-2xl */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px; /* mx-auto mb-3 */
`;

const NoProjectText = styled.p`
  font-size: 14px; /* text-sm */
  color: #6b7280; /* text-gray-500 */
`;

const NoProjectSubtext = styled.p`
  font-size: 12px; /* text-xs */
  color: #9ca3af; /* text-gray-400 */
  margin-top: 4px; /* mt-1 */
`;

const ProjectCard = styled.div`
  padding: 12px; /* p-3 */
  border-radius: 16px; /* rounded-2xl */
  background-color: #ffffff; /* bg-white */
  &:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); } /* hover:shadow-md */
  transition: all 0.15s ease-in-out; /* transition-all */
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 12px; /* space-x-3 */
  border: ${props => props.isSelected ? '2px solid #6366f1; background-color: #eef2ff; ring: 1px solid #c7d2fe;' : '1px solid #f3f4f6;'};
`;

const ProjectIconWrapper = styled.div`
  width: 48px; /* w-12 */
  height: 48px; /* h-12 */
  background-color: #fee2e2; /* bg-red-50 */
  border-radius: 12px; /* rounded-xl */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ProjectDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px; /* mb-1 */
`;

const ProjectName = styled.h4`
  font-size: 14px; /* text-sm */
  font-weight: 600; /* font-semibold */
  color: #111827; /* text-gray-900 */
  white-space: nowrap; /* truncate */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectSize = styled.div`
  font-size: 12px; /* text-xs */
  color: #9ca3af; /* text-gray-400 */
`;

const ProjectDate = styled.div`
  font-size: 12px; /* text-xs */
  color: #6b7280; /* text-gray-500 */
  margin-bottom: 8px; /* mb-2 */
`;

const ProjectActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectStatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* space-x-2 */
`;

const StatusDot = styled.div`
  width: 8px; /* w-2 */
  height: 8px; /* h-2 */
  border-radius: 9999px; /* rounded-full */
  background-color: #22c55e; /* bg-green-500 */
`;

const ProjectStatusText = styled.span`
  font-size: 12px; /* text-xs */
  color: #6b7280; /* text-gray-500 */
`;

const ProjectButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* space-x-2 */
`;

const ProjectActionButton = styled.button`
  padding: 8px; /* p-2 */
  color: #9ca3af; /* text-gray-400 */
  &:hover { color: #4b5563; } /* hover:text-gray-600 */
  border-radius: 8px; /* rounded-lg */
  background-color: #f9fafb; /* bg-gray-50 */
  &:hover { background-color: #f3f4f6; } /* hover:bg-gray-100 */
  transition: all 0.15s ease-in-out; /* transition-colors */
`;

const DeleteProjectButton = styled(ProjectActionButton)`
  &:hover { color: #ef4444; background-color: #fef2f2; } /* hover:text-red-500 hover:bg-red-50 */
`;

const MorePdfsButton = styled.div`
  margin-top: 16px; /* mt-4 */
  text-align: center;
`;

const MorePdfsText = styled.button`
  font-size: 14px; /* text-sm */
  color: #6b7280; /* text-gray-500 */
  &:hover { color: #374151; } /* hover:text-gray-700 */
`;

const BottomActionsContainer = styled.div`
  border-top: 1px solid #e5e7eb; /* border-t border-gray-200 */
  padding: 16px; /* p-4 */
`;

const BottomActionsFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px; /* text-sm */
`;

const SelectAllPdfsButton = styled.button`
  color: #4b5563; /* text-gray-600 */
  &:hover { color: #374151; } /* hover:text-gray-800 */
  transition: color 0.15s ease-in-out; /* transition-colors */
`;

const DeleteSelectedPdfsButton = styled.button`
  color: #ef4444; /* text-red-600 */
  &:hover { color: #dc2626; } /* hover:text-red-800 */
  transition: color 0.15s ease-in-out; /* transition-colors */
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* bg-black bg-opacity-50 */
  z-index: 40;
`;

const SupportSidebar = styled.div`
  width: ${props => props.isOpen ? '420px' : '0'}; /* Adjust width as needed */
  transition: all 0.3s ease-in-out;
  background-color: #f8fafc; /* Tailwind: bg-slate-50 */
  border-left: 1px solid #e2e8f0; /* Tailwind: border-slate-200 */
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 50;
  overflow-x: hidden;
`;

const SupportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px; /* px-6 py-4 */
  background-color: #1a1a1b; /* Dark background for header */
  color: #ffffff;
  flex-shrink: 0;
`;

const SupportTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const SupportCloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 24px;
  padding: 8px;
  &:hover {
    color: #e2e8f0;
  }
`;

const SupportContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SupportSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const StatusCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIcon = styled.div`
  color: #22c55e; /* Green-500 */
  font-size: 24px;
`;

const StatusText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusMain = styled.span`
  font-weight: 600;
  color: #111827;
`;

const StatusUpdate = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const SendMessageCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const SendMessageText = styled.span`
  font-size: 16px;
  color: #111827;
`;

const SendMessageIcon = styled.div`
  color: #3b82f6; /* Blue-500 */
`;

const SearchHelpContainer = styled.div`
  background-color: #e0f2f7; /* Light blue background */
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #a7d9f0;
`;

const SearchHelpInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 16px;
  color: #111827;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #4b5563;
  }
`;

const SearchHelpIcon = styled.div`
  color: #4b5563;
`;

const HelpArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HelpArticleItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 0;
  background: none;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  font-size: 15px;
  color: #111827;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: #3b82f6;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const HelpArticleTitle = styled.span`
  flex: 1;
`;

const HelpArticleArrow = styled.div`
  color: #9ca3af;
`;

const TicketFormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TicketFormHeader = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const TicketCategoryDisplay = styled.div`
  background-color: #eef2ff; /* bg-indigo-50 */
  color: #4f46e5; /* text-indigo-600 */
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
`;

const TicketFormLabel = styled.label`
  font-size: 14px;
  color: #374151;
  margin-bottom: 4px;
`;

const TicketSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M5.293%207.293L10%2012l4.707-4.707a1%201%200%20011.414%200%201%201%200%20010%201.414l-5.414%205.414a1%201%200%2001-1.414%200L3.879%208.707a1%201%200%20010-1.414%201%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const TicketInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const TicketTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const TicketFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

const TicketSubmitButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
    background-color: #4338ca;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TicketCancelButton = styled.button`
  background-color: #e5e7eb;
  color: #374151;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
    background-color: #d1d5db;
  }
`;

const TicketListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TicketListItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

const TicketListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const TicketListItemTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TicketListItemStatus = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 9999px;
  background-color: ${props => {
    switch (props.status) {
      case 'new': return '#fef3c7'; // yellow-100
      case 'open': return '#dbeafe'; // blue-100
      case 'closed': return '#d1fae5'; // green-100
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'new': return '#d97706'; // yellow-700
      case 'open': return '#2563eb'; // blue-700
      case 'closed': return '#059669'; // green-700
      default: return '#4b5563';
    }
  }};
  margin-left: 8px;
`;

const TicketListItemCategory = styled.span`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const TicketListItemDate = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

const TicketDetailContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TicketDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TicketDetailTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

const TicketDetailNumber = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const TicketDetailInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
`;

const TicketDetailInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketDetailInfoLabel = styled.span`
  font-weight: 500;
  color: #111827;
`;

const TicketDetailMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const TicketMessageBubble = styled.div`
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 85%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isUser ? '#eef2ff' : '#f3f4f6'}; /* indigo-50 vs gray-100 */
  color: #111827;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const TicketMessageHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.isUser ? '#4f46e5' : '#374151'}; /* indigo-600 vs gray-700 */
`;

const TicketMessageText = styled.p`
  font-size: 14px;
  white-space: pre-wrap;
`;

const TicketMessageDate = styled.span`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 8px;
  display: block;
  text-align: ${props => props.isUser ? 'right' : 'left'};
`;

const TicketAttachmentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TicketAttachment = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background-color: #e0f2f7; /* light blue for attachments */
  border-radius: 6px;
  font-size: 12px;
  color: #0c4a6e; /* dark blue for text */
  text-decoration: none;

  &:hover {
    background-color: #bae6fd; /* lighter blue on hover */
  }
`;

const TicketBackToListButton = styled.button`
  margin-top: 24px;
  padding: 10px 20px;
  background-color: #6b7280; /* gray-500 */
  color: #ffffff;
  border-radius: 8px;
  font-weight: 500;
  align-self: flex-start;

  &:hover {
    background-color: #4b5563; /* gray-700 */
  }
`;

const TicketReplySection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TicketReplyTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const TicketReplyActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TicketReplyAttachmentInput = styled.input`
  display: none; /* Hide default file input */
`;

const TicketReplyAttachmentLabel = styled.label`
  padding: 8px 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const TicketReplySubmitButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
    background-color: #4338ca;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const UsageRights = styled.div`
  padding: 16px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  color: #4b5563;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UsageRightsTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

const UsageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UsageLabel = styled.span`
  font-weight: 500;
`;

const UsageValue = styled.span`
  color: #6b7280;
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'info': return '#d1ecf1';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'info': return '#0c5460';
      default: return '#383d41';
    }
  }};
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'info': return '#bee5eb';
      default: return '#dae0e5';
    }
  }};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  animation: fadeInOut 5s forwards;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); display: none; }
  }
`;

const NotificationMessage = styled.span`
  font-weight: 500;
`;

const NotificationCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const Dashboard = () => {
  // State management
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isConversationSidebarOpen, setIsConversationSidebarOpen] = useState(true);
  const [isPdfSidebarOpen, setIsPdfSidebarOpen] = useState(true);
  const [conversationFilter, setConversationFilter] = useState('');
  const [selectedPdfs, setSelectedPdfs] = useState(new Set());
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false); // New state for ticket form visibility
  const [selectedTicketCategory, setSelectedTicketCategory] = useState(null); // New state for selected category
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium'); // New state for ticket priority
  const [userTickets, setUserTickets] = useState([]); // New state for user tickets
  const [selectedTicket, setSelectedTicket] = useState(null); // New state for selected ticket details
  const [isViewingTicketsList, setIsViewingTicketsList] = useState(false); // New state to control ticket list view
  const [selectedTicketFile, setSelectedTicketFile] = useState(null); // New state for ticket attachment
  const [ticketReplyMessage, setTicketReplyMessage] = useState(''); // New state for ticket reply message
  const [selectedReplyFile, setSelectedReplyFile] = useState(null); // New state for ticket reply attachment
  const dropdownRef = useRef(null);
  const supportSidebarRef = useRef(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success', 'error', 'info'
    isVisible: false,
  });

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (supportSidebarRef.current && !supportSidebarRef.current.contains(event.target)) {
        // setIsSupportSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, supportSidebarRef, isProfileDropdownOpen]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("https://api.osmovo.com/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        })
        setUser(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    fetchTicketCategories();
  }, []);

  const fetchTicketCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("https://api.osmovo.com/api/ticket/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTicketCategories(res.data.ticket_categories);
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
    }
  };

  const fetchUserTickets = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api.osmovo.com/api/tickets', { // Assuming this endpoint returns all user tickets
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserTickets(response.data.data);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`https://api.osmovo.com/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedTicket(response.data.data);
      console.log('Ticket responses fetched:', response.data.data.responses); // Log new responses
    } catch (error) {
      console.error('Error fetching ticket details:', error);
    }
  };

  // Refs
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const convListRef = useRef(null);

  // Load data on component mount
  useEffect(() => {
    loadConversations();
    loadUploadedPdfs();
  }, []);

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      try {
        chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
      } catch (e) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);

  // Load conversations from API
  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('https://api.osmovo.com/api/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const list = (res.data && res.data.conversations) ? res.data.conversations.map(c => ({
        id: c.id,
        title: c.title,
        createdAt: c.created_at || c.createdAt,
        lastUpdated: c.updated_at || c.lastUpdated,
        message_count: c.message_count || 0
      })) : [];

      setConversations(list);
      if (list.length > 0 && !currentConversation) {
        setCurrentConversation(list[0]);
        fetchConversationMessages(list[0].id);
      }
    } catch (error) {
      console.error('Error loading conversations from API:', error);
      setConversations([]);
    }
  };

  // Delete a document by id via API
  const deleteDocument = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://api.osmovo.com/api/document/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (err) {
      const resp = err?.response?.data;
      if (resp && resp.errors && typeof resp.errors === 'object') {
        const messages = Object.values(resp.errors).flat().join('\n');
        window.alert(messages);
      } else if (resp && resp.message) {
        window.alert(resp.message);
      } else {
        console.error('Delete error', err);
        window.alert('Dosya silinirken hata oluştu.');
      }
      return false;
    }
  };

  // Load uploaded PDFs from API
  const loadUploadedPdfs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('https://api.osmovo.com/api/documents', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const docs = (res.data && res.data.documents) ? res.data.documents.map(d => ({
        id: d.id,
        name: d.original_filename || d.filename,
        serverFilename: d.filename,
        path: d.path,
        mime_type: d.mime_type,
        size: d.size ? Math.round(parseFloat(d.size) * 1024 * 1024) : 0,
        uploadedAt: d.created_at || new Date().toISOString()
      })) : [];

      setUploadedPdfs(docs);
    } catch (error) {
      console.error('Error loading documents from API:', error);
      setUploadedPdfs([]);
    }
  };

  // Fetch messages for a conversation from API
  const fetchConversationMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`https://api.osmovo.com/api/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const conv = res.data || {};
      const msgs = conv.messages || [];
      const mapped = msgs.map(m => ({
        id: m.id || Date.now(),
        text: m.content || m.text || '',
        timestamp: m.created_at || m.timestamp || new Date().toISOString(),
        sender: m.role === 'assistant' ? 'ai' : 'user'
      }));
      mapped.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(mapped);
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
      setMessages([]);
    }
  };

  // Handle message submission
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const token = localStorage.getItem('authToken');
    const userMessage = { id: Date.now(), text: inputMessage, timestamp: new Date().toISOString(), sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage(''); // Clear input immediately

    // Add a placeholder AI message
    const aiPlaceholderMessage = { id: Date.now() + 1, text: '...', timestamp: new Date().toISOString(), sender: 'ai', isLoading: true };
    setMessages(prev => [...prev, aiPlaceholderMessage]);


    try {
      let res;
      if (!currentConversation) {
        // Start a new conversation
        const requestData = {
          first_message: userMessage.text,
          document_ids: Array.from(selectedPdfs)
        };
        res = await axios.post('https://api.osmovo.com/api/conversations', requestData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newConversation = {
          id: res.data.conversation.id,
          title: res.data.conversation.title,
          createdAt: res.data.conversation.created_at,
          lastUpdated: res.data.conversation.updated_at,
          message_count: res.data.conversation.messages.length
        };
        setCurrentConversation(newConversation);
        setConversations(prev => [...prev, newConversation]);
        fetchConversationMessages(newConversation.id); // Fetch all messages for the new conversation
      } else {
        // Add message to existing conversation
        const requestData = {
          role: "user",
          content: userMessage.text,
          document_ids: Array.from(selectedPdfs) // Include selected PDFs for existing conversations
        };
        res = await axios.post(`https://api.osmovo.com/api/conversations/${currentConversation.id}/add-message`, requestData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchConversationMessages(currentConversation.id); // Refresh messages to include AI response
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Remove placeholder message and add an error message
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      setMessages(prev => [...prev, { id: Date.now(), text: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.', timestamp: new Date().toISOString(), sender: 'ai' }]);
    } finally {
      // The fetchConversationMessages call will update the messages, removing the placeholder
      // and replacing it with the actual AI response.
      // So, we don't need to explicitly remove the placeholder here.
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  // Handle PDF upload
  const handlePdfUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const token = localStorage.getItem('authToken');
    const form = new FormData();
    form.append('file', selectedFile);

    try {
      const res = await axios.post('https://api.osmovo.com/api/upload', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const data = res.data || {};
      const uploaded = {
        id: data.document_id || Date.now(),
        name: data.original_filename || data.filename || selectedFile.name,
        serverFilename: data.filename,
        path: data.path,
        size: data.size || (selectedFile.size ? +(selectedFile.size / (1024 * 1024)).toFixed(2) : 0),
        uploadedAt: new Date().toISOString(),
        text_extracted: data.text_extracted || false
      };

      const updatedPdfs = [uploaded, ...uploadedPdfs];
      setUploadedPdfs(updatedPdfs);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadUploadedPdfs(); // Refresh the list after upload

    } catch (err) {
      const resp = err?.response?.data;
      if (resp && resp.errors && typeof resp.errors === 'object') {
        const messages = Object.values(resp.errors).flat().join('\n');
        window.alert(messages);
      } else if (resp && resp.message) {
        window.alert(resp.message);
      } else {
        console.error('Upload error', err);
        window.alert('Yükleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  // Toggle PDF selection
  const togglePdfSelection = (pdfId) => {
    const newSelection = new Set(selectedPdfs);
    if (newSelection.has(pdfId)) {
      newSelection.delete(pdfId);
    } else {
      newSelection.add(pdfId);
    }
    setSelectedPdfs(newSelection);
  };

  // Select all PDFs
  const selectAllPdfs = () => {
    const allPdfIds = uploadedPdfs.map(pdf => pdf.id);
    setSelectedPdfs(new Set(allPdfIds));
  };

  // Delete selected PDFs
  const deleteSelectedPdfs = async () => {
    const successfulDeletions = [];
    for (const pdfId of selectedPdfs) {
      const ok = await deleteDocument(pdfId);
      if (ok) {
        successfulDeletions.push(pdfId);
      }
    }
    // After attempting all deletions, refresh the entire list from the API
    if (successfulDeletions.length > 0) {
      await loadUploadedPdfs();
    }
    setSelectedPdfs(new Set());
  };

  // Delete all PDFs
  const deleteAllPdfs = () => {
    setUploadedPdfs([]);
    setSelectedPdfs(new Set());
  };

  // Clear current chat
  const clearChat = () => {
    setMessages([]);
    setCurrentConversation(null);
  };

  // Create new conversation
  const createNewConversation = () => {
    setCurrentConversation(null);
    setMessages([]);
  };

  // Select conversation
  const selectConversation = (conversation) => {
    setCurrentConversation(conversation);
    if (conversation && conversation.id) fetchConversationMessages(conversation.id);
  };

  // keep selected conversation visible in the list
  useEffect(() => {
    try {
      if (!currentConversation || !convListRef.current) return;
      const el = document.getElementById('conv-' + currentConversation.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {
      // ignore
    }
  }, [currentConversation]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const logout = () => {
    try {
      localStorage.removeItem("authToken")
      setTimeout(() => {
        navigate("/")
      }, 200);
    } catch (error) {
      console.log("hataaa", error)
    }
  }

  const clearConversation = async (id) => {
    if (!id) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://api.osmovo.com/api/conversations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // update local state
      const updated = conversations.filter(c => c.id !== id);
      setConversations(updated);
      try {
        localStorage.setItem('osmovo_conversations', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }

      if (currentConversation?.id === id) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      window.alert('Sohbet silinirken bir hata oluştu.');
    }
  }

  const handleTicketSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('title', ticketSubject);
      formData.append('message', ticketMessage);
      formData.append('ticket_category_id', selectedTicketCategory?.id);
      formData.append('priority', ticketPriority);
      if (selectedTicketFile) {
        formData.append('attachment', selectedTicketFile);
      }

      const response = await axios.post('https://api.osmovo.com/api/tickets', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Ticket submitted successfully:', response.data);
      window.alert('Ticket başarıyla oluşturuldu!');
      // Clear form and close ticket form
      setTicketSubject('');
      setTicketMessage('');
      setSelectedTicketCategory(null);
      setTicketPriority('medium');
      setIsTicketFormOpen(false);
      setSelectedTicketFile(null); // Clear selected file after submission
    } catch (error) {
      console.error('Error submitting ticket:', error);
      window.alert('Ticket oluşturulurken bir hata oluştu.');
    }
  };

  const handleTicketReplySubmit = async (ticketId) => {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('message', ticketReplyMessage);
      if (selectedReplyFile) {
        formData.append('attachment', selectedReplyFile);
      }

      const response = await axios.post(`https://api.osmovo.com/api/tickets/${ticketId}/responses`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Ticket reply submitted successfully:', response.data);
      window.alert('Yanıt başarıyla gönderildi!');
      setTicketReplyMessage('');
      setSelectedReplyFile(null);
      fetchTicketDetails(ticketId); // Refresh ticket details to show the new response
    } catch (error) {
      console.error('Error submitting ticket reply:', error);
      if (error.response && error.response.data && error.response.data.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert('Yanıt gönderilirken bir hata oluştu.');
      }
    }
  };

  return (
    <DashboardContainer>
      {/* Left Sidebar - Conversations */}
      <ConversationSidebar isOpen={isConversationSidebarOpen}>
        {/* Header */}
        <SidebarHeader>
          {isConversationSidebarOpen ? (
            <>
              <LogoWrapper>
                <LogoImage src={osmovo_logo} alt="osmovo_logo" />
              </LogoWrapper>
              <ToggleSidebarButton
                onClick={() => setIsConversationSidebarOpen(false)}
                isCollapsed={!isConversationSidebarOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </ToggleSidebarButton>
            </>
          ) : (
            <ToggleSidebarButton
              onClick={() => setIsConversationSidebarOpen(true)}
              isCollapsed={!isConversationSidebarOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </ToggleSidebarButton>
          )}
        </SidebarHeader>

        {/* Navigation */}
        {isConversationSidebarOpen && (
          <SidebarContent>
            {/* New Chat Button */}
            <NewChatButtonContainer>
              <NewChatButton onClick={createNewConversation}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Yeni Sohbet</span>
              </NewChatButton>
            </NewChatButtonContainer>
            {/* Search */}
            <SearchInputContainer>
              <SearchInput
                value={conversationFilter}
                onChange={(e) => setConversationFilter(e.target.value)}
                placeholder="Sohbet ara..."
              />
            </SearchInputContainer>

            {/* Conversations List */}
            <ConversationsList ref={convListRef}>
              {conversations.filter(c => c.title.toLowerCase().includes(conversationFilter.toLowerCase())).length === 0 ? (
                <NoConversationsMessage>
                  Henüz sohbet yok
                </NoConversationsMessage>
              ) : (
                conversations.filter(c => c.title.toLowerCase().includes(conversationFilter.toLowerCase())).map((conversation) => (
                  <ConversationItem
                    id={'conv-' + conversation.id}
                    key={conversation.id}
                    onClick={() => selectConversation(conversation)}
                    isSelected={currentConversation?.id === conversation.id}
                  >
                    <ConversationTitle>{conversation.title}</ConversationTitle>
                    <ConversationDate>{formatDate(conversation.lastUpdated)}</ConversationDate>
                    <DeleteConversationButton
                      onClick={(e) => { e.stopPropagation(); clearConversation(conversation.id); }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </DeleteConversationButton>
                  </ConversationItem>
                ))
              )}
            </ConversationsList>
          </SidebarContent>
        )}

        {/* Settings */}
        <UserProfileContainer ref={dropdownRef}>
          <UserProfileDropdownContainer onClick={toggleProfileDropdown}>
            <UserProfileContent>
              <UserAvatar>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </UserAvatar>
              <UserInfo>
                <UserName>{user?.user?.first_name + " " + user?.user?.last_name || 'Kullanıcı'}</UserName>
                {/* <LogoutButton onClick={logout}>Çıkış Yap</LogoutButton> */}
              </UserInfo>
            </UserProfileContent>
            <DropdownMenu isOpen={isProfileDropdownOpen}>
              <SettingsButton><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
                Ayarlar</SettingsButton>
              <CreateTicketButton onClick={() => navigate('/dashboard/tickets')}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Destek</span>
              </CreateTicketButton>
              <DropdownDivider />
              <DropdownItem onClick={logout}>Çıkış Yap</DropdownItem>
            </DropdownMenu>
          </UserProfileDropdownContainer>
        </UserProfileContainer>
      </ConversationSidebar>

      {/* Support Sidebar */}
      {/* <SupportSidebar isOpen={isSupportSidebarOpen} ref={supportSidebarRef}>
        <SupportHeader>
          <SupportTitle>Size Nasıl Yardımcı Olabiliriz?</SupportTitle>
          <SupportCloseButton onClick={toggleSupportSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </SupportCloseButton>
        </SupportHeader>
        <SupportContent>
          {isTicketFormOpen ? (
            <TicketFormContainer>
              <TicketBackToListButton onClick={() => setIsTicketFormOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                Geri
              </TicketBackToListButton>
              <TicketFormHeader>Yeni Destek Talebi Oluştur</TicketFormHeader>
              <TicketCategoryDisplay>
                Kategori: {selectedTicketCategory?.name}
              </TicketCategoryDisplay>
              <form onSubmit={(e) => { e.preventDefault(); handleTicketSubmit(); }}>
                <div style={{ marginBottom: '16px' }}>
                  <TicketFormLabel htmlFor="ticketSubject">Konu</TicketFormLabel>
                  <TicketInput
                    id="ticketSubject"
                    type="text"

                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <TicketFormLabel htmlFor="ticketMessage">Mesajınız</TicketFormLabel>
                  <TicketTextarea
                    id="ticketMessage"
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <TicketFormLabel htmlFor="ticketAttachment">Dosya Ekle (Opsiyonel)</TicketFormLabel>
                  <input
                    id="ticketAttachment"
                    type="file"
                    onChange={(e) => setSelectedTicketFile(e.target.files[0])}
                    style={{ display: 'block', marginTop: '8px' }}
                  />
                  {selectedTicketFile && (
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      Seçilen Dosya: {selectedTicketFile.name}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <TicketFormLabel htmlFor="ticketPriority">Öncelik</TicketFormLabel>
                  <TicketSelect
                    id="ticketPriority"
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                  >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                  </TicketSelect>
                </div>
                <TicketFormActions>
                  <TicketCancelButton type="button" onClick={() => setIsTicketFormOpen(false)}>İptal</TicketCancelButton>
                  <TicketSubmitButton type="submit" disabled={!ticketSubject.trim() || !ticketMessage.trim()}>Gönder</TicketSubmitButton>
                </TicketFormActions>
              </form>
            </TicketFormContainer>
          ) : isViewingTicketsList ? (
            selectedTicket ? (
              <TicketDetailContainer>
                <TicketBackToListButton onClick={() => setSelectedTicket(null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                  Geri
                </TicketBackToListButton>
                <TicketDetailHeader>
                  <TicketDetailTitle>{selectedTicket.title}</TicketDetailTitle>
                  <TicketDetailNumber>{selectedTicket.ticket_number}</TicketDetailNumber>
                </TicketDetailHeader>
                <TicketDetailInfo>
                  <TicketDetailInfoItem>
                    <TicketDetailInfoLabel>Category:</TicketDetailInfoLabel>
                    <span>{selectedTicket.category.name}</span>
                  </TicketDetailInfoItem>
                  <TicketDetailInfoItem>
                    <TicketDetailInfoLabel>Status:</TicketDetailInfoLabel>
                    <span>{selectedTicket.status}</span>
                  </TicketDetailInfoItem>
                  <TicketDetailInfoItem>
                    <TicketDetailInfoLabel>Priority:</TicketDetailInfoLabel>
                    <span>{selectedTicket.priority}</span>
                  </TicketDetailInfoItem>
                  <TicketDetailInfoItem>
                    <TicketDetailInfoLabel>Created At:</TicketDetailInfoLabel>
                    <span>{formatDate(selectedTicket.created_at)}</span>
                  </TicketDetailInfoItem>
                </TicketDetailInfo>

                <TicketDetailMessageContainer>
                  {selectedTicket.responses.map((response) => (
                    <TicketMessageBubble key={response.id} isUser={response.responder_type === 'App\\Models\\User'}>
                      <TicketMessageHeader isUser={response.responder_type === 'App\\Models\\User'}>
                        {response.responder.name}
                      </TicketMessageHeader>
                      <TicketMessageText>{response.message}</TicketMessageText>
                      <TicketMessageDate isUser={response.responder_type === 'App\\Models\\User'}>
                        {formatDate(response.created_at)}
                      </TicketMessageDate>
                      {response.attachments && response.attachments.length > 0 && (
                        <TicketAttachmentContainer>
                          {response.attachments.map(attachment => (
                            <TicketAttachment key={attachment.id} href={attachment.file_path} target="_blank" rel="noopener noreferrer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                              {attachment.file_name}
                            </TicketAttachment>
                          ))}
                        </TicketAttachmentContainer>
                      )}
                    </TicketMessageBubble>
                  ))}
                </TicketDetailMessageContainer>

                {selectedTicket.status === 'open' && (
                  <TicketReplySection>
                    <TicketReplyTextarea
                      placeholder="Yanıtınızı buraya yazın..."
                      value={ticketReplyMessage}
                      onChange={(e) => setTicketReplyMessage(e.target.value)}
                    />
                    <TicketReplyActions>
                      <TicketReplyAttachmentLabel htmlFor="replyAttachment">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip" style={{ marginRight: '8px' }}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                        {selectedReplyFile ? selectedReplyFile.name : 'Dosya Ekle (Opsiyonel)'}
                      </TicketReplyAttachmentLabel>
                      <TicketReplyAttachmentInput
                        id="replyAttachment"
                        type="file"
                        onChange={(e) => setSelectedReplyFile(e.target.files[0])}
                      />
                      <TicketReplySubmitButton
                        onClick={() => handleTicketReplySubmit(selectedTicket.id)}
                        disabled={!ticketReplyMessage.trim() && !selectedReplyFile}
                      >
                        Yanıtla
                      </TicketReplySubmitButton>
                    </TicketReplyActions>
                  </TicketReplySection>
                )}
              </TicketDetailContainer>
            ) : (
              <TicketListContainer>
                <TicketBackToListButton onClick={() => setIsViewingTicketsList(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                  Geri
                </TicketBackToListButton>
                <SupportSectionTitle>Ticketlerim</SupportSectionTitle>
                {userTickets.length === 0 ? (
                  <NoConversationsMessage>You have no tickets yet.</NoConversationsMessage>
                ) : (
                  userTickets.map((ticket) => (
                    <TicketListItem key={ticket.id} onClick={() => fetchTicketDetails(ticket.id)}>
                      <TicketListItemHeader>
                        <TicketListItemTitle>{ticket.title}</TicketListItemTitle>
                        <TicketListItemStatus status={ticket.status}>{ticket.status}</TicketListItemStatus>
                      </TicketListItemHeader>
                      <TicketListItemCategory>{ticket.category.name}</TicketListItemCategory>
                      <TicketListItemDate>Last update: {formatDate(ticket.last_response_at || ticket.created_at)}</TicketListItemDate>
                    </TicketListItem>
                  ))
                )}
              </TicketListContainer>
            )
          ) : (
            <>


              <SendMessageCard onClick={() => {
                setIsTicketFormOpen(false); // Close ticket form
                setSelectedTicket(null); // Clear any selected ticket
                setIsViewingTicketsList(true); // Open the ticket list view
                fetchUserTickets(); // Fetch user tickets
              }}>
                <SendMessageText>Ticketlarım</SendMessageText>
                <SendMessageIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ticket"><path d="M2 10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /></svg>
                </SendMessageIcon>
              </SendMessageCard>


              <HelpArticleList>
                {ticketCategories.map((category) => (
                  <HelpArticleItem key={category.id} onClick={() => {
                    setSelectedTicketCategory(category);
                    setIsTicketFormOpen(true);
                  }}>
                    <HelpArticleTitle>{category.name}</HelpArticleTitle>
                    <HelpArticleArrow>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </HelpArticleArrow>
                  </HelpArticleItem>
                ))}
              </HelpArticleList>
            </>
          )}
        </SupportContent>
      </SupportSidebar> */}

      {/* Main Chat Area */}
      <MainChatArea>
        {/* Chat Header */}
        <ChatHeader>
          <div className="flex items-center space-x-3">
            <ChatTitle>
              {currentConversation ? currentConversation.title : 'Yeni Sohbet'}
            </ChatTitle>
          </div>
          
          <div className="flex items-center space-x-2">
            <UpgradeButton
              onClick={clearChat}
              title="Yükselt"
              aria-label="Yükselt"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Yükselt</span>
            </UpgradeButton>
          </div>
        </ChatHeader>

        {/* Chat Messages */}
        <ChatMessagesContainer ref={chatContainerRef}>
          {messages.length === 0 ? (
            <WelcomeMessageContainer>
              <WelcomeContent>
                
                <WelcomeTitle>Osmovo'ya Hoş Geldiniz</WelcomeTitle>
                <WelcomeSubtitle>Belgeleriniz hakkında sorular sorun ve yapay zeka destekli yanıtlar alın.</WelcomeSubtitle>

                <FeatureGrid>
                  <FeatureCard bgColor="#f9fafb" borderColor="#e5e7eb">
                    <FeatureIconWrapper iconBg="#f97316">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </FeatureIconWrapper>
                    <FeatureTitle>PDF Yükle</FeatureTitle>
                    <FeatureDescription>Belgelerinizi hızlıca yükleyin</FeatureDescription>
                  </FeatureCard>

                  <FeatureCard bgColor="#f9fafb" borderColor="#e5e7eb">
                    <FeatureIconWrapper iconBg="#3b82f6">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </FeatureIconWrapper>
                    <FeatureTitle>Sorular Sor</FeatureTitle>
                    <FeatureDescription>PDF içeriği hakkında sohbet et</FeatureDescription>
                  </FeatureCard>

                  <FeatureCard bgColor="#f9fafb" borderColor="#e5e7eb">
                    <FeatureIconWrapper iconBg="#10b981">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </FeatureIconWrapper>
                    <FeatureTitle>Özet Al</FeatureTitle>
                    <FeatureDescription>PDF'den hızlı özet çıkarın</FeatureDescription>
                  </FeatureCard>

                  <FeatureCard bgColor="#f9fafb" borderColor="#e5e7eb">
                    <FeatureIconWrapper iconBg="#8b5cf6">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </FeatureIconWrapper>
                    <FeatureTitle>Bilgi Çıkar</FeatureTitle>
                    <FeatureDescription>Önemli verileri ayıklayın</FeatureDescription>
                  </FeatureCard>
                </FeatureGrid>

              </WelcomeContent>
            </WelcomeMessageContainer>
          ) : (
            <ChatMessagesWrapper>
              {messages.map((message) => (
                <MessageBubble key={message.id} sender={message.sender}>
                  <MessageContent sender={message.sender}>
                    {/* Render assistant (ai) messages with Markdown + math support */}
                    {message.sender === 'ai' ? (
                      <MessageText>
                        <RenderMarkdownWithMath content={message.text} />
                      </MessageText>
                    ) : (
                      <MessageText>{message.text}</MessageText>
                    )}
                    {message.isLoading && (
                      <svg
                        className="w-5 h-5 text-gray-500 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    <MessageTimestamp>{formatDate(message.timestamp)}</MessageTimestamp>
                  </MessageContent>
                </MessageBubble>
              ))}
            </ChatMessagesWrapper>
          )}
        </ChatMessagesContainer>

        {/* Chat Input */}
        <ChatInputSection>
          <ChatInputForm onSubmit={handleMessageSubmit}>
            <ChatInputFlex>
              <ChatInputGroup>
                <ChatActionButton
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach file"
                  style={{ padding: '0 8px', height: '100%', borderRadius: '12px 0 0 12px', backgroundColor: 'transparent', color: '#6b7280' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                  Dosya
                </ChatActionButton>
                <MessageInput
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Soru sormaya başlayın"
                  style={{ flex: '1', border: 'none', background: 'transparent', padding: '12px 0', borderRadius: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
                <ChatCharacterCount style={{ padding: '0 12px', flexShrink: '0' }}>{inputMessage.length}/3,000</ChatCharacterCount>
              </ChatInputGroup>

              <div className="flex-shrink-0">
                <SendMessageButton
                  type="submit"
                  aria-label="Send message"
                  disabled={!inputMessage.trim()}
                  style={{ borderRadius: '12px' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 2L11 13" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 2L15 22l-4-9-9-4 19-7z" />
                  </svg>
                </SendMessageButton>
              </div>
            </ChatInputFlex>
          </ChatInputForm>
        </ChatInputSection>
      </MainChatArea>

      {/* Right Sidebar - Documents */}
      <PdfSidebar isOpen={isPdfSidebarOpen}>
        {/* Header */}
        <PdfSidebarHeader isOpen={isPdfSidebarOpen}>
          {isPdfSidebarOpen ? (
            <ToggleSidebarButton
              onClick={() => setIsPdfSidebarOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </ToggleSidebarButton>
          ) : (
            <ToggleSidebarButton
              onClick={() => setIsPdfSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </ToggleSidebarButton>
          )}
        </PdfSidebarHeader>

        {isPdfSidebarOpen && (
          <div className="flex-1 flex flex-col">
            {/* New Project Button */}
            {/* This section was removed from the original JSX, so it's not included here. */}

            {/* Upload Section */}
            <UploadSection>
              <UploadForm onSubmit={handlePdfUpload}>
                <PdfUploadCard>
                  <PdfUploadLabel>PDF Dosyası Yükle</PdfUploadLabel>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <FileInputGroup>
                    <PdfSelectButton
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span>{selectedFile ? selectedFile.name : 'Dosya Seçin veya Sürükleyin'}</span>
                    </PdfSelectButton>
                    <PdfUploadButton
                      type="submit"
                      disabled={!selectedFile}
                    >
                      Yükle
                    </PdfUploadButton>
                  </FileInputGroup>
                </PdfUploadCard>
              </UploadForm>
            </UploadSection>

            {/* Kullanıım hakları kontrolü */}
            <UsageRights>
              <UsageRightsTitle>Kullanım Hakları</UsageRightsTitle>
              <UsageItem>
                <UsageLabel>Soru Limiti:</UsageLabel>
                <UsageValue>{user?.question_used} / {user?.question_limit ?? 'N/A'}</UsageValue>
              </UsageItem>
              <UsageItem>
                <UsageLabel>Yenilenme Tarihi:</UsageLabel>
                <UsageValue>{user?.questions_reset_at ? formatDate(user.questions_reset_at) : 'N/A'}</UsageValue>
              </UsageItem>
              <UsageItem>
                <UsageLabel>Depolama Kullanımı:</UsageLabel>
                <UsageValue>{formatStorageSize(parseFloat(user?.storage_used || 0) * 1024 * 1024)} / {formatStorageSize(parseFloat(user?.storage_limit || 0) * 1024 * 1024)}</UsageValue>
              </UsageItem>
            </UsageRights>

            {/* Project Categories */}
            {/* This section was removed from the original JSX, so it's not included here. */}

            {/* Documents List */}
            <ProjectListContainer>
              <ProjectsHeader>
                <ProjectsTitle>Son Projeler</ProjectsTitle>
                <ViewAllButton>Tümünü Gör</ViewAllButton>
              </ProjectsHeader>

              <ProjectCardsWrapper>
                {uploadedPdfs.length === 0 ? (
                  <NoProjectMessage>
                    <NoProjectIconWrapper>
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </NoProjectIconWrapper>
                    <NoProjectText>Henüz proje yok</NoProjectText>
                    <NoProjectSubtext>İlk projenizi yükleyin</NoProjectSubtext>
                  </NoProjectMessage>
                ) : (
                  uploadedPdfs.slice(0, 6).map((pdf) => (
                    <ProjectCard
                      key={pdf.id}
                      onClick={() => togglePdfSelection(pdf.id)}
                      isSelected={selectedPdfs.has(pdf.id)}
                    >
                      <ProjectIconWrapper>
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </ProjectIconWrapper>
                      <ProjectDetails>
                        <ProjectHeader>
                          <ProjectName title={pdf.name}>{pdf.name}</ProjectName>
                          <ProjectSize>{formatFileSize(pdf.size)}</ProjectSize>
                        </ProjectHeader>
                        <ProjectDate>Yüklendi: {formatDate(pdf.uploadedAt)}</ProjectDate>
                        <ProjectActions>
                          <ProjectStatusIndicator>
                            <StatusDot />
                            <ProjectStatusText>Sunucuya Yüklendi</ProjectStatusText>
                          </ProjectStatusIndicator>
                          <ProjectButtons>
                            <ProjectActionButton
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePdfSelection(pdf.id);
                              }}
                              title="Seç"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </ProjectActionButton>
                            <DeleteProjectButton
                              onClick={async (e) => {
                                e.stopPropagation();
                                const ok = await deleteDocument(pdf.id);
                                if (ok) {
                                  const updatedPdfs = uploadedPdfs.filter(p => p.id !== pdf.id);
                                  setUploadedPdfs(updatedPdfs);
                                  await loadUploadedPdfs(); // Refresh the list after single deletion
                                  const newSelection = new Set(selectedPdfs);
                                  newSelection.delete(pdf.id);
                                  setSelectedPdfs(newSelection);
                                }
                              }}
                              title="Sil"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </DeleteProjectButton>
                          </ProjectButtons>
                        </ProjectActions>
                      </ProjectDetails>
                    </ProjectCard>
                  ))
                )}
              </ProjectCardsWrapper>

              {/* Show remaining count if more than 6 documents */}
              {uploadedPdfs.length > 6 && (
                <MorePdfsButton>
                  <MorePdfsText>
                    {uploadedPdfs.length - 6} tane daha...
                  </MorePdfsText>
                </MorePdfsButton>
              )}
            </ProjectListContainer>

            {/* Bottom Actions */}
            {uploadedPdfs.length > 0 && (
              <BottomActionsContainer>
                <BottomActionsFlex>
                  <SelectAllPdfsButton onClick={selectAllPdfs}>Tümünü Seç</SelectAllPdfsButton>
                  {selectedPdfs.size > 0 && (
                    <DeleteSelectedPdfsButton onClick={deleteSelectedPdfs}>
                      {selectedPdfs.size} Dosya Sil
                    </DeleteSelectedPdfsButton>
                  )}
                </BottomActionsFlex>
              </BottomActionsContainer>
            )}
          </div>
        )}
      </PdfSidebar>

      {/* Mobile Overlay */}
      {
        (window.innerWidth < 768) && (isConversationSidebarOpen || isPdfSidebarOpen) && (
          <MobileOverlay
            onClick={() => {
              setIsConversationSidebarOpen(false);
              setIsPdfSidebarOpen(false);
            }}
          />
        )
      }
    </DashboardContainer>
  );
};

export default Dashboard;