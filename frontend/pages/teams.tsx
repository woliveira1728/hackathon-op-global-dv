import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Teams: NextPage = () => {
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
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}> Teams </h1>
            <div className={styles.category}></div>
            <center>
            <div className={styles.card}>
            <h3 className={styles.title}>Alessandro Werner</h3>
                <p className={styles.p}>Frontend</p>
                <center><button className={styles.tabs}><a href="https://www.linkedin.com/in/alessandrowerner">Linkedin</a></button></center>
            </div>
            <div className={styles.card}>
            <h3 className={styles.title}>Leonardo Barros Mendonça</h3>
                <p className={styles.p}>Backend</p>
                <center><button className={styles.tabs}><a href="https://www.linkedin.com/in/leobmend">Linkedin</a></button></center>
            </div>
            <div className={styles.card}>
            <h3 className={styles.title}>Wilson Oliveira</h3>
                <p className={styles.p}>FullStack Developer, Debug and features</p>
                <center><button className={styles.tabs}><a href="https://www.linkedin.com/in/woliveira1728">Linkedin</a></button></center>
            </div>
            </center>
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

export default Teams;
