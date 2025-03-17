import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const setupSP = (context: any): void => {
  sp.setup({
    spfxContext: context,
  });
};
