export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Add Training',
      route: '/Trainings/Add',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
  ]
  
  export const trainingDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }