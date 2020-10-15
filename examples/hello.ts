import { GoDeno } from "../go_plugin/mod.ts";

let plugin = new GoDeno("./hello.so");
plugin.dispatch("plugin", "A JS String");
