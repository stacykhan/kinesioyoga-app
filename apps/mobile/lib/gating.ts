import { hasPremiumEntitlement } from './purchases';

export const canAccessLesson = async (isPremium: boolean, isAuthed: boolean) => {
  if (!isPremium) return true;
  if (!isAuthed) return false;
  return hasPremiumEntitlement();
};
