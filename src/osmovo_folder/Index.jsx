import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import osmovo_logo from '../assets/images/osmovo_logo.svg'
import Price from '../components/Price';
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import styled from 'styled-components';

const PricingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 40px;
`;

export default function Index() {
    const navigate = useNavigate()

    const styles = `
        :root {
            --primary:rgb(58, 58, 59);
            --primary-dark:rgb(40, 41, 44);
            --primary-light:rgb(96, 102, 112);
            --secondary: #f8fafc;
            --accent:rgb(47, 52, 53);
            --text-primary: #0f172a;
            --text-secondary: #475569;
            --text-light: #64748b;
            --background: #ffffff;
            --surface: #f1f5f9;
            --border:rgb(42, 44, 46);
            --border-light: #f1f5f9;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: var(--background);
            color: var(--text-primary);
            line-height: 1.6;
            font-weight: 400;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* Animations */
        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .slide-up {
            animation: slideUp 1s ease-out;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            padding: 20px 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            border-bottom: 1px solid var(--border);
            box-shadow: var(--shadow-sm);
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .logo {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 12px;
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: scale(1.02);
        }

        .logo img {
            height: 40px;
            width: auto;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 8px;
            align-items: center;
        }

        .nav-menu li a {
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 15px;
            padding: 12px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            position: relative;
        }

        .nav-menu li a:hover {
            color: var(--primary);
            background: var(--surface);
            border-color: var(--border);
            transform: translateY(-1px);
        }

        .auth-actions {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .btn {
            font-weight: 600;
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }

        .btn-outline {
            background: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border);
        }

        .btn-outline:hover {
            background: var(--surface);
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .btn-primary {
            background: var(--primary);
            color: white;
            border: 1px solid var(--primary);
            box-shadow: var(--shadow-sm);
        }

        .btn-primary:hover {
            background: var(--primary-dark);
            border-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        /* Hero Section */
        .hero {
            padding: 140px 0 100px;
            background: linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%);
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            position: relative;
            z-index: 1;
        }

        .hero-text h1 {
            font-size: 52px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 24px;
            line-height: 1.1;
            letter-spacing: -0.02em;
        }

        .hero-text .highlight {
            color: var(--primary);
            position: relative;
        }

        .hero-text .highlight::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            opacity: 0.3;
            border-radius: 2px;
        }

        .hero-text p {
            font-size: 18px;
            color: var(--text-secondary);
            margin-bottom: 40px;
            line-height: 1.7;
        }

        .cta-container {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        .cta-button {
            background: var(--primary);
            color: white;
            padding: 16px 32px;
            border: 1px solid var(--primary);
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .cta-button:hover {
            background: var(--primary-dark);
            border-color: var(--primary-dark);
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
        }

        .hero-visual {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .demo-container {
            background: white;
            border-radius: 16px;
            padding: 28px;
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--border);
            max-width: 420px;
            width: 100%;
            transition: transform 0.3s ease;
        }

        .demo-container:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .chat-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
        }

        .bot-avatar {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            border: 2px solid white;
            box-shadow: var(--shadow);
        }

        .chat-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 2px;
        }

        .chat-info p {
            font-size: 14px;
            color: var(--text-light);
        }

        .chat-messages {
            margin-bottom: 24px;
        }

        .message {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
        }

        .message.user {
            flex-direction: row-reverse;
        }

        .message-content {
            background: var(--surface);
            padding: 14px 18px;
            border-radius: 16px;
            max-width: 80%;
            font-size: 14px;
            line-height: 1.5;
            border: 1px solid var(--border-light);
        }

        .message.user .message-content {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .chat-input {
            display: flex;
            gap: 12px;
            padding: 8px;
            background: var(--surface);
            border-radius: 12px;
            border: 1px solid var(--border);
        }

        .chat-input:focus-within {
            border-color: var(--primary);
        }

        .chat-input input {
            flex: 1;
            padding: 12px 16px;
            border: none;
            background: transparent;
            font-size: 14px;
            outline: none;
            color: var(--text-primary);
        }

        .send-btn {
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid var(--primary);
        }

        .send-btn:hover {
            background: var(--primary-dark);
            border-color: var(--primary-dark);
            transform: scale(1.05);
        }

        /* Features Section */
        .features {
            padding: 100px 0;
            background: var(--background);
        }

        .features-header {
            text-align: center;
            margin-bottom: 80px;
        }

        .features-header .badge {
            background: var(--surface);
            color: var(--primary);
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
            display: inline-block;
            border: 1px solid var(--border);
        }

        .features h2 {
            font-size: 40px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 20px;
            letter-spacing: -0.02em;
        }

        .features p {
            font-size: 18px;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
        }

        .feature-card {
            background: white;
            padding: 32px 28px;
            border-radius: 16px;
            border: 1px solid var(--border);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--surface) 0%, rgba(37, 99, 235, 0.02) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: -1;
        }

        .feature-card:hover::before {
            opacity: 1;
        }

        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary);
        }

        .feature-icon {
            width: 64px;
            height: 64px;
            border-radius: 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            box-shadow: var(--shadow);
            transition: all 0.4s ease;
            border: 3px solid white;
        }

        .feature-card:hover .feature-icon {
            transform: scale(1.1) rotate(5deg);
            box-shadow: var(--shadow-xl);
        }

        .feature-card h3 {
            font-size: 20px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 16px;
            transition: color 0.3s ease;
        }

        .feature-card:hover h3 {
            color: var(--primary);
        }

        .feature-card p {
            color: var(--text-secondary);
            line-height: 1.6;
            font-size: 15px;
            margin: 0;
            transition: color 0.3s ease;
        }

        .feature-card:hover p {
            color: var(--text-primary);
        }

        /* How it works */
        .how-it-works {
            padding: 100px 0;
            background: var(--surface);
        }

        .how-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: stretch;
        }

        .how-it-works h2 {
            font-size: 40px;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 20px;
            letter-spacing: -0.02em;
        }

        .how-it-works .subtitle {
            font-size: 18px;
            color: var(--text-secondary);
            margin-bottom: 40px;
            line-height: 1.6;
        }

        .steps {
            list-style: none;
        }

        .step {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 24px;
            padding: 24px;
            background: white;
            border-radius: 12px;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .step:hover {
            transform: translateX(8px);
            box-shadow: var(--shadow-lg);
            border-color: var(--primary);
        }

        .step-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
            flex-shrink: 0;
            border: 2px solid white;
            box-shadow: var(--shadow);
        }

        .step-content h3 {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .step-content p {
            color: var(--text-secondary);
            line-height: 1.5;
        }

        .process-visual {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .process-diagram {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: var(--shadow-xl);
            border: 1px solid var(--border);
            text-align: center;
            max-width: 400px;
            transition: transform 0.3s ease;
        }

        .process-diagram:hover {
            transform: translateY(-4px);
        }

        .upload-area {
            width: 120px;
            height: 120px;
            border: 2px dashed var(--primary);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            background: rgba(37, 99, 235, 0.05);
            font-size: 82px;
            color: var(--primary);
            transition: all 0.3s ease;
        }

        .upload-area:hover {
            background: rgba(37, 99, 235, 0.1);
            transform: scale(1.05);
            border-color: var(--primary-dark);
        }

        .process-diagram h4 {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .process-diagram p {
            color: var(--text-secondary);
            font-size: 14px;
        }

        /* Pricing */
        .pricing {
            padding: 100px 0;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .pricing::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }

        .pricing-embed {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
        }

        .pricing-inner .container {
            width: 100%;
            max-width: none;
            padding: 0;
        }
        
        .pricing-inner .module-card {
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 32px 24px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            transition: all 0.4s ease;
            display: flex;
            flex-direction: column;
            cursor: pointer;
        }

        .pricing-inner .module-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .pricing-inner .module-card.popular {
            transform: scale(1.05);
            border-color: var(--primary);
            box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
        }

        .pricing-inner .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, var(--primary), var(--accent));
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
            box-shadow: var(--shadow);
        }

        .pricing-inner .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        .pricing-inner .card-title {
            font-size: 20px;
            font-weight: 600;
            color: white;
            margin-bottom: 8px;
        }

        .pricing-inner .card-description {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 20px;
        }

        .pricing-inner .card-price {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin-bottom: 24px;
        }

        .pricing-inner .feature-list {
            list-style: none;
            margin: 0 0 24px 0;
            flex-grow: 1;
        }

        .pricing-inner .feature-list li {
            display: flex;
            align-items: center;
            gap: 12px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin-bottom: 12px;
        }

        .pricing-inner .feature-list li .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            flex-shrink: 0;
        }

        .pricing-inner .select-btn {
            background: white;
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid white;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
        }

        .pricing-inner .select-btn:hover {
            background: var(--surface);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .pricing-inner .module-card.popular .select-btn {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .pricing-inner .module-card.popular .select-btn:hover {
            background: var(--primary-dark);
            border-color: var(--primary-dark);
        }

        /* Card-style plan (from provided Card component) */
        .plan {
            border-radius: 16px;
            box-shadow: 0 30px 30px -25px rgba(0, 38, 255, 0.205);
            padding: 10px;
            background-color: #fff;
            color: #697e91;
            max-width: 300px;
        }

        .plan strong {
            font-weight: 600;
            color: #425275;
        }

        .plan .inner {
            align-items: center;
            padding: 20px;
            padding-top: 56px; /* increased to make room for taller price pill */
            background-color: #ecf0ff;
            border-radius: 12px;
            position: relative;
        }

        .plan .pricing {
            position: absolute;
            top: -12px; /* lift slightly to overlap the card border like the mock */
            right: 0;
            background: linear-gradient(90deg, #bed6fb 0%, #d7e2ff 100%);
            border-radius: 24px 0 0 24px; /* larger radius for pill look */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.75em 1em; /* larger padding for increased height */
            font-size: 1rem;
            font-weight: 700;
            color: #27415a;
            box-shadow: 0 8px 18px rgba(16, 24, 40, 0.12);
            min-height: 48px;
        }

        .plan .pricing > span {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            line-height: 1;
            font-weight: 700;
        }

        .plan .pricing small {
            font-size: 0.75em;
            color: rgba(39,65,90,0.85);
            margin-left: 4px;
            font-weight: 600;
        }

        .plan .pricing small {
            color: #707a91;
            font-size: 0.75em;
            margin-left: 0.25em;
        }

        .plan .title {
            font-weight: 600;
            font-size: 1.25rem;
            color: #425675;
        }

        .plan .title + * {
            margin-top: 0.75rem;
        }

        .plan .info + * {
            margin-top: 1rem;
        }

        .plan .features {
            display: flex;
            flex-direction: column;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .plan .features li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .plan .features li + * {
            margin-top: 0.75rem;
        }

        .plan .features .icon {
            background-color: #1FCAC5;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
        }

        .plan .features .icon svg {
            width: 14px;
            height: 14px;
        }

        .plan .features + * {
            margin-top: 1.25rem;
        }

        .plan .action {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: end;
        }

        .plan .button {
            background-color: #6558d3;
            border-radius: 6px;
            color: #fff;
            font-weight: 500;
            font-size: 1.125rem;
            text-align: center;
            border: 0;
            outline: 0;
            width: 100%;
            padding: 0.625em 0.75em;
            text-decoration: none;
            cursor: pointer;
        }

        .plan .button:hover, .plan .button:focus {
            background-color: #4133B7;
        }

        /* Footer */
        .footer {
            color: white;
            padding: 80px 0 40px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 60px;
            margin-bottom: 60px;
        }

        .footer-section h3 {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 24px;
            color: white;
        }

        .footer-brand p {
            color: var(--text-light);
            margin-bottom: 24px;
            line-height: 1.6;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section li {
            margin-bottom: 12px;
        }

        .footer-section a {
            color: var(--text-light);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 15px;
            padding: 4px 0;
            display: inline-block;
        }

        .footer-section a:hover {
            color: var(--primary-light);
            transform: translateX(4px);
        }

        .social-icons {
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }

        .social-icon {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 18px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon:hover {
            background: var(--primary);
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 40px;
            text-align: center;
            color: var(--text-light);
            font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 0 16px;
            }

            .nav-menu {
                display: none;
            }

            .hero {
                padding: 120px 0 80px;
            }

            .hero-content,
            .how-content {
                grid-template-columns: 1fr;
                gap: 60px;
                text-align: center;
            }

            .hero-text h1 {
                font-size: 36px;
            }

            .hero-text p {
                font-size: 16px;
            }

            .features h2,
            .how-it-works h2 {
                font-size: 32px;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: 1fr;
                gap: 40px;
                text-align: center;
            }

            .cta-container {
                flex-direction: column;
                align-items: center;
            }
        }
    `;

    // plans state and loader
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

    const checkout = async(id)=>{
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || (/token=/.test(document.cookie) ? 'cookie' : null);
        const target = `/checkout/${id}`;
        if (!token) {
            navigate('/login?redirect=' + encodeURIComponent(target), { replace: true });
            return;
        }
        navigate(target)
    }

    return (
        <div>
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <div className="logo">
                            <img src={osmovo_logo} alt="PDF Sohbet Robotu" />
                        </div>
                        <ul className="nav-menu">
                            <li><a href="#anasayfa">Anasayfa</a></li>
                            <li><a href="#ozellikler">Özellikler</a></li>
                            <li><a href="#nasil-calisir">Nasıl Çalışır</a></li>
                            <li><a href="#fiyatlandirma">Fiyatlandırma</a></li>
                            <li><a href="#iletisim">İletişim</a></li>
                        </ul>
                        <div className="auth-actions">
                            <button className="btn btn-outline" onClick={() => navigate('/login', { state: { from: { pathname: `/checkout/${""}` } } })}>Giriş yap</button>
                            <button className="btn btn-primary" onClick={() => navigate('/register')}>Kayıt ol</button>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                <section id="anasayfa" className="hero fade-in">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text">
                                <h1>PDF'lerinizi <span className="highlight">Yapay Zeka</span> ile Anlayın</h1>
                                <p>Belgelerinizi yükleyin, sorularınızı sorun ve anında akıllı yanıtlar alın. Hukuki analiz, özet çıkarma ve belge arama artık çok daha kolay.</p>
                                <div className="cta-container">
                                    <button className="cta-button">Ücretsiz Başlayın</button>
                                </div>
                            </div>
                            <div className="hero-visual slide-up">
                                <div className="demo-container">
                                    <div className="chat-header">
                                        <div className="bot-avatar">🤖</div>
                                        <div className="chat-info">
                                            <h3>PDF Asistanı</h3>
                                            <p>Çevrimiçi • Yardıma hazır</p>
                                        </div>
                                    </div>
                                    <div className="chat-messages">
                                        <div className="message">
                                            <div className="message-content">
                                                Merhaba! Size nasıl yardımcı olabilirim? PDF'nizi yükleyin ve sorularınızı sorun.
                                            </div>
                                        </div>
                                        <div className="message user">
                                            <div className="message-content">
                                                Bu sözleşmedeki ana maddeler neler?
                                            </div>
                                        </div>
                                        <div className="message">
                                            <div className="message-content">
                                                Sözleşmenizi analiz ettim. Ana maddeler: 1) Ödeme koşulları, 2) Teslim tarihleri, 3) İptal şartları...
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-input">
                                        <input type="text" placeholder="Sorunuzu yazın..." />
                                        <button className="send-btn">→</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="ozellikler" className="features fade-in">
                   
                        
                     <Skills></Skills>
                </section>

                <section id="nasil-calisir" className="how-it-works fade-in">
                    <div className="container">
                        <div className="how-content">
                            <div>
                                <h2>Nasıl Çalışır?</h2>
                                <p className="subtitle">Üç basit adımda PDF'lerinizi analiz edin ve sorularınızın yanıtlarını alın.</p>
                                <div className="steps">
                                    <div className="step">
                                        <div className="step-icon">1</div>
                                        <div className="step-content">
                                            <h3>PDF'nizi Yükleyin</h3>
                                            <p>Belgelerinizi güvenli platforma yükleyin. Tüm dosya türleri desteklenir.</p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="step-icon">2</div>
                                        <div className="step-content">
                                            <h3>Sorularınızı Sorun</h3>
                                            <p>Doğal dilde istediğiniz soruları sorun. AI asistanı sizi anlar.</p>
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="step-icon">3</div>
                                        <div className="step-content">
                                            <h3>Anında Yanıt Alın</h3>
                                            <p>Detaylı ve doğru yanıtları saniyeler içinde alın. Kaynak referanslarıyla birlikte.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="process-visual">
                                <div className="process-diagram">
                                    <div className="upload-area">📄</div>
                                    <h4>Belgenizi Analiz Ediyoruz</h4>
                                    <p>Yapay zeka teknolojisi ile belgelerinizi anında işliyoruz</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <section id="fiyatlandirma" className="pricing fade-in">
                <div className="pricing-embed">
                    <div className="pricing-inner">
                        <div className="container">
                            <PricingGrid>
                                {plansLoading ? (
                                    <div style={{gridColumn: '1 / -1', textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>
                                        Planlar yükleniyor...
                                    </div>
                                ) : (
                                    plans.length === 0 ? (
                                        <div style={{gridColumn: '1 / -1', textAlign: 'center', color: 'rgba(255,255,255,0.8)'}}>
                                            Hiç plan bulunamadı.
                                        </div>
                                    ) : (
                                        plans.map((plan) => (
                                            <Price key={plan.id} plan={plan} onSelect={checkout} />
                                        ))
                                    )
                                )}
                            </PricingGrid>
                        </div>
                    </div>
                </div>
            </section>

           
               <Footer></Footer>
            
        </div>
    );
}