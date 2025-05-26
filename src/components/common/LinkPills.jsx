import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomIcon } from "@components/common/CustomIcon";

import styles from "@styles/components/PillLinks.module.scss";

export function LinkPills({ children, className }) {
    return <div className={`${styles["pill-links"]} ${className}`}>{children}</div>;
}

export function LinkPill({link, iconType, icon, text}) {
    return <a className={styles["pill"]} target="_blank" href={link} rel="noopener noreferrer">
        {iconType.includes("custom") ? <><CustomIcon img={icon} /> {text}</> : null}
        {iconType.includes("fontawesome") ? <><FontAwesomeIcon icon={icon} /> {text}</> : null}
    </a>
}

export function LinkDot({link, iconType, icon}) {
    return <a className={styles["dot"]} target="_blank" href={link} rel="noopener noreferrer">
        {iconType.includes("custom") ? <CustomIcon img={icon} /> : null}
        {iconType.includes("fontawesome") ? <FontAwesomeIcon icon={icon} /> : null}
    </a>
}
