import waapi from "waapi-client";
import { ak } from "waapi";

export async function testWwise() {
  let client = await waapi.connect("ws://127.0.0.1:8080/waapi");
  const wwiseInfo = await client.call(ak.wwise.core.getInfo, {});
  const wwiseVersion = `${wwiseInfo.displayName} ${wwiseInfo.version.displayName}!`;
  console.log(wwiseVersion);
  return wwiseVersion;
}
