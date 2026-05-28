import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Import languages
import ini from "react-syntax-highlighter/dist/esm/languages/prism/ini";
import xml from "react-syntax-highlighter/dist/esm/languages/prism/xml-doc";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";

// Register
SyntaxHighlighter.registerLanguage("ini", ini);
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("cpp", cpp);

export const MarkdownCodeBlock = ({ children, className, node, ...rest }) => {
    const match = /language-(\w+)/.exec(className || '');

    return match ? (
        <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]}
            style={atomDark}
            showLineNumbers={true}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    )
};