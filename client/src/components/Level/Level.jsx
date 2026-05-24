import styles from "./Level.module.css"

function Level({level, pr}){
    return (
        <>
        <div className={styles.icon} >
            <div className={styles.name}> <span>уровень {String(level)}</span> <span>{pr}/{level*20} exp.</span> </div>
            <div className={styles.sbar} style={{background: `linear-gradient(90deg,rgba(0, 255, 0, 1) 0%, rgba(0, 255, 0, 1) ${pr*(100/(level*20))}%, rgba(115, 115, 115, 1) ${pr*(100/(level*20))}%, rgba(115, 115, 115, 1) 100%)`}}></div>
        </div>
        </>
    )
}

export default Level