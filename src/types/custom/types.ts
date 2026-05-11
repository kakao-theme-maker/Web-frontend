// 커스텀 tabs 배열용 타입
export interface ICategoryTab {
  id: string;
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface ISubCategoryTab {
  id: string;
  label: string;
}
