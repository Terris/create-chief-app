import React from 'react'
import { Layout } from 'src/layouts'

export const HomePage = () => {
  console.log(process.env)
  return (
    <Layout>
      <h1>Home Page</h1>
      <p>
        API URL:{' '}
        {process.env.REACT_APP_API_URL ||
          "You'll want to set your api url in .env."}
      </p>
    </Layout>
  )
}
