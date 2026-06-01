import styles from "./Difficult.module.css"

function Difficult({level}){

    return (
        <>
        <div className={styles.icon} style={{backgroundImage: `url("./../../img/${level}.png")`}}></div>
        </>
    )
}

export default Difficult
