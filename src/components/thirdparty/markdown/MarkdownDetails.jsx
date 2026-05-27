import styles from "@styles/components/thirdparty/custom_markdown.module.scss";

export const MarkdownDetails = ({ children, ...props }) => {
    return (
        <details className={styles["details"]} {...props}>
            {children}
        </details>
    );
}