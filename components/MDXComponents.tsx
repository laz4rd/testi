import MDXCodeBlock from "./MDXCodeBlock";
import { ReactElement } from "react";

type CodeProps = {
  className?: string;
  children?: string;
};

export const mdxComponents = {
  pre: ({ children }: { children: ReactElement<CodeProps> }) => {
    const codeEl = children?.props;
    return (
      <MDXCodeBlock className={codeEl?.className}>
        {codeEl?.children}
      </MDXCodeBlock>
    );
  },
};