import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

class AppUidService {
  generateID() {
    return uuid();
  }
}

export const appUidService = new AppUidService();
