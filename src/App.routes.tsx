import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

// import Home from "./pages/Home/Home";

import CampaignDetail from "./pages/CampaignDetail/CampaignDetail";
import NewCampaign from "./pages/NewCampaign/NewCampaign";
import CampaignList from "./pages/CampaignList/CampaignList";

const Routes = () => {
  return (
    <BrowserRouter>
      {/* <Route component={Home} path="/" exact /> */}
      <Route exact path="/">
        <Redirect to="/campaigns" />
      </Route>
      <Route component={CampaignList} path="/campaigns" exact />
      <Route component={NewCampaign} path="/new/campaign" exact />
      <Route component={CampaignDetail} path="/campaign/:id" />
    </BrowserRouter>
  );
};

export default Routes;
