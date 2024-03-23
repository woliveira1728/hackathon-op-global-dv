import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Whats: NextPage = () => {
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
              <Link href="/teams">Team</Link>
            </li>
            <li>
              <Link href="/partners">Partners</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.content2}>
          <div>
            <h1 className={styles.title}> Whats </h1>
            <div className={styles.category}></div>
            <p className={styles.p2}>Global DVN is a revolutionary blockchain-based platform aimed at democratizing the voting process across various categories, promoting civic participation, and strengthening democracy worldwide. By offering a secure, transparent, and accessible platform, Global DVN enables users to cast their votes on a variety of topics and issues, helping shape the future of society.</p>

            <h1 className={styles.title}>Introduction</h1>
            <p className={styles.p2}>Traditional voting processes are often limited and restricted to specific elections, leaving out important community decisions and opinions. Global DVN emerges as a solution to this problem, allowing users to actively participate in decision-making processes across a variety of areas, from politics and governance to entertainment and culture.</p>

            <h1 className={styles.title}>Objectives and Goals</h1>
            <p className={styles.p2}><strong>Overall Objective:</strong> Democratize the voting process, making it accessible to all and allowing users to cast their votes across a variety of categories.</p>
            <ul className={styles.p2}>
              <li>Develop a robust and scalable platform that supports a wide range of voting scenarios.</li>
              <li>Ensure the security, transparency, and integrity of all votes cast on the platform.</li>
              <li>Promote civic participation and user engagement in important community issues.</li>
            </ul>
            <h1 className={styles.title}>Solution Overview</h1>
            <p className={styles.p2}>Global DVN offers an intuitive and user-friendly platform where users can explore a variety of categories and cast their votes on different issues. Utilizing blockchain technology, all votes are recorded immutably, ensuring transparency and security in the voting process.</p>

            <h1 className={styles.title}>Key Features</h1>
            <ul className={styles.p2}>
              <li><strong>Voting Across Diverse Categories:</strong> Users can choose from a wide variety of predefined categories, including politics, entertainment, sports, culture, and more.</li>
              <li><strong>Customization:</strong> Users can personalize their voting experiences by following specific categories of interest and receiving notifications about related new votes.</li>
              <li><strong>Results Tracking:</strong> Voting results are displayed in real-time, allowing users to track the progress and impact of their choices.</li>
            </ul>
          </div>

          <h1 className={styles.title}>Conclusion</h1>
          <p className={styles.p2}>Global DVN represents a significant advancement in the field of electronic voting, offering a transparent, secure, and accessible platform for users to actively participate in decision-making processes across a variety of areas. With its commitment to innovation and transparency, Global DVN is poised to shape the future of democracy worldwide.</p>

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

export default Whats;
