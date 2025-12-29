import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-8 mb-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-10 mb-4 pb-2 border-b border-border/40">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">
              {children}
            </h4>
          ),
          
          // Paragraphs
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-4">
              {children}
            </p>
          ),
          
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-muted-foreground">
              {children}
            </li>
          ),
          
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-muted-foreground">
              {children}
            </em>
          ),
          
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          
          // Inline code
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-secondary/60 text-primary font-mono text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border) / 0.4)',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'var(--font-mono)',
                  }
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
          
          // Code blocks wrapper
          pre: ({ children }) => (
            <div className="my-6 overflow-hidden rounded-xl">
              {children}
            </div>
          ),
          
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/40 pl-4 my-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          
          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-border/40" />
          ),
          
          // Tables
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse border border-border/40 rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary/40">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border/40">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-muted-foreground border-b border-border/20">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
