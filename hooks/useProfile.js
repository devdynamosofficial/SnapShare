import { Databases, Storage } from 'appwrite';
import React from 'react'
import appwriteClient from "@/libs/appwrite";

export default function useProfile() {
    const [imageUrl, setImageUrl] = useState('');
  const [profilePic,setProfilePic]=useState('');
  const storage = new Storage(appwriteClient);
  
  const databases=new Databases(appwriteClient);
  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!user) {
        return;
      }
  
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          [Query.equal('user_id', [user.$id])]
        );
  
        const docId = response.documents[0]?.profile_pic;
  
        if (docId) {
          fetchPreviewUrl(docId);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
  
    const fetchPreviewUrl = async (docId) => {
      try {
        const previewUrl = await storage.getFilePreview(process.env.NEXT_PUBLIC_BUCKET_ID, docId,undefined,undefined,undefined,100);
        setImageUrl(previewUrl);
      } catch (error) {
        console.error('Error fetching preview URL:', error);
      }
    };
  
    fetchProfilePic();
  }, [user]);
  return imageUrl;
}


