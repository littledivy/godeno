// Copyright 2020-present Divy Srivastava and friends. All rights reserved. MIT license.

import { prepare } from "./deps.ts";
import { filename } from "./os.ts";
import constants from "./constants.ts";
import { core } from "./types.ts";

const { filenameBase, pluginBase } = constants;

const isDev = Deno.env.get("DEV");

if (isDev) {
  // This will be checked against open resources after Plugin.close()
  // in runTestClose() below.
  const resourcesPre = Deno.resources();

  const rid = Deno.openPlugin("../target/debug/" + filename(filenameBase));
} else {
  // logger.info(`Downloading latest Autopilot release from Github`);
  const pluginId = await prepare({
    name: "godeno",
    urls: {
      darwin: `${pluginBase}/libgodeno.dylib`,
      windows: `${pluginBase}/godeno.dll`,
      linux: `${pluginBase}/libgodeno.so`,
    },
  });
}

const denoOps = core.ops();
export const GoOp = denoOps["godeno::call"];
