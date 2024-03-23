import { IProposal } from '../commons/IProposal';
import { IContractInstance } from '../pages';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

interface ICardData {
    proposal: IProposal;
    // contractInstance: IContractInstance;
    voteProposal: (id: number) => Promise<number>;
}

const Card: React.FC<ICardData> = ({ proposal, voteProposal }) => {
    return (
    <div key={proposal.id} className={styles.card}>
        <Image src='/img/candidato1.jpg' alt={proposal.name} width={200} height={200} />
        <div className={styles.details}>
            <h3 className={styles.h3}>{proposal.name}</h3>
            <p className={styles.p}>Votos: {Number(proposal.voteCount)}</p>
            <button className={styles.voteButton} onClick={() => voteProposal(proposal.id)}>Votar</button>
        </div>
      </div>
    );
  };

export default Card;