import Layout from "../components/Layout"
import Tasks from "../components/Tasks"

export default function Home() {
  return (
    <Layout>
      <Tasks.Header />

      <Tasks.Container />
    </Layout>
  )
}