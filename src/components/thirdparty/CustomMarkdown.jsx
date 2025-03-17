import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";

import { MarkdownGallery } from "@components/thirdparty/markdown/MarkdownGallery";
import { MarkdownLink } from "@components/thirdparty/markdown/MarkdownLink";
import { MarkdownNoticeBlock, MarkdownWarningBlock } from "@components/thirdparty/markdown/MarkdownNoticeBlock";
import { MarkdownCodeBlock } from "@components/thirdparty/markdown/MarkdownCodeBlock";

const components = {
    a: MarkdownLink,
    gallery: MarkdownGallery,
    warning: MarkdownWarningBlock,
    notice: MarkdownNoticeBlock,
    code: MarkdownCodeBlock,
}

export const CustomMarkdown = ({ content }) => {
    return (
        <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {content}
        </ReactMarkdown>
    );
}