import { CustomIcon } from "@components/common/CustomIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@styles/components/PillLinks.module.scss";

export function Icon({ iconType, icon, className}) {
    return <>
        {iconType.includes("custom") ? <CustomIcon className={`${styles["custom-icon"]} ${className}`} img={icon} /> : null}
        {iconType.includes("fontawesome") ? <FontAwesomeIcon className={className} icon={icon} /> : null}
    </>
}
