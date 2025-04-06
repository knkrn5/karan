import { ReactNode } from 'react';
import { BLOCKS, Block, Inline, INLINES } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';

interface EmbeddedAsset {
  data: {
    target: {
      fields: {
        file: { url: string };
        title?: string;
      };
    };
  };
}

interface HyperlinkNode {
  data: { uri: string };
  content: Array<{ value: string }>;
}

const options: Options = {
  /*  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <strong className="font-semibold text-gray-900 dark:text-white">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: ReactNode) => (
      <em className="italic text-gray-700 dark:text-gray-300">{text}</em>
    ),
  }, */
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const target = (node as unknown as EmbeddedAsset).data.target;
      return (
        <img
          src={target.fields.file.url}
          alt={target.fields.title || 'Asset'}
          className=" w-[450px] my-4 rounded"
        />
      );
    },
    [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
      <h2 className="text-2xl font-extrabold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
      <h3 className="text-2xl font-extrabold mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
      <h4 className="text-2xl font-extrabold mb-3">{children}</h4>
    ),
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
      <p className="text-base leading-7 text-gray-700 dark:text-gray-300 mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ul className="list-disc pl-10 text-gray-800 marker:text-black dark:text-gray-100 dark:marker:text-white">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) => (
      <ol className="list-decimal pl-10  text-gray-800 marker:text-black dark:text-gray-100 dark:marker:text-white">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: Block | Inline, children: ReactNode) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 mb-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="-my-200 w-full border-gray-800 dark:border-gray-400" />,
    [INLINES.HYPERLINK]: (node: Block | Inline) => {
      const data = (node as unknown as HyperlinkNode).data;
      const content = (node as unknown as HyperlinkNode).content;
      const url = data.uri;
      const linkText = content[0]?.value || 'Link';
      return (
        <a href={url} className="text-blue-600" target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      );
    },
  },
};

export default options;
