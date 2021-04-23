//@ts-nocheck
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import HeaderAnchor from 'editorjs-header-with-anchor'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

const  AlignmentTuneTool  =  require('editorjs-text-alignment-blocktune') ;

export const EDITOR_JS_TOOLS = {
  header: {
    class: HeaderAnchor,
    // tunes: ['anyTuneName']
  },
  anyTuneName: {
    class:AlignmentTuneTool,
    config:{
      default: "right",
      blocks: {
        header: 'center',
        // list: 'right'
      }
    }
  },
  embed: {
    class: Embed,
    services: {
      youtube: true,
      coub: true,
      imgur: true,
      gfycat: true,
      'twitch-video': true,
      'twitch-channel': true,
      vimeo: true,
      vine: true,
      'yandex-music-track': true,
      'yandex-music-album': true,
      'yandex-music-playlist': true,
      'twitter': true,
      'instagram': true,
    },
    inlineToolbar: true
  },
  simpleImage: SimpleImage,
  table: Table,
  image: Image,
  // paragraph: Paragraph,
  list: List,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  warning: Warning,
}
