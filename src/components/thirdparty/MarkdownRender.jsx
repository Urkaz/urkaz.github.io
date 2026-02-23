import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { MarkdownGallery } from "@components/thirdparty/markdown/MarkdownGallery";
import { MarkdownLink } from "@components/thirdparty/markdown/MarkdownLink";
import { MarkdownNoticeBlock, MarkdownWarningBlock } from "@components/thirdparty/markdown/MarkdownNoticeBlock";
import { MarkdownCodeBlock } from "@components/thirdparty/markdown/MarkdownCodeBlock";
import { MarkdownIsotope } from "@components/thirdparty/markdown/MarkdownIsotope";
import { MarkdownIcon } from "@components/thirdparty/markdown/MarkdownIcon";

const components = {
    a: MarkdownLink,
    gallery: MarkdownGallery,
    warning: MarkdownWarningBlock,
    notice: MarkdownNoticeBlock,
    code: MarkdownCodeBlock,
    isotope: MarkdownIsotope,
    icon: MarkdownIcon,
}

export const MarkdownRender = ({ content }) => {
    return (
        <Markdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug,
                [rehypeAutolinkHeadings, {
                    behavior: "prepend",
                    properties: {
                        className: "anchor-link"
                    },
                    content: {
                        type: "element",
                        tagName: "span",
                        properties: { "aria-hidden": "true" },
                        children: [{ type: "text", value: "# " }]
                    }
                }]
            ]}
        >
            {content}
        </Markdown>
    );
}