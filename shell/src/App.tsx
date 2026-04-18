import { Login, Logout } from "federation_auth/components";

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div>
        <Login />
        <Logout />
      </div>
    </div>
  );
};

export default App;
