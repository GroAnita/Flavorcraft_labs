export type ISODateString = string;

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  image: RecipeImage | null;
  owner: Profile;
  comments: Comment[];
  _count: object;
  created: Date;
  updated: Date;
}

export interface Comment {
  id: string;
  text: string;
  recipeId: string;
  author: Profile;
  created: Date;
  updated: Date;
}

export interface Profile {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeImage {
  url: string;
  alt: string;
}

export interface SearchParams {
  search: string;
  category: string;
  difficulty: string;
}

export interface PantryItems {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  owner: Profile;
  created: Date;
  updated: Date;
}

export interface Favorite {
  id: string;
  recipeId: string;
  recipe: Recipe;
  owner: Profile;
  created: Date;
}

export interface MealPlan {
  id: string;
  recipeId: string;
  recipe: Recipe;
  date: Date;
  mealType: string;
  owner: Profile;
  created: Date;
}

export interface DateRange {
  startDate: ISODateString;
  endDate: ISODateString;
}
