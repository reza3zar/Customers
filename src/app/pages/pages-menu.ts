import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'خانه',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  // {
  //   title: 'پروفایل',
  //   icon: 'shopping-cart-outline',
  //   link: '/pages/iot-dashboard',allCustomer
  // },
  {
    title: 'بورس کالا',
    icon: 'award-outline',
    group: true,
  },
  {
    title: 'استعلام اطلاعات',
    icon: 'code-outline',

    
    children: [
      {
        title: 'مودیان مالیاتی',
        link: '/exchange/Inquiry',
        icon: 'done-all-outline',

      },
      {
        title: 'اشخاص حقوقی',
        link: '/exchange/InquiryLegalPerson',
        icon: 'done-all-outline',

      },
      {
        title: 'انبارها با کدپستی',
        link: '/exchange/InquiryDepository',
        icon: 'done-all-outline',
      },
      {
        title: 'انبارها با کد ملی',
        link: '/exchange/InquiryDepositoryByNationalId',
        icon: 'done-all-outline',
      },
      {
        title: 'حقیقی فیدا',
        link: '/exchange/InquiryFidaNaturalPerson',
        icon: 'done-all-outline',
      },
      {
        title: 'حقوقی فیدا',
        link: '/exchange/InquiryFidaLegalPerson',
        icon: 'done-all-outline',
      },

      {
        title: 'شماره همراه حقیقی',
        link: '/exchange/InquiryCellInfoIndividual',
        icon: 'done-all-outline',
      },
      {
        title: 'شماره همراه حقوقی',
        link: '/exchange/InquiryCellInfoLegal',
        icon: 'done-all-outline',
      },
      {
        title: ' بهین‌یاب',
        link: '/exchange/exchange/InquiryBehinyabInfo',
        icon: 'done-all-outline',
      },
      {
        title: ' کد ۱۴ رقمی',
        link: '/exchange/exchange/InquiryEx14Code',
        icon: 'done-all-outline',
      },
      
    ],
  },
  {
    title: ' بررسی درخواست کارگزاران',
    icon: 'file-text-outline',
    children: [
      {
        title: 'کارشناس پذیرش',
        link: '/exchange/requestOfBrokers',
        icon: 'expand-outline',
        
      },
      {
        title: 'سرپرست پذیرش',
        link: '/exchange/supervisorManagementRequests',
        icon: 'expand-outline',
        
      },
    ],
  },
  {
    title: ' مدیریت مشتریان',
    icon: 'file-text-outline',
    children: [
      {
        title: 'تمامی مشتریان',
        link: '/exchange/allCustomer',
        icon: 'expand-outline',
        
      },
      {
        title: 'مشتریان حقوقی',
        link: '/exchange/allCustomer',
        icon: 'expand-outline',
      },
      {
        title: 'مشتریان حقیقی',
        link: '/exchange/allCustomer',
        icon: 'expand-outline',
      },
    ],
  },
  {
    title: 'تست کارگزاری',
    icon: 'award-outline',
    group: true,
  },
  {
    title: 'کارگزاران',
    icon: 'file-text-outline',
    children: [
      {
        title: 'مدیریت درخواست‌ها',
        link: '/broker/request',
        icon: 'expand-outline',
        
      },
      {
        title: 'تمامی مشتریان',
         link: '/broker/allCustomer',
        icon: 'expand-outline',
        
      },
    ],
  },

 
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
