import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/components/thirdparty/custom_markdown.module.scss";

export const MarkdownWarningBlock = ({ children }) => {
    return (
        <span className={`${styles["notice-block"]} ${styles["warning"]}`}>
            <span className={styles["icon"]}><FontAwesomeIcon icon={faTriangleExclamation} /></span>
            <span className={styles["content"]}>{children}</span>
        </span>
    );
}

export const MarkdownNoticeBlock = ({ children }) => {
    return (
        <span className={`${styles["notice-block"]}`}>
            <span className={styles["icon"]}><FontAwesomeIcon icon={faCircleInfo} /></span>
            <span className={styles["content"]}>{children}</span>
        </span>
    );
}