import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchItems = async () => {
    const jsonValue = await AsyncStorage.getItem("items");
    this.items = jsonValue ? JSON.parse(jsonValue) : [];
  };

  addItem = async (item) => {
    this.items.push(item);
    const jsonValue = JSON.stringify(this.items);
    await AsyncStorage.setItem("items", jsonValue);
  };

  getItemsCount() {
    return this.items.length;
  }
  getTotalPrice() {
    if (this.items?.length === 0) {
      return 0;
    }
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItems = () => {
    return this.items;
  };

  clearCart = async () => {
    this.items = [];
    await AsyncStorage.removeItem("items");
  };
}

const cartStore = new CartStore();
cartStore.fetchItems();
export default cartStore;
