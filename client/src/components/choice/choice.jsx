import styles from "./choice.module.css"

function Choice({names,values, color, set}){
    return (
        <>
        <select className={styles.select} style={{color: color}} onChange={(event)=> {set(event.target.value)}}>
            {names.map((el,i)=>{
                return (<option value={values[i]}>{el}</option>)
            })}
        </select>
        </>
    )
}

export default Choice