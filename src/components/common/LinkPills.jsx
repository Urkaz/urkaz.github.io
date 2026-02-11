import { Icon } from "@components/common/Icon";

import styles from "@styles/components/PillLinks.module.scss";

export function LinkPills({ children, className }) {
    return <div className={`${styles["pill-links"]} ${className}`}>{children}</div>;
}

export function LinkPill({link, iconType, icon, text}) {
    return <a className={styles["pill"]} target="_blank" href={link} rel="noopener noreferrer">
        <Icon iconType={iconType} icon={icon} /> {text}
    </a>
}

export function LinkDot({link, iconType, icon}) {
    return <a className={styles["dot"]} target="_blank" href={link} rel="noopener noreferrer">
        <Icon iconType={iconType} icon={icon} />
    </a>
}
