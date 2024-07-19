import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function Tweet(props) {
    const user = useSelector((state) => state.user);

    const handleClick = (id) => {
        props.removeTweet(id)
    }

    const likeClick = (idAndUsername) => {
        props.likePost(idAndUsername)
    }

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
            </div>
            <div className={styles.faHeartContainer}>
                <FontAwesomeIcon className={styles.faHeart} icon={faHeart} style={props.liked} onClick={() => { likeClick({ postID: props.id, username: props.username }) }} />
                <span className={styles.count}>0</span>
                <FontAwesomeIcon icon={faTrash} className={styles.faTrash} onClick={() => { handleClick(props.id) }} />
            </div>
        </div>
    );
}

export default Tweet;
