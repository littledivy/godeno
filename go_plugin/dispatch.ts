import { GoOp } from "./open_plugin.ts";
import { core } from "./types.ts";

export class GoDeno {
  public plugin_path: string;
  private encoder = new TextEncoder();
  constructor(plugin_path: string) {
    this.plugin_path = plugin_path;
  }
  dispatch(op: string, arg: string): Uint8Array | undefined {
    return core.dispatch(
      GoOp,
      this.encoder.encode(this.plugin_path),
      this.encoder.encode(op),
      this.encoder.encode(arg),
    );
  }
}
