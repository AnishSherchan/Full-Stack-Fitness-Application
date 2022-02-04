import Header from "@components/AppHeader/Header";

const index = () => {
  return (
    <div className="h-screen bg-bgcolor">
      <Header buttons={false} />
      <div>
        <h1>Sign up</h1>
      </div>
    </div>
  );
};
export default index;
