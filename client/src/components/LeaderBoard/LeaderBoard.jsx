import styles from "./LeaderBoard.module.css"

function LeaderBoard({obj}){
    return (
        <>
            <div className={styles.cont}>
                <h1>таблица зачёта</h1>
                {obj?obj.sort((b,a)=>Number(((((20 + 20*(a.lvl-1))/2)*(a.lvl-1)) + a.lvlPr)) - Number(((((20 + 20*(b.lvl-1))/2)*(b.lvl-1)) + b.lvlPr))).slice(0,5).map((el,i)=>{
                    if(i == 0) return (
                    <>
                    <div className={styles.lead1}><span>{i+1}</span><span>{el.name}</span><span>{((((20 + 20*(el.lvl-1))/2)*(el.lvl-1)) + el.lvlPr) + " exp."}</span></div>
                    </>
                )
                if(i == 1) return (
                    <>
                    <div className={styles.lead2}><span>{i+1}</span><span>{el.name}</span><span>{((((20 + 20*(el.lvl-1))/2)*(el.lvl-1)) + el.lvlPr) + " exp."}</span></div>
                    </>
                )
                if(i == 2) return (
                    <>
                    <div className={styles.lead3}><span>{i+1}</span><span>{el.name}</span><span>{((((20 + 20*(el.lvl-1))/2)*(el.lvl-1)) + el.lvlPr) + " exp."}</span></div>
                    </>
                )
                return (
                    <>
                    <div className={styles.leadOther}><span>{i+1}</span><span>{el.name}</span><span>{((((20 + 20*(el.lvl-1))/2)*(el.lvl-1)) + el.lvlPr) + " exp."}</span></div>
                    </>
                )
                }):"loading..."}
            </div>
        </>
    )
}

export default LeaderBoard