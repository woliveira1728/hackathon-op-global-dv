import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
import styles from '../styles/Home.module.css';

interface Candidate {
  id: number;
  name: string;
  votes: number;
  photo: string;
}

interface Proposal {
  id: number;
  title: string;
  description: string;
}

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [ isWalletConnected, setIsWalletConnected] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'Candidato 1', votes: 0, photo:'/img/candidato1.jpg'},
    { id: 2, name: 'Candidato 2', votes: 0, photo:'/img/candidato2.jpg'}
  ]);

  const [proposals] = useState<Proposal[]>([
    { id: 1, title: 'Título da Proposta 1', description: 'Descrição da Proposta 1' },
    { id: 2, title: 'Título da Proposta 2', description: 'Descrição da Proposta 2' },
    { id: 3, title: 'Título da Proposta 3', description: 'Descrição da Proposta 3' }
  ]);

  const voteCandidate = (candidateId: number) => {
    console.log('teste');
    setCandidates(prevCandidates => 
      
      prevCandidates.map(candidate =>
        candidate.id === candidateId ? { ...candidate, votes: candidate.votes + 1 } : candidate
      )
      ); 
  };

  const voteProposal = (proposalId: number) => {
    console.log(`Votou na proposta ${proposalId}`);
    // Lógica da proposta
  };
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
      <div className={styles.sitetitle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="30" viewBox="0 0 150 30">
          <text x="0" y="15" fill="white" font-size="20" font-family="Arial">Global DVN</text>
        </svg>
      </div>
      <header>
        <div className={styles.connectButton}>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              if(connected) {
                setIsWalletConnected(true);
              } else {
                setIsWalletConnected(false);
              }

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button">
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ display: 'flex', alignItems: 'center' }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button onClick={openAccountModal} type="button">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </header>

      {isWalletConnected ?
        <main className={styles.main}>
          <nav className={styles.menu}>
            <ul>
              <li>
                <Link href="/">What</Link>
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
          <div>
          <div className={styles.tabs}>
            <button
              className={styles.tabs === 'tab1' ? 'active' : ''}
              onClick={() => handleTabClick('tab1')}
            >
              <h1 className={styles.title}>Votação Eleitoral</h1>
            </button>
            <button className={styles.tabs === 'tab2' ? 'active' : ''}
              onClick={() => handleTabClick('tab2')}>
              <h1 className={styles.title}>Enquete</h1>
            </button>
          </div>
          <div className={styles.content}>
            {activeTab === 'tab1' && <div>
            <section className={styles.category}>
              <div className={styles.grid}>
                {candidates.map(candidate => (
                  <div key={candidate.id} className={styles.card}>
                    <Image src={candidate.photo} alt={candidate.name} width={200} height={200} />
                    <div className={styles.details}>
                      <p className={styles.p}>Nome: {candidate.name}</p>
                      <p className={styles.p}>Votos: {candidate.votes}</p> 
                      <button className={styles.voteButton} onClick={() => voteCandidate(candidate.id)}>Votar</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            </div>}
            {activeTab === 'tab2' && <div>
            <section className={styles.category}>
              <div className={styles.grid}>
              {proposals.map(proposal => (
                <div key={proposal.id} className={styles.card}>
                  <div className={styles.proposal}>
                    <h3 className={styles.title}>{proposal.title}</h3>
                    <p className={styles.p}>{proposal.description}</p>
                    <div className={styles.progressContainer}>
                      <div className={styles.progressBar} style={{ width: `${(proposal.id * 20)}%` }}>
                        {proposal.id * 20}%
                      </div>
                    </div>
                    <button className={styles.voteButton} onClick={() => voteProposal(proposal.id)}>Votar</button>
                  </div>
                </div>
              ))}
              </div>
            </section>
            </div>}
          </div>
        </div>
        </main>
        :
        <main className={styles.main}>
          <nav className={styles.menu}>
            <ul>
              <li>
                <Link href="/">What</Link>
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
          <div>  
            <section className={styles.isNotWalletContainer}>
              <h2>Connect your wallet to access voting options</h2>
            </section>
          </div>
        </main>
      }

      <footer className={styles.footer}>
        <a href="" rel="" target="_blank">
          Global DVN ©
        </a>
      </footer>
    </div>
  );
};

export default Home;