import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/components/thirdparty/custom_markdown.module.scss";

export const MarkdownNoticeBlock = ({ children }) => {
    return (
        <div className={styles["notice-block"]}>
            <div className={styles["icon"]}><FontAwesomeIcon icon={faTriangleExclamation} /></div>
            <div className={styles["content"]}>{children}</div>
        </div>
    );
}