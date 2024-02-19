import { MouseEventHandler, MutableRefObject } from "react";

interface ButtonProps {
  cssButton: string;
  cssArrow: string;
  src: string;
  alt: string;
  nodeRef?: MutableRefObject<null>;
  action?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={props.cssButton}
      ref={props.nodeRef}
      onClick={props.action}
    >
      <img src={props.src} alt={props.alt} className={props.cssArrow} />
    </button>
  );
};
