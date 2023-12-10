import Form from '@/components/Form';
import UploadFiles from '@/components/UploadFiles';

const Home = () =>  {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Adjunta tus datos</h1>
      <h3>Fundación misionera Divina Redención San Felipe Neri</h3>
      <Form />
      <UploadFiles />
    </main>
  )
}

export default Home;