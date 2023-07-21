export type BaseModel<M = Record<string, any>> = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  removed?: boolean;
} & M;

export type StrOrObj = string | object;
export type ObjectIdType<
  T extends { [key: string]: any } = any,
  K extends StrOrObj = string
> = K extends string ? string : T;

type QueryType<M> = {
  [key in keyof M]?:
    | M[key]
    | {
        $ne?: M[key];
        $nin?: Array<M[key]>;
        $regex?: string;
        $options?: string;
      };
};

export type QueryProps<M> = {
  skip?: number;
  limit?: number;
  total?: boolean;
  sort?: { [key in keyof M]?: "asc" | "desc" | 1 | -1 };
  select?: { [key in keyof M]?: boolean };
  populate?: keyof M | string;
  $where?: string;
} & QueryType<M>;
