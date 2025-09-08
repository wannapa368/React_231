import React from "react";

interface HeaderTxtProps {
  name: string;
  fontSize: number;
  status: boolean;
}

export default function HeaderTxt( { title, txtsize, status }:
  { title: string; txtsize: number; status: boolean; }) {
  return (
    <h1 style={{ fontSize: `${txtsize}em` }} className={status ? "green-txt" : "red-txt"}>
      {title}
    </h1>
  );
}