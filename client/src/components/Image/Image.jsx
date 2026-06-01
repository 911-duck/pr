import styles from "./Image.module.css";

function Image({ url, heigth, width, color, size, hover}) {
    if(!width) width = heigth
    if(!size) size = 100
    if(hover == 1) {
        return (
            <>
            <div className={styles.imageH} style={{backgroundColor: color, backgroundImage: `url(${url})`, width: width, height: heigth, backgroundSize: `${size}%`}} ></div>
            </>
        )
    }else if(hover == 2){
        return (
            <>
            <div className={styles.imageW} style={{backgroundColor: color, backgroundImage: `url(${url})`, width: width, height: heigth, backgroundSize: `${size}%`}} ></div>
            </>
        )
    }
    return (
            <>
            <div className={styles.image} style={{backgroundColor: color, backgroundImage: `url(${url})`, width: width, height: heigth, backgroundSize: `${size}%`}} ></div>
            </>
        )
}

export default Image;
