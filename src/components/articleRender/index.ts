import { ArticleRender } from './articleRender'

export interface ConfigProp {
  [s: string]: {
    [s: string]: any;
  };
}

export interface RenderersProp {
  [s: string]: any;
}

export interface Block {
  type: string;
  data: {
    [s: string]: any;
  };
}

export interface DataProp {
  time: number;
  version: string;
  blocks: Block[];
}

export { ArticleRender }
export default ArticleRender
