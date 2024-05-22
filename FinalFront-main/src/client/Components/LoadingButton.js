import React from "react";
import "./spinner.css";

export default function LoadingButton() {
  return (
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
}
