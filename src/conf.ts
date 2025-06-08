type AppwriteConfig = {
    appwriteUrl: string;
    appwriteProjectId: string;
    appwriteDatabaseId: string;
    appwriteLangugageCollectionId: string;
    appwriteQuestionCollectionId: string;
     appwriteChapterCollectionId: string;
    

  };
  
  const conf: AppwriteConfig = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteLangugageCollectionId: String(import.meta.env.VITE_APPWRITE_LANGUGAGE_COLLECTION_ID),
    appwriteQuestionCollectionId: String(import.meta.env.VITE_APPWRITE_QUESTION_COLLECTION_ID),
     appwriteChapterCollectionId: String(import.meta.env.VITE_APPWRITE_CHAPTER_COLLECTION_ID),
  
   
  };
  
  export default conf;