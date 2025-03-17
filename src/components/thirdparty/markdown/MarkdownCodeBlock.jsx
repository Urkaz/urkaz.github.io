import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const MarkdownCodeBlock = ({ children, className, node, ...rest }) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
        <SyntaxHighlighter
            {...rest}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            style={atomDark}
            showLineNumbers={true}
        />
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    )
};