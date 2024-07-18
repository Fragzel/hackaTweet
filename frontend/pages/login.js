import styles from '../styles/Login.module.css';
import LoginModal from '../components/LoginModal';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isSignin, setIsSignin] = useState(false)

    function openModal(isSignin) {
        setIsSignin(isSignin)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div>
            <main className={styles.main}>

                <div className={styles.leftPart}>
                    <img src="/images/logo_twitter.png" className={styles.logoLeft} />
                </div>
                <div className={styles.rightPart}>
                    <img className={styles.twitterLogo} src='/images/logo_twitter.png' />
                    <h1 className={styles.title}>See what's happening</h1>
                    <h3 className={styles.text}>Join Hackatweet today</h3>
                    <div className={styles.sign}>
                        <button onClick={() => openModal(false)} className={styles.signupBtn}>Sign-up</button>
                        <span>Already have an account ?</span>
                        <button onClick={() => openModal(true)} className={styles.signinBtn}>Sign-in</button>
                    </div>
                </div>
                <LoginModal closeModal={closeModal} modalIsOpen={modalIsOpen} isSignin={isSignin} />

            </main>
        </div>
    );
}

export default Login;
