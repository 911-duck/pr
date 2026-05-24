import styles from "./User.module.css"

function User({name}){

    return (
        <>
        <div className={styles.icon} style={{}}>
            <div className={styles.bg}></div>
            <span className={styles.name}>{name ? name.length >= 13? name.slice(0,10)+"..." : name : "..."}</span>
        </div>
        </>
    )
}

export default User