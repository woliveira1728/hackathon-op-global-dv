import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Roadmap: NextPage = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Função para rolar para o topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
          <defs>
            <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9400D3" />
              <stop offset="25%" stopColor="#4B0082" />
              <stop offset="50%" stopColor="#0000FF" />
              <stop offset="75%" stopColor="#00FF00" />
              <stop offset="100%" stopColor="#FFFF00" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#backgroundGradient)" />
        </svg>
      </div>
      <header>
        <div className={styles.sitetitle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="30" viewBox="0 0 150 30">
            <text x="0" y="15" fill="white" fontSize="20" fontFamily="Arial">Global DVN</text>
          </svg>
        </div>
      </header>
      <main className={styles.main}>
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/whats">Whats</Link>
            </li>
            <li>
              <Link href="/roadmap">Roadmap</Link>
            </li>
            <li>
              <Link href="/teams">Teams</Link>
            </li>
            <li>
              <Link href="/partners">Partners</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content2}>
          <div>
            <h1 className={styles.title}> Roadmap </h1>
            <div className={styles.category}></div>
              <h2 className={styles.title}> Step 1 - Platform Development</h2>
            <p className={styles.p2}>Continuous development of the Global DVN platform, including usability improvements, feature expansion, and integration with new voting categories.</p>

              <h2 className={styles.title}> Step 2 - Adoption and Partnerships</h2>
            <p className={styles.p2}>Marketing strategies and partnerships to promote platform adoption and increase its user base worldwide.</p>

              <h2 className={styles.title}> Step 3 - Public Outreach</h2>
            <p className={styles.p2}>Launch a public outreach campaign to increase awareness about the Global DVN platform, highlighting its features, benefits, and societal impact.</p>

          </div>
        </div>
        {showButton && (<button className={styles.backToTopButton} onClick={scrollToTop}>Back to Top</button>)}
      </main>
      <footer className={styles.footer}>
        <a>
          Global DVN ©
        </a>
      </footer>
    </div>
  );
};

export default Roadmap;
