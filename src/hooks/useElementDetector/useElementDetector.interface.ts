import { RefObject } from "react";

export interface Options {
    threshold?: number;
    rootMargin?: number;
}

export interface Callbacks {
    onChangeVisibility?: (
      isVisible: boolean,
      ref: RefObject<HTMLElement>
    ) => void;
    onTriggerEnter?: (ref: RefObject<HTMLElement>) => void;
    onTriggerExit?: (ref: RefObject<HTMLElement>) => void;
    onFirstVisible?: (ref: RefObject<HTMLElement>) => void;
  }