import { UserRegistration } from "@type/data/user";

export default function sanitizeObject<T, K extends keyof T>(
  object: T,
  keysToRemove: K[],
): Omit<T, K> {
  const sanitizedObject = { ...object };
  keysToRemove.forEach((key) => delete sanitizedObject[key]);
  return sanitizedObject as Omit<T, K>;
}