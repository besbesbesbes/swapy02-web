import { data_assets_temp } from "../data/data_assets_temp.js";
import { data_assets_pic } from "../data/data_assets_pic.js";

const data_assets = data_assets_temp.map((el) => {
  return {
    ...el,
    pic: data_assets_pic
      .filter((el_pic) => el.asset_id == el_pic.asset_id) // Filter matching pics
      .map((el_pic) => el_pic.asset_pic), // Map to asset_pic
  };
});

export { data_assets };
