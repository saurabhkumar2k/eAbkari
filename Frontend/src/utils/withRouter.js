import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
  return function ComponentWithRouterProp(props) {
    return React.createElement(Component, {
      ...props,
      location: useLocation(),
      navigate: useNavigate(),
      params: useParams(),
    });
  };
}
