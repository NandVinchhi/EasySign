import * as React from "react";
import { Card } from "../components/dashboard/Card";
import { NavbarApp } from "../components/navbar/NavbarApp";

export default function App() {
  return (
    <>
      <NavbarApp />
      <Card />
      <Card />
    </>
  );
}
