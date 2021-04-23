import React, { FC } from 'react'
import styled from '@emotion/styled'
import { ConfigProp, DataProp, RenderersProp } from '~/components/articleRender';
import Code from './renderers/code';
import Delimiter from './renderers/delimiter';
import Embed from './renderers/embed';
import Header from './renderers/header';
import Image from './renderers/image';
import List from './renderers/list';
import Paragraph from './renderers/paragraph';
import Quote from './renderers/quote';
import Table from './renderers/table';

interface ArticleRenderProps {
  data: DataProp;
  config?: ConfigProp;
  renderers?: RenderersProp;
}

const _ArticleRender: FC<ArticleRenderProps> = ({data, config = {}, renderers = {}}) => {
  const defaultRenderers = {
    code: Code,
    delimiter: Delimiter,
    embed: Embed,
    header: Header,
    image: Image,
    simpleImage: Image,
    list: List,
    paragraph: Paragraph,
    quote: Quote,
    table: Table,
  };

  const availableRenderers = {
    ...defaultRenderers,
    ...renderers,
  }

  return (
    <ArticleRender>
      {data?.blocks?.map((block, i) => {
        if (block.type.toString() in availableRenderers) {
          // @ts-ignore Todo: find a fix
          const Tag = availableRenderers[block.type];
          return <Tag key={i} data={block.data} {...config[block.type]} />;
        }
      })}
    </ArticleRender>
  )
}

const ArticleRender = styled.div`
  max-width: 650px;
  margin: 0 auto;
`

export { _ArticleRender as ArticleRender }
