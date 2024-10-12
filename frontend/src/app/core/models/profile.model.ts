export interface Profile {
  username?: string;
  bio?: string;
  image?: string;
  following?: boolean;
  followerList?: [];
  n_followers?: number;
  followList?: [];
  n_follows?: number;
  products?: [];
  favouriteProducts?: [];
  n_favorited?: number;
}
