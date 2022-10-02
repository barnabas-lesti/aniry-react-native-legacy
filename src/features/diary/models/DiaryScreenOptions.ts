import { DiaryStackParamList } from './DiaryStackParamList';

export type DiaryScreenOptions = {
  name: keyof DiaryStackParamList;
  titleKey: string;
  Component: () => JSX.Element;
};
