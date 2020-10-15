const GoPlugin = Deno.openPlugin("./target/debug/libgodeno.so");
const encoder = new TextEncoder();
const denoOps = Deno.core.ops();

const GoOp = denoOps["godeno::call"];

Deno.core.dispatch(GoOp, encoder.encode("./go.so"), encoder.encode("plugin"), encoder.encode("a JS String"))


