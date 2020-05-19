/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../utils/react-auth0-spa';

export default function PrivateRoute({ component: Component, path, ...rest }) {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) return;

    const fn = async() => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props => isAuthenticated === true
    ? <Component {...props} />
    : null;

  return <Route path={path} render={render} {...rest} />;
}