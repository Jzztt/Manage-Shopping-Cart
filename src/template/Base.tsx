import Wrapper from "@/components/atoms/Wrapper";
import Header from "@/layouts/header";
import React from "react";

interface IBase {
  children?: React.ReactNode;
}
const Base: React.FC<IBase> = (props) => {
  return (
    <Wrapper>
      <Header />
      <div className="container my-5" >{props.children}</div>
    </Wrapper>
  );
};

export default Base;
