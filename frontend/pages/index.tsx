import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Web3 from 'web3';
import deployedContracts from '../generated/deployedContracts';
import ProposalCard from '../components/ProposalCard';
import { IProposal } from '../commons/IProposal';

export interface IContractInstance {
  methods: {
    [key: string]: (...args: any[]) => {
      call: () => Promise<any>;
      send: (input: any) => Promise<any>;
    };
  };
}

const Home: NextPage = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contractInstance, setContractInstance] = useState<IContractInstance | null>(null);
    const [proposals, setProposals] = useState<IProposal[]>([]);

    useEffect(() => {
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

            const GDVNContract = deployedContracts[31337].filter((x) => x.chainId == "31337")[0].contracts.GDVNProtocol;

            const contractInstance = new web3.eth.Contract(
                GDVNContract.abi,
                GDVNContract.address
            );

            setWeb3(web3);
            setContractInstance(contractInstance);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        async function callSmartContractFunction() {
            if (contractInstance) {
                try {
                    console.log("contractInstance alterou");

                    const voting = await contractInstance.methods.getVoting(0).call();
                    const proposals = await contractInstance.methods.getProposals(0).call();
                    setProposals(proposals);
                    
                    console.log('Result of smart contract function:', proposals[0].voteCount);
                } catch (error) {
                    console.error('Error calling smart contract function:', error);
                }
            }
        }
        callSmartContractFunction();
    }, [contractInstance]);
  
    const voteProposal = async (proposalId: number): Promise<number> => {
        try {
            console.log("Voto");
            
            const accounts = await web3?.eth.getAccounts() as string[];
            const account = accounts[0];
            console.log("account: ", account)
            const vote = await contractInstance?.methods.vote(0, proposalId).send({ from: account });
            console.log("voto: ", vote);
            
            setContractInstance(contractInstance);

            return vote;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }
  
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                    <defs>
                        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#9400D3" />
                            <stop offset="25%" stop-color="#4B0082" />
                            <stop offset="50%" stop-color="#0000FF" />
                            <stop offset="75%" stop-color="#00FF00" />
                            <stop offset="100%" stop-color="#FFFF00" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#backgroundGradient)" />
                </svg>
            </div>
            <Head>
                <title>Global DVN</title>
                <meta content="Teste de votação" name="description" />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <main className={styles.main}>
                <header>
                    <h1 className={styles.title}> Votação Eleitoral </h1>
                    <nav className={styles.menu}>
                        <ul>
                            <li>
                                <Link href="/">
                                    What
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/teams">
                                    Teams
                                </Link>
                            </li>
                            <li>
                                <Link href="/partners">
                                    Partners
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.connectButton}><ConnectButton /></div>
                </header>
                <div className={styles.grid}>
                    {proposals.map(proposal => (
                        <ProposalCard 
                            proposal={proposal}
                            voteProposal={voteProposal} 
                            key={proposal.id} />
                    ))}
                </div>
            </main>

            <footer className={styles.footer}>
                <a href="" rel="" target="_blank">
                    Global DVN ©
                </a>
            </footer>
        </div>
    );
};

export default Home;