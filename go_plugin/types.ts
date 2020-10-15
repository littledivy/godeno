// @ts-ignore
export const core = Deno.core as {
  ops: () => { [key: string]: number };
  setAsyncHandler(rid: number, handler: (response: Uint8Array) => void): void;
  dispatch(
    rid: number,
    ...buf: ArrayBufferView[]
  ): Uint8Array | undefined;
};
