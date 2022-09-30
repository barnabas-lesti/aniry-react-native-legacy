import { StyleSheet } from 'react-native';

import { appTheme } from './appTheme';

const gap = appTheme.gaps.medium;
const halfGap = appTheme.gaps.medium / 2;
const quarterGap = appTheme.gaps.medium / 4;

export const appStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    paddingVertical: halfGap,
    paddingHorizontal: gap,
  },

  section: {
    marginVertical: quarterGap,
  },
  sectionTitle: {
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 22,
    marginVertical: quarterGap,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 14,
    marginVertical: quarterGap,
  },
  sectionRow: {
    marginVertical: quarterGap,
  },
});
