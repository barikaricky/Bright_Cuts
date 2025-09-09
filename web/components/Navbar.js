export default function Navbar() {
  return (
    <nav className="bg-primary text-white flex justify-between px-8 py-4 shadow">
      <div className="font-bold text-xl">Bright Cuts</div>
      <div>
        <a href="/login" className="mr-4">Login</a>
        <a href="/signup">Sign Up</a>
      </div>
    </nav>
  );
}