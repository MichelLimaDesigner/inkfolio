import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../config/firebase/baseConfig'
import { IPost, IPostFormValues } from '../types/posts.types'
import { IQueryParams } from '../types/query.types'

const usePosts = () => {
  const getPosts = async (params?: IQueryParams): Promise<IPost[]> => {
    try {
      const postsRef = collection(db, 'posts')
      const posts: IPost[] = []
      const getQuery = params
        ? query(postsRef, where(params.key, '==', params.value), orderBy('created_at', 'desc'))
        : query(postsRef, orderBy('created_at', 'desc'))
      const querySnapshot = await getDocs(getQuery)

      querySnapshot.forEach((doc) => {
        const post = doc.data() as IPost
        posts.push(post)
      })

      return posts
    } catch (err) {
      console.error('Erro ao obter posts:', err)
      throw new Error()
    }
  }

  const getUserPosts = async (userId: string): Promise<IPost[]> => {
    try {
      const postsRef = collection(db, 'posts')
      const userPosts: IPost[] = []
      const res = query(postsRef, where('user.id', '==', userId))
      const querySnapshot = await getDocs(res)
      querySnapshot.forEach((doc) => {
        const post = doc.data()
        post.id = doc.id
        userPosts.push(post as IPost)
      })
      return userPosts
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  const createPost = async (newPost: IPostFormValues): Promise<IPost> => {
    try {
      const created: string = new Date().toISOString()
      newPost['created_at'] = created

      const docRef: DocumentReference<DocumentData> = await addDoc(collection(db, 'posts'), newPost)
      const docSnap = await getDoc(docRef)

      const post = docSnap.data() as IPost
      return post
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  const deletePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId)
      await deleteDoc(postRef)
      console.log('Post deletado com sucesso!')
    } catch (err) {
      console.error('Erro ao deletar o post:', err)
    }
  }

  return {
    getPosts,
    getUserPosts,
    createPost,
    deletePost,
  }
}

export default usePosts
