import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-accent">
        <h1 className="text-4xl font-bold text-primary">Bright Cuts</h1>
        <p className="text-lg text-textMedium mt-2">Book professional barbers near you for on-demand service!</p>
      </div>
    </>
  );
}