import { transaction } from 'objection'

import User from '../models/user'
import Post from '../models/posts'
import CokitchenHomePagePost from '../models/cokitchen_home_page_post'

import { Unauthorized, UnprocessableEntity } from '../helpers'

export const newPost = async data => {
  let data_to_insert = {
    title: data.title,
    body: data.body,
    heading: data.heading,
    images: data.images,
    to_expire_date: data.to_expire_date,
    to_expire_time: data.to_expire_time,
    to_start_date: data.to_start_date,
    to_start_time: data.to_start_time
  }
  if (data.id) {
    data_to_insert.deal_id = data.id
  }
  const post = await Post.query()
    .insert(data_to_insert)
    .catch(e => {
      console.log(e)
      throw UnprocessableEntity('Post data invalid')
    })
  // first check if cokitchen home page posts already exists
  let cokitchen_home_page_post = await CokitchenHomePagePost.query()
    .where(data.cokitchen_id, data.cokitchen_id)
    .catch(e => {
      console.log(e)
      return false
    })
  /// if it exists add the post to the array of posts
  if (cokitchen_home_page_post) {
    cokitchen_home_page_post.posts.push(post)
    cokitchen_home_page_post.posts = JSON.stringify(
      cokitchen_home_page_post.posts
    )
    cokitchen_home_page_post = await CokitchenHomePagePost.query()
      .patchAndFetchById(cokitchen_home_page_post.id, cokitchen_home_page_post)
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity('Invalid Cokitchen Home page post data')
      })
    //if it doesn't exists create the cokitchen home page post
  } else {
    cokitchen_home_page_post = await CokitchenHomePagePost.query()
      .insert({
        posts: JSON.stringify([post]),
        cokitchen_id: adata.cokitchen_id
      })
      .catch(e => {
        console.log(e)
        throw UnprocessableEntity(
          'Invalid Insert Cokitchen Home page post data'
        )
      })
  }

  return {
    post,
    cokitchen_home_page_post
  }
}

export default {
  newPost
}
