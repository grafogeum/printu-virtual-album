import { PutEffect } from "redux-saga/effects";

export type CanvasData = {
  id: string;
  project: {
    id: string;
    name: string;
    width: number;
    height: number;
    items: Items[];
  };
};

export type Items = {
  id: string;
  type: "rectangle" | "ellipse";
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type FetchDataResponse = {
  ok: boolean;
  json: () => Promise<void>;
  status: number;
  message: string;
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
