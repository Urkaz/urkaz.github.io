import Markdown from "markdown-to-jsx";


import { MarkdownGallery } from "@components/thirdparty/markdown/MarkdownGallery";
import { MarkdownLink } from "@components/thirdparty/markdown/MarkdownLink";
import { MarkdownNoticeBlock } from "@components/thirdparty/markdown/MarkdownNoticeBlock";

export const CustomMarkdown = ({ content }) => {
    return (
        <Markdown
            options={{
                overrides: {
                    a: {
                        component: MarkdownLink,
                    },
                    gallery: {
                        component: MarkdownGallery,
                    },
                    warning: {
                        component: MarkdownNoticeBlock,
                    },
                },
            }}
        >
            {content}
        </Markdown>
    );
}