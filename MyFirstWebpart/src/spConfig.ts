import { SPFI, spfi } from "@pnp/sp";
import { SPFx } from "@pnp/sp";

let sp: SPFI;

export const getSP = (context?: any): SPFI => {
  if (!sp && context) {
    sp = spfi().using(SPFx(context));
  }
  return sp;
};
