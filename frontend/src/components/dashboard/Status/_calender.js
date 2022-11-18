/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { Calendar } from "@mantine/dates";

function Calenderr() {
  const [value, setValue] = useState(null);
  return (
    <div>
      <Calendar value={value} onChange={setValue} />
    </div>
  );
}

export default Calenderr;
