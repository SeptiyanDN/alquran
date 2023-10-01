import * as React from 'react';
import Svg, { SvgProps, Rect } from 'react-native-svg';
import { memo } from 'react';

interface CustomSvgProps extends SvgProps {
  xmlns?: string;
  width?: number;
  height?: number;
}

const SvgComponent = ({ width, height, ...props }: CustomSvgProps) => (
  <>
    {width && height && (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Rect
          width={width - 1}
          height={height - 1}
          x={0.5}
          y={0.5}
          stroke="#E50913"
          strokeDasharray="20 15"
          rx={19.5}
        />
      </Svg>
    )}
  </>
);

const Memo = memo(SvgComponent);
export default Memo;
