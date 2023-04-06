import MainLayout from 'src/layouts/main'

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>

export default function HomePage() {
  return <div />
}
