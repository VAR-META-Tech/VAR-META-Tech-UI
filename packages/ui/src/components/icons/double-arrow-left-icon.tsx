import * as React from 'react';
import { type SVGProps } from 'react';

const DoubleArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6 17L11 12L6 7M13 17L18 12L13 7"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DoubleArrowLeftIcon;
