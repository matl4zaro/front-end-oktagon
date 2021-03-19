import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

// import Home from "./pages/Home/Home";

import CampaignDetail from "./pages/CampaignDetail/CampaignDetail";
import CampaignForm from "./pages/CampaignForm/CampaignForm";
import CampaignList from "./pages/CampaignList/CampaignList";

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Route component={Home} path="/" exact /> */}
      <Route component={CampaignList} path="/" exact />
      <Route component={CampaignList} path="/campaigns" exact />
      <Route component={CampaignForm} path="/new/campaign" exact />
      <Route component={CampaignDetail} path="/campaign/:id" />
    </BrowserRouter>
  );
};

export default Routes;
