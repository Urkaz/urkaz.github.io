import { Icon } from "@components/common/Icon";

import styles from "@styles/components/PillLinks.module.scss";

export function LinkPills({ children, className }) {
    return <div className={`${styles["pill-links"]} ${className}`}>{children}</div>;
}

export function LinkPill({ link, iconType, icon, text, target }) {
    return <a className={styles["pill"]} target={target} href={link} rel="noopener noreferrer">
        {icon ? <Icon iconType={iconType} icon={icon} /> : null} {text}
    </a>
}

export function LinkDot({ link, iconType, icon, target }) {
    return <a className={styles["dot"]} target={target} href={link} rel="noopener noreferrer">
        <Icon iconType={iconType} icon={icon} />
    </a>
}
