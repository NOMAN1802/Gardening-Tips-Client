declare module 'react-quill' {
    import * as React from 'react';
  
    export interface ReactQuillProps {
      value?: string;
      defaultValue?: string;
      placeholder?: string;
      theme?: string;
      modules?: object;
      formats?: string[];
      readOnly?: boolean;
      onChange?: (content: string, delta: any, source: any, editor: any) => void;
      onFocus?: (range: any, source: any, editor: any) => void;
      onBlur?: (previousRange: any, source: any, editor: any) => void;
      onKeyPress?: React.EventHandler<any>;
      className?: string;
    }
  
    class ReactQuill extends React.Component<ReactQuillProps> {
      focus(): void;
      blur(): void;
      getEditor(): any;
    }
  
    export default ReactQuill;
  }
  