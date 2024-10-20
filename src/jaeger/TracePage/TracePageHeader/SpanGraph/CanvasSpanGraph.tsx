

import renderIntoCanvas from './render-into-canvas';
import colorGenerator from '../../../utils/colorGenerator';

import './CanvasSpanGraph.css';
import { defineComponent, onMounted } from 'vue';

type CanvasSpanGraphProps = {
  items: { valueWidth: number; valueOffset: number; serviceName: string }[];
  valueWidth: number;
};

const getColor = (hex: string) => colorGenerator.getRgbColorByKey(hex);

export default defineComponent({
  name: 'CanvasSpanGraph',
  setup(props:any) {
  let   _canvasElm: HTMLCanvasElement | null | undefined;

      _canvasElm = undefined;

    onMounted(() => {
      _draw();
   })

    // componentDidUpdate() {
    //   _draw();
    // }

    const _setCanvasRef = (elm: HTMLCanvasElement | null | undefined) => {
      _canvasElm = elm;
    };

   const  _draw = ()=> {
      if (_canvasElm) {
        const { valueWidth: totalValueWidth, items } = props;
        renderIntoCanvas(_canvasElm, items, totalValueWidth, getColor);
      }
    }

    return () => (
      <canvas className="CanvasSpanGraph" ref={_setCanvasRef} />
    )
  }
})

// export default class CanvasSpanGraph extends React.PureComponent<CanvasSpanGraphProps> {
 
// }
