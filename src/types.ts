export type ItemId = string & { readonly _: unique symbol };

export type BaseItem = {
  id: ItemId;
};

export type Node<Item extends BaseItem> = Item & {
  children: Array<Item>;
};

export type Leaf<Item extends BaseItem> = Item;

type TreeItem<Item extends BaseItem = BaseItem> = Leaf<Item> | Node<Item>;

export type Tree<Item extends BaseItem = BaseItem> = Array<TreeItem<Item>>;
