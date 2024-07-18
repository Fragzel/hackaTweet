import { useState } from 'react';
import Modal from 'react-modal';
import styles from '../styles/LoginModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { login } from "../reducers/user"


function LoginModal(props) {
    const [signupFirstname, setSignupFirstname] = useState("")
    const [signupUsername, setSignupUsername] = useState("")
    const [signupPassword, setSignupPassword] = useState("")


    const [signinUsername, setSigninUsername] = useState("")
    const [signinPassword, setSigninPassword] = useState("")

    const dispatch = useDispatch()

    const signIn = async () => {
        const body = {
            username: signinUsername,
            password: signinPassword
        }
        const request = await fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        if (response.result) {
            dispatch(login({
                token: response.token,
                username: signinUsername
            }))
            setSigninUsername("")
            setSigninPassword("")

        }

    }

    const signUp = async () => {
        const body = {
            firstname: signupFirstname,
            username: signinUsername,
            password: signinPassword,

        }
        const request = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        if (response.result) {
            dispatch(login({
                token: response.token,
                username: signupUsername
            }))
            setSignupUsername("")
            setSignupPassword("")

        }

    }


    if (props.isSignin) {
        return (
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                className={styles.content}
                contentLabel="Example Modal"
            >
                <div >
                    <div className={styles.faX} >
                        <FontAwesomeIcon icon={faX} onClick={props.closeModal} />
                    </div>
                    <div className={styles.modalContainer}>
                        <img className={styles.modalLogo} src="/images/logo_twitter.png"></img>
                        <h2 className={styles.title}>Connect to Hackatweet </h2>

                        <form className={styles.form}>
                            <input className={styles.input} placeholder='Username' onChange={(e) => setSigninUsername(e.target.value)} value={signinUsername} />
                            <input className={styles.input} placeholder='Password' onChange={(e) => setSigninPassword(e.target.value)} value={signinPassword} />
                            <button className={styles.loginBtn} onClick={signIn} >Sign in</button>

                        </form>
                    </div>
                </div>
            </Modal >
        );
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            className={styles.content}
            contentLabel="Example Modal"
        >

            <div className={styles.faX} >
                <FontAwesomeIcon icon={faX} onClick={props.closeModal} />
            </div>
            <div className={styles.modalContainer}>

                <img className={styles.modalLogo} src="/images/logo_twitter.png"></img>
                <h2 className={styles.title} >Create your Hackatweet account</h2>

                <form className={styles.form}>
                    <input type="text" className={styles.input} placeholder='Firstname' onChange={(e) => setSignupFirstname(e.target.value)} value={signupFirstname} />
                    <input className={styles.input} placeholder='Username' onChange={(e) => setSignupUsername(e.target.value)} value={signupUsername} />
                    <input className={styles.input} placeholder='Password' onChange={(e) => setSignupPassword(e.target.value)} value={signupPassword} />
                    <button className={styles.loginBtn} onClick={signUp} >Sign Up</button>

                </form>
            </div>
        </Modal>
    );

}

export default LoginModal;
