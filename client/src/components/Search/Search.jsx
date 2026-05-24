import styles from "./Search.module.css";

function Search({sort2, sort1, sort3,sort4,sort5}) {

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.icon}></div>
        <input className={styles.inpute} onChange={(e)=>{
          sort5(e.target.value)
        }} placeholder="поиск..." />
        {sort1?(<><button
        onClick={sort1}
          className={styles.switchb}
          >
          по сложности
        </button></>):(<></>)}
        {sort2?(<><button
          onClick={sort2}
          className={styles.switchb}
        >
          по награде
        </button></>):(<></>)}
        <button
          onClick={sort3}
          className={styles.switchb}
        >
          по названию
        </button>
        <div className={styles.iconF} onClick={sort4}></div>
      </div>
    </>
  );
}

export default Search;
