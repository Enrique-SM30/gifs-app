import { Gif } from "../interfaces/gif.interface";
import { GihpyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {

  static mapGiphyItemToGif(  item: GihpyItem ): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original["url"],
    }
  }

  static mapGiphyItemsToGifArray(  items: GihpyItem[] ): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
