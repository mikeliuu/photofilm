import React from "react";

import Layout from '../components/Layout/Layout';
import NotFound from '../components/NotFound/NotFound';


const NotMatch = () => {

  return (
    <Layout 
      title={"404 Not Found - Photofilm"}
      keywords={"404, not found, 404 not found, notfound, photofilm"}
      description={"Page is not found Photofilm."}
    >

    <NotFound />

    </Layout>
  );
};

export default NotMatch;