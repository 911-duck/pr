import styles from './Message.module.css'
function Message({m, color, top}){
    return (
        <>
        <div className={styles.message} style={{borderColor: color, color: color, top: top}}>{m}</div>
        </>
    )
}

export default Message