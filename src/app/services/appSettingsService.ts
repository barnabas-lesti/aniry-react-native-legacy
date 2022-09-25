import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { appCollectionService } from './appCollectionService';

const DATA_EXPORT_FILE_NAME = 'daisy-export.json';

class AppSettingsService {
  /**
   * Exports all application data to file.
   */
  async exportData(): Promise<void> {
    if (await Sharing.isAvailableAsync()) {
      const dataToExport = {
        collections: await appCollectionService.getCollections(),
      };
      const fileUri = FileSystem.documentDirectory + DATA_EXPORT_FILE_NAME;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(dataToExport), {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(fileUri);
    }
  }

  /**
   * Imports application data from previously exported file.
   * @returns Data from file or null.
   */
  async importData(): Promise<any | null> {
    const { uri } = (await DocumentPicker.getDocumentAsync()) as { uri?: string };
    return uri ? JSON.parse(await FileSystem.readAsStringAsync(uri)) : null;
  }
}

export const appSettingsService = new AppSettingsService();
