import axios from "axios";
import { IProductInventory } from "@/types/Product";
import { IShipment } from "@/types/Shipment";
import { IInventoryTimeline } from "@/types/InventoryGraph";
// import {IInventoryTimeline} from "@/types/";

/**
 * Inventory Service.
 * Provides UI business logic associated with product inventory
 */
export class InventoryService {
  API_URL = process.env.VUE_APP_API_URL;

  public async getInventory(): Promise<IProductInventory[]> {
    console.log("getInventory", this.API_URL);
    const result = await axios.get(`${this.API_URL}/inventory/`);
    return result.data;
  }

  public async updateInventoryQuantity(shipment: IShipment) {
    shipment.adjustment = parseInt(String(shipment.adjustment));
    const result = await axios.patch(`${this.API_URL}/inventory/`, shipment);
    return result.data;
  }

  public async getSnapshotHistory(): Promise<IInventoryTimeline> {
    const result: any = await axios.get(`${this.API_URL}/inventory/snapshot`);
    return result.data;
  }
}
