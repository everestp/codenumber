import conf from "@/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class StorageService {
  private client: Client;
  private databases: Databases;
  private bucket: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async postNotice({
    id,
    title,
    content,
    important,
    imageUrl,
    imageId,
    category,
    date,
  }: {
    id: string;
    title: string;
    content: string;
    important?: boolean;
    imageUrl?: string;
    imageId?: string;
    category: string;
    date: string;
  }): Promise<any> {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNoticeCollectionId,
        id,
        {
          title,
          content,
          important,
          imageUrl,
          imageId,
          category,
          date,
        }
      );
    } catch (error) {
      console.error("Error posting notice:", error);
      throw error;
    }
  }

  async postImage({
    id,
    title,
    imageUrl,
    imageId,
    category,
   
  }: {
    id: string;
    title: string;
    imageUrl?: string;
    imageId?: string;
    category: string;
  
  }): Promise<any> {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteGalleryCollectionId,
        id,
        {
          title,
          imageUrl,
          imageId,
          category,
         
        }
      );
    } catch (error) {
      console.error("Error posting gallery item:", error);
      throw error;
    }
  }

  async updateImage(
    id: string,
    {
      title,
      imageUrl,
      imageId,
      category,
      type,
    }: {
      title: string;
      imageUrl?: string;
      imageId?: string;
      category: string;
      type: "image" | "video";
    }
  ): Promise<any> {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteGalleryCollectionId,
        id,
        {
          title,
          imageUrl,
          imageId,
          category,
          type,
        }
      );
    } catch (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }
  }

  async deleteImage(id: string): Promise<boolean> {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteGalleryCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      return false;
    }
  }

  async uploadFile(file: File): Promise<any> {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async updateNotice(
    id: string,
    {
      title,
      content,
      category,
      important,
      imageUrl,
      imageId,
      date,
    }: {
      title: string;
      content: string;
      category: string;
      important?: boolean;
      imageUrl?: string;
      imageId?: string;
      date: string;
    }
  ): Promise<any> {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNoticeCollectionId,
        id,
        {
          title,
          content,
          category,
          important,
          imageUrl,
          imageId,
          date,
        }
      );
    } catch (error) {
      console.error("Error updating notice:", error);
      throw error;
    }
  }

  async deleteNotice(id: string): Promise<boolean> {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteNoticeCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.error("Error deleting notice:", error);
      return false;
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFilePreview(fileId: string): string {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

  async getNotice(): Promise<any[] | undefined> {
    try {
      const data = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteNoticeCollectionId,
        [Query.limit(300), Query.offset(0)]
      );
      return data.documents;
    } catch (error) {
      console.error("Error fetching notices:", error);
      return undefined;
    }
  }

  async getGallery(): Promise<any[] | undefined> {
    try {
      const data = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteGalleryCollectionId,
        [Query.limit(300), Query.offset(0)]
      );
      return data.documents;
    } catch (error) {
      console.error("Error fetching gallery:", error);
      return undefined;
    }
  }
}

const storageService = new StorageService();
export default storageService;