'use client'
import { useRouter } from 'next/navigation'

import { fromMarkdown } from 'react-markdown-toc'
import { TOC } from 'react-markdown-toc/client'

import styles from "@styles/components/thirdparty/markdown_toc.module.scss";

export const MarkdownTOC = ({ markdown }) => {

    const router = useRouter()
    const toc = fromMarkdown(markdown)

    return (
        <div className={styles['markdown-toc-sticky']}>
            <div className={styles['toc-list']}>
                <div className={styles['toc-list-wrap']}>
                    <h4>Table of Contents</h4>
                    <TOC
                        toc={toc}
                        scrollAlign='start'
                        renderList={children => (
                            <div className={`${styles["toc-content"]} overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up`}>
                                {children}
                            </div>
                        )}
                        renderListItem={(children, open) => <div className={styles['toc-group']} open={open}>{children}</div>}
                        renderLink={(children, href, active) => (
                            <div className={styles['toc-item']}>
                                <span
                                    data-active={active}
                                    role='button'
                                    onClick={() => {
                                        router.push(href, { scroll: false })
                                        const target = document.querySelector(href)
                                        if (target) {
                                            const headerOffset = 100;
                                            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset
                                            const offsetPosition = elementPosition - headerOffset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            })
                                        }
                                    }}
                                >
                                    {children}
                                </span>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}