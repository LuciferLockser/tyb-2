// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== TRAINING PARAMS
export type CreateTrainingParams = {
  userId: string;
  training: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url?: string | null;  
  };
  path: string;
};


export type UpdateTrainingParams = {
  userId: string
  training: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string | null
  }
  path: string
}

export type DeleteTrainingParams = {
  trainingId: string
  path: string
}

export type GetAllTrainingsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type GetTrainingsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedTrainingsByCategoryParams = {
  categoryId: string
  trainingId: string
  limit?: number
  page: number | string
}

export type Training = {
  _id: string
  title: string
  description: string
  price: string
  isFree: boolean
  imageUrl: string
  location: string
  startDateTime: Date
  endDateTime: Date
  url: string
  organizer: {
    _id: string
    firstName: string
    lastName: string
  }
  category: {
    _id: string
    name: string
  }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  trainingTitle: string
  trainingId: string
  price: string
  isFree: boolean
  buyerId: string
}

export type CreateOrderParams = {
  trainingId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};


export type GetOrdersByTrainingParams = {
  trainingId: string
  searchString: string
}

export type GetOrdersByUserParams = {
  userId: string | null
  limit?: number
  page: number 
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
