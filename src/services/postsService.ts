import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { Post, PostFormValues } from '../types/posts.types'

export const NewPostService = async (newPost: PostFormValues): Promise<Post | boolean> => {
  try {
    const result = await addDoc(collection(db, 'posts'), newPost)
    console.log(result)
    return result
  } catch (err) {
    console.error(err)
    return false
  }
}
