import { IBlog } from '@/types/indeex'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlApi = process.env.NEXT_PUBLIC_GRAPHMBS_ENDPOINT!

export const getBlogs = async () => {
  const query = gql`
    query MyQuery {
      blogs(where: { archive: false }) {
        image {
          url
        }
        title
        description
        createdAt
        content {
          html
        }
        slug
        author {
          slug
          name
          image {
            url
          }
        }
        category {
          name
          slug
        }
        tag {
          name
          slug
        }
      }
    }
  `

  const result = await request<{ blogs: IBlog[] }>(graphqlApi, query)
  return result.blogs
}

export const getDetailedBlog = cache(async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blog(where: { slug: $slug }) {
        author {
          bio
          name
          image {
            url
          }
        }
        content {
          html
        }
        createdAt
        image {
          url
        }
        slug
        title
        tag {
          slug
          name
        }
      }
    }
  `

  const { blog } = await request<{ blog: IBlog }>(graphqlApi, query, { slug })
  return blog
})
