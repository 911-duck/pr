import styles from "./Icon.module.css"

function Icon({heigth, width}){
    return (
        <>
        <div className={styles.icon} style={{height: `${heigth}px`, width: `${width}px`}}></div>
        </>
    )
}

export default Icon