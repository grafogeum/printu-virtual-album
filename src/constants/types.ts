import { PutEffect } from "redux-saga/effects";

export type CanvasData = {
  id: string;
  project: {
    height: number;
    id: string;
    items: Items[];
    name: string;
    width: number;
  };
};

export type Items = {
  color: string;
  height: number;
  id: string;
  rotation: number;
  type: "rectangle" | "ellipse";
  width: number;
  x: number;
  y: number;
};

export type ItemShape = Pick<Items, "width" | "height" | "color">;

type FetchDataResponse = {
  json: () => Promise<void>;
  message: string;
  ok: boolean;
  status: number;
};

export type GetCanvasDataActionType = Generator<
  | Promise<void | CanvasData>
  | Promise<Response>
  | PutEffect<{ type: string; payload: FetchDataResponse }>
  | PutEffect<{ type: string; error: Error }>
  | PutEffect<{ type: string; error: unknown }>,
  void,
  FetchDataResponse
>;

export type WrappedCanvasData = {
  data: CanvasData | {};
  error: Error | null;
};
