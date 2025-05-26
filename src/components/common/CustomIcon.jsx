
import styles from "@styles/components/CustomIcons.module.scss"

export const CustomIcon = ({ img, className }) => {
    return <img
        src={"/img/icons/empty.png"}
        style={{
            WebkitMaskImage: `url(/img/icons/${img}.png)`,
            maskImage: `url(/img/icons/${img}.png)`,
        }}
        className={`${styles["icon"]} custom-icon ${className ? className : ""}`}
        alt=""
    />
}
