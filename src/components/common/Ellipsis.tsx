import { ComponentProps } from 'react'

export const Ellipsis = ({
  inverted = false,
  ...restProps
}: ComponentProps<'svg'> & {
  inverted?: boolean
}) => {
  return inverted ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: 'auto', shapeRendering: 'auto' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...restProps}
    >
      <circle cx="84" cy="50" r="10" fill="#1A202C">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.7142857142857142s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#1A202C;#1A202C;#1A202C;#1A202C;#1A202C"
          begin="0s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#1A202C">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
      </circle>
      <circle cx="50" cy="50" r="10" fill="#1A202C">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.7142857142857142s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.7142857142857142s"
        />
      </circle>
      <circle cx="84" cy="50" r="10" fill="#1A202C">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.4285714285714284s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.4285714285714284s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#1A202C">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-2.142857142857143s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-2.142857142857143s"
        />
      </circle>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: 'auto', shapeRendering: 'auto' }}
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid"
      {...restProps}
    >
      <circle cx="84" cy="50" r="10" fill="#ffffff">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.7142857142857142s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#ffffff;#ffffff;#ffffff;#ffffff;#ffffff"
          begin="0s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#ffffff">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
      </circle>
      <circle cx="50" cy="50" r="10" fill="#ffffff">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.7142857142857142s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.7142857142857142s"
        />
      </circle>
      <circle cx="84" cy="50" r="10" fill="#ffffff">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.4285714285714284s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.4285714285714284s"
        />
      </circle>
      <circle cx="16" cy="50" r="10" fill="#ffffff">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-2.142857142857143s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2.8571428571428568s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-2.142857142857143s"
        />
      </circle>
    </svg>
  )
}
