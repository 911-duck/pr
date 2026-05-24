import styles from "./Button.module.css"

function Button({color, text, action, type = 0}){
    if(type == 0){
    return (
        <>
        <div className={styles.button} onClick={()=> {action()}} style={{color: `${color}`, borderColor: `${color}`}}>{text}</div>
        </>
    )
    }
    else if(type == 1) {
       return (
        <>
        <div className={styles.button2} onClick={()=> {action()}} style={{color: `${color}`, borderColor: `${color}`}}>{text}</div>
        </>
    ) 
    }   
}

export default Button