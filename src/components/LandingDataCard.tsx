import React from "react";
import { strings } from "../i18n";

export const LandingDataTable = () => (
  <div>
    {strings.prompt_landingConfirm}
    <hr />
    <table>
      <tbody>
        <tr>
          <td><span role="img" aria-label="date">📅</span></td>
          <td>{strings.date}</td>
          <td>2016-12-14</td>
        </tr>
        <tr>
          <td><span role="img" aria-label="time">⌚</span></td>
          <td>{strings.time}</td>
          <td>11:33:00.125+08:00</td>
        </tr>
        <tr>
          <td><span role="img" aria-label="container">🚢</span></td>
          <td> {strings.container}</td>
          <td>f5c5ab8f-8bcf-446a-8dea-4cb625316ffd</td>
        </tr>
        <tr>
          <td><span role="img" aria-label="location">📍</span></td>
          <td>{strings.geoLocation}</td>
          <td>geo:22.58425,120.31815</td>
        </tr>
      </tbody>
    </table>
  </div>
);
