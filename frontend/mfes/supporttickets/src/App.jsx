import React,{lazy} from "react";
const TicketList = lazy(() => import("./TicketList"));
const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <TicketList />
    </div>
  );
};

export default App;
