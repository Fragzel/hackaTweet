import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart } from '@fortawesome/free-solid-svg-icons';


function Tweet() {

    return (
        <div className={styles.tweetContainer}>
            <div className={styles.imageAndUsername}>
                <img className={styles.avatar} src="/images/Khaled.jpg" />
                <span className={styles.name}>Khaled</span> <span className={styles.arobase}>@khaledLeBoss</span>

            </div>
            <div className={styles.messageAndHeart} >
                <span>Message raciste random </span>
            </div>
            <FontAwesomeIcon className={styles.faHeart} icon={faHeart} /> 0
        </div>
    );
}

export default Tweet;
