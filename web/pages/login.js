import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-primary">Login</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-2 p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-4 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}