import MDXCodeBlock from "./MDXCodeBlock";

export const mdxComponents = {
  pre: ({ children }: { children: any }) => {
    const codeEl = children?.props;
    return (
      <MDXCodeBlock className={codeEl?.className}>
        {codeEl?.children}
      </MDXCodeBlock>
    );
  },
};