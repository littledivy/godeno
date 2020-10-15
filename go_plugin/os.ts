// MIT license (c) 2020 Divy Srivastava. All rights reserved.

export function filename(filenameBase: string): string {
  let filenameSuffix = ".so";
  let filenamePrefix = "lib";

  if (Deno.build.os === "windows") {
    filenameSuffix = ".dll";
    filenamePrefix = "";
  }
  if (Deno.build.os === "darwin") {
    filenameSuffix = ".dylib";
  }

  return `${filenamePrefix}${filenameBase}${filenameSuffix}`;
}
