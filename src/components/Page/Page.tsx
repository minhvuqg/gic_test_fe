import PropTypes from "prop-types";
import React, {
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import type {
  HTMLProps,
} from "react";
import { Helmet } from "react-helmet";

interface IPage extends HTMLProps<HTMLDivElement> {
  title?: string;
}

const Page = forwardRef<HTMLDivElement, IPage>(({
  children,
  title = "Untitled Page",
  ...rest
}, ref) => {

  const sendPageViewEvent = useCallback(() => {
    //@TODO: tracking page view
  }, []);

  useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

  return (
    <div
      ref={ref as any}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
