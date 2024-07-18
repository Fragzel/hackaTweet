import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart } from '@fortawesome/free-solid-svg-icons';


function Tweet(props) {

    return (
        <div className={styles.tweetContainer}>
            <div className={styles.imageAndUsername}>
                <img className={styles.avatar} src="/images/Khaled.jpg" />
                <span className={styles.name}>{props.username}</span> <span className={styles.arobase}>@{props.username}</span>
                <span className={styles.date}>{props.date}</span>
            </div>
            <div >

            </div>
            <div className={styles.messageAndHeart} >
                <span>{props.message} </span>
                <span>{/*insérer la date a laquelle le post a été crée. */}</span>
            </div>
            <div className={styles.faHeartContainer}>
                <FontAwesomeIcon className={styles.faHeart} icon={faHeart} />
                <span className={styles.count}>0</span>
            </div>
        </div>
    );
}

export default Tweet;
