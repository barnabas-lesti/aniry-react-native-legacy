import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

class UUIDService {
  /**
   * Generates a unique ID.
   * @returns UUID string.
   */
  generateID() {
    return uuid();
  }
}

/**
 * Application UUID generator service.
 */
export const uuidService = new UUIDService();
